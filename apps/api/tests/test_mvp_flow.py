from fastapi.testclient import TestClient

from app.db.session import Base, engine
from app.main import app


def setup_module() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_mock_generation_flow_creates_assets_qc_approval_and_admin_costs() -> None:
    client = TestClient(app)

    merchant_token = _register(client, "merchant@example.com", "Merchant", "merchant")
    creator_token = _register(client, "creator@example.com", "Creator", "creator")

    merchant_headers = {"Authorization": f"Bearer {merchant_token}"}
    creator_headers = {"Authorization": f"Bearer {creator_token}"}

    org = client.post(
        "/api/v1/organizations",
        json={"name": "North Studio", "org_type": "merchant_brand"},
        headers=merchant_headers,
    ).json()
    brand = client.post(
        "/api/v1/brands",
        json={
            "org_id": org["id"],
            "brand_name": "North Studio",
            "visual_guidelines": {"tone": "clean black white editorial"},
        },
        headers=merchant_headers,
    ).json()
    creator_org = client.post(
        "/api/v1/organizations",
        json={"name": "Creator Studio", "org_type": "creator_studio"},
        headers=creator_headers,
    ).json()
    creator = client.post(
        "/api/v1/creators/profile",
        json={
            "org_id": creator_org["id"],
            "display_name": "Nora",
            "style_tags": ["clean", "editorial"],
            "platforms": {"xiaohongshu": {"handle": "nora", "followers": 12000}},
            "default_usage_scope": "commercial_campaign",
        },
        headers=creator_headers,
    ).json()
    consent = client.post(
        f"/api/v1/creators/{creator['id']}/consents",
        json={
            "consent_type": "commercial_campaign",
            "allowed_brand_ids": [brand["id"]],
            "signed_text": "I allow this brand to generate commercial campaign images.",
        },
        headers=creator_headers,
    )
    assert consent.status_code == 200

    product = client.post(
        "/api/v1/products",
        json={
            "brand_id": brand["id"],
            "title": "Black cropped jacket",
            "category": "tops",
            "status": "active",
            "style_tags": ["minimal", "street"],
        },
        headers=merchant_headers,
    ).json()
    image = client.post(
        f"/api/v1/products/{product['id']}/images",
        json={
            "image_url": "https://example.com/product.png",
            "image_type": "main",
            "width": 1200,
            "height": 1600,
            "mime_type": "image/png",
            "is_primary": True,
        },
        headers=merchant_headers,
    ).json()
    assert image["is_primary"] is True

    creator_asset = client.post(
        f"/api/v1/creators/{creator['id']}/assets",
        json={
            "asset_url": "https://example.com/creator.png",
            "asset_type": "full_body",
            "usage_scope": "commercial_generation",
            "width": 1200,
            "height": 1600,
            "mime_type": "image/png",
        },
        headers=creator_headers,
    ).json()
    assert creator_asset["asset_type"] == "full_body"

    campaign = client.post(
        "/api/v1/campaigns",
        json={
            "brand_id": brand["id"],
            "title": "Clean launch",
            "brief": "Premium Xiaohongshu launch images.",
            "objective": "launch",
            "target_platform": "xiaohongshu",
            "deliverables": {"images": 2, "aspect_ratios": ["3:4"]},
            "requirements": {"tone": "premium"},
            "forbidden_content": ["wrong logo"],
            "status": "active",
        },
        headers=merchant_headers,
    ).json()

    job = client.post(
        "/api/v1/generation-jobs",
        json={
            "campaign_id": campaign["id"],
            "creator_id": creator["id"],
            "product_id": product["id"],
            "job_type": "final_standard",
            "options": {
                "platform": "xiaohongshu",
                "aspect_ratio": "3:4",
                "scene_direction": "urban street",
                "brand_direction": "quiet luxury",
            },
        },
        headers=merchant_headers,
    )
    assert job.status_code == 200, job.text
    job_payload = job.json()
    assert job_payload["status"] == "needs_review"
    assert job_payload["selected_model_route"]["steps"] == ["fashn_tryon_max"]

    detail = client.get(f"/api/v1/generation-jobs/{job_payload['id']}", headers=merchant_headers).json()
    assert len(detail["model_runs"]) == 1
    assert detail["model_runs"][0]["provider"] == "internal_mock"
    assert len(detail["generated_assets"]) == 2
    assert len(detail["quality_reports"]) == 2
    assert detail["quality_reports"][0]["recommendation"] == "pass"

    approved = client.post(
        f"/api/v1/generation-jobs/{job_payload['id']}/approve",
        json={"comment": "Approved for delivery."},
        headers=merchant_headers,
    ).json()
    assert approved["status"] == "approved"

    admin_jobs = client.get("/api/v1/admin/jobs", headers=merchant_headers).json()
    assert admin_jobs["total"] == 1
    costs = client.get("/api/v1/admin/costs", headers=merchant_headers).json()
    assert costs["total_estimated_cost_usd"] > 0


def test_generation_requires_active_creator_consent() -> None:
    client = TestClient(app)
    merchant_token = _register(client, "blocked-merchant@example.com", "Blocked Merchant", "merchant")
    creator_token = _register(client, "blocked-creator@example.com", "Blocked Creator", "creator")
    merchant_headers = {"Authorization": f"Bearer {merchant_token}"}
    creator_headers = {"Authorization": f"Bearer {creator_token}"}

    org = client.post(
        "/api/v1/organizations",
        json={"name": "Blocked Brand", "org_type": "merchant_brand"},
        headers=merchant_headers,
    ).json()
    brand = client.post(
        "/api/v1/brands",
        json={"org_id": org["id"], "brand_name": "Blocked Brand"},
        headers=merchant_headers,
    ).json()
    creator = client.post(
        "/api/v1/creators/profile",
        json={"display_name": "No Consent", "style_tags": [], "platforms": {}},
        headers=creator_headers,
    ).json()
    product = client.post(
        "/api/v1/products",
        json={"brand_id": brand["id"], "title": "Top", "category": "tops", "status": "active"},
        headers=merchant_headers,
    ).json()
    client.post(
        f"/api/v1/products/{product['id']}/images",
        json={"image_url": "https://example.com/p.png", "image_type": "main", "is_primary": True},
        headers=merchant_headers,
    )
    client.post(
        f"/api/v1/creators/{creator['id']}/assets",
        json={"asset_url": "https://example.com/c.png", "asset_type": "full_body", "usage_scope": "tryon_input"},
        headers=creator_headers,
    )

    response = client.post(
        "/api/v1/generation-jobs",
        json={"creator_id": creator["id"], "product_id": product["id"], "job_type": "preview", "options": {}},
        headers=merchant_headers,
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Creator does not have an active consent record for this brand."


def _register(client: TestClient, email: str, display_name: str, account_type: str) -> str:
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": email,
            "password": "password123",
            "display_name": display_name,
            "account_type": account_type,
        },
    )
    assert response.status_code == 200, response.text
    return response.json()["access_token"]
