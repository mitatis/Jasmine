from fastapi.testclient import TestClient

from app.db.session import Base, engine
from app.main import app


def setup_function() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_same_email_can_register_separate_merchant_and_creator_accounts() -> None:
    client = TestClient(app)

    merchant = client.post(
        "/api/v1/auth/merchant/register",
        json={"email": "shared@example.com", "password": "password123", "display_name": "Merchant User"},
    )
    creator = client.post(
        "/api/v1/auth/creator/register",
        json={"email": "shared@example.com", "password": "creatorpass123", "display_name": "Creator User"},
    )

    assert merchant.status_code == 200, merchant.text
    assert creator.status_code == 200, creator.text
    assert merchant.json()["access_token"] != creator.json()["access_token"]

    merchant_me = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {merchant.json()['access_token']}"},
    )
    creator_me = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {creator.json()['access_token']}"},
    )
    assert merchant_me.json()["account_type"] == "merchant"
    assert creator_me.json()["account_type"] == "creator"


def test_duplicate_email_is_rejected_within_same_account_type() -> None:
    client = TestClient(app)
    payload = {"email": "merchant@example.com", "password": "password123", "display_name": "Merchant User"}

    first = client.post("/api/v1/auth/merchant/register", json=payload)
    second = client.post("/api/v1/auth/merchant/register", json=payload)

    assert first.status_code == 200, first.text
    assert second.status_code == 400
    assert second.json()["detail"] == "Email is already registered for this account type."


def test_role_specific_login_does_not_cross_account_types() -> None:
    client = TestClient(app)
    client.post(
        "/api/v1/auth/merchant/register",
        json={"email": "shared@example.com", "password": "merchantpass123", "display_name": "Merchant User"},
    )
    client.post(
        "/api/v1/auth/creator/register",
        json={"email": "shared@example.com", "password": "creatorpass123", "display_name": "Creator User"},
    )

    creator_with_merchant_password = client.post(
        "/api/v1/auth/creator/login",
        json={"email": "shared@example.com", "password": "merchantpass123"},
    )
    merchant_with_creator_password = client.post(
        "/api/v1/auth/merchant/login",
        json={"email": "shared@example.com", "password": "creatorpass123"},
    )
    merchant_login = client.post(
        "/api/v1/auth/merchant/login",
        json={"email": "shared@example.com", "password": "merchantpass123"},
    )

    assert creator_with_merchant_password.status_code == 401
    assert merchant_with_creator_password.status_code == 401
    assert merchant_login.status_code == 200


def test_legacy_auth_requires_explicit_account_type() -> None:
    client = TestClient(app)

    register = client.post(
        "/api/v1/auth/register",
        json={"email": "legacy@example.com", "password": "password123", "display_name": "Legacy User"},
    )
    login = client.post(
        "/api/v1/auth/login",
        json={"email": "legacy@example.com", "password": "password123"},
    )

    assert register.status_code == 400
    assert register.json()["detail"] == "account_type is required."
    assert login.status_code == 400
    assert login.json()["detail"] == "account_type is required."


def test_role_permissions_reject_cross_role_write_access() -> None:
    client = TestClient(app)
    merchant_token = _register(client, "merchant@example.com", "merchant", "Merchant User")
    creator_token = _register(client, "creator@example.com", "creator", "Creator User")

    creator_write = client.post(
        "/api/v1/creators/profile",
        json={"display_name": "Merchant As Creator", "style_tags": [], "platforms": {}},
        headers={"Authorization": f"Bearer {merchant_token}"},
    )
    merchant_org = client.post(
        "/api/v1/organizations",
        json={"name": "Creator As Merchant", "org_type": "merchant_brand"},
        headers={"Authorization": f"Bearer {creator_token}"},
    )

    assert creator_write.status_code == 403
    assert creator_write.json()["detail"] == "Creator account required."
    assert merchant_org.status_code == 403
    assert merchant_org.json()["detail"] == "Merchant account required."


def test_registration_bootstraps_default_role_resources() -> None:
    client = TestClient(app)
    merchant_token = _register(client, "merchant@example.com", "merchant", "Merchant User")
    creator_token = _register(client, "creator@example.com", "creator", "Creator User")

    brands = client.get("/api/v1/brands/me", headers={"Authorization": f"Bearer {merchant_token}"})
    profiles = client.get("/api/v1/creators/me", headers={"Authorization": f"Bearer {creator_token}"})

    assert brands.status_code == 200, brands.text
    assert len(brands.json()) == 1
    assert brands.json()[0]["brand_name"] == "Merchant User"
    assert profiles.status_code == 200, profiles.text
    assert len(profiles.json()) == 1
    assert profiles.json()[0]["display_name"] == "Creator User"
    assert profiles.json()[0]["visibility_settings"] == {
        "business": "public",
        "platforms": "public",
        "stats": "public",
        "assets": "private",
    }
    assert profiles.json()[0]["collaboration_info"]["contact_email"] == "creator@example.com"
    assert profiles.json()[0]["collaboration_info"]["quote_range"] == {"min": 0, "max": 0}
    assert profiles.json()[0]["collaboration_info"]["style_preferences"] == []
    assert profiles.json()[0]["collaboration_info"]["content_strengths"] == {
        "visual_style": 60,
        "engagement": 60,
        "conversion": 60,
        "video": 60,
        "delivery": 60,
    }
    assert profiles.json()[0]["content_examples"] == []


def test_creator_profile_owner_and_visitor_views_filter_private_fields() -> None:
    client = TestClient(app)
    owner_token = _register(client, "owner@example.com", "creator", "Owner Creator")
    visitor_token = _register(client, "visitor@example.com", "creator", "Visitor Creator")

    profiles = client.get("/api/v1/creators/me", headers={"Authorization": f"Bearer {owner_token}"})
    assert profiles.status_code == 200, profiles.text
    creator_id = profiles.json()[0]["id"]

    asset = client.post(
        f"/api/v1/creators/{creator_id}/assets",
        json={
            "asset_url": "https://example.com/portrait.png",
            "asset_type": "portrait",
            "usage_scope": "commercial",
        },
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert asset.status_code == 200, asset.text

    update = client.patch(
        f"/api/v1/creators/{creator_id}",
        json={
            "platforms": {
                "xhs": {"handle": "owner_xhs", "url": "https://xhs.example/owner", "linked": True},
                "douyin": {"handle": "owner_dy", "url": "https://douyin.example/owner", "linked": True},
            },
            "collaboration_info": {
                "contact_email": "collab@example.com",
                "preferred_platforms": ["小红书", "抖音"],
                "rate_card": {"image_post": 680, "video_script": 1200},
                "categories": ["通勤极简", "夹克"],
                "notes": "接受品牌寄样与内容共创。",
            },
            "visibility_settings": {
                "business": "public",
                "platforms": "private",
                "stats": "public",
                "assets": "private",
            },
        },
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert update.status_code == 200, update.text

    owner_view = client.get(f"/api/v1/creators/{creator_id}", headers={"Authorization": f"Bearer {owner_token}"})
    visitor_view = client.get(f"/api/v1/creators/{creator_id}", headers={"Authorization": f"Bearer {visitor_token}"})
    owner_preview = client.get(
        f"/api/v1/creators/{creator_id}?view=visitor",
        headers={"Authorization": f"Bearer {owner_token}"},
    )

    assert owner_view.status_code == 200, owner_view.text
    assert owner_view.json()["platforms"]["xhs"]["handle"] == "owner_xhs"
    assert owner_view.json()["collaboration_info"]["contact_email"] == "collab@example.com"
    assert len(owner_view.json()["assets"]) == 1
    assert visitor_view.status_code == 200, visitor_view.text
    assert visitor_view.json()["display_name"] == "Owner Creator"
    assert visitor_view.json()["platforms"] is None
    assert visitor_view.json()["collaboration_info"]["contact_email"] == "collab@example.com"
    assert visitor_view.json()["assets"] is None
    assert owner_preview.status_code == 200, owner_preview.text
    assert owner_preview.json() == visitor_view.json()


def _register(client: TestClient, email: str, account_type: str, display_name: str) -> str:
    response = client.post(
        f"/api/v1/auth/{account_type}/register",
        json={"email": email, "password": "password123", "display_name": display_name},
    )
    assert response.status_code == 200, response.text
    return response.json()["access_token"]
