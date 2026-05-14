from typing import Any

from app.models.entities import CreatorAsset, CreatorProfile


DEFAULT_VISIBILITY_SETTINGS = {
    "business": "public",
    "platforms": "public",
    "stats": "public",
    "assets": "private",
}

DEFAULT_COLLABORATION_INFO = {
    "contact_email": "",
    "preferred_platforms": [],
    "rate_card": {},
    "categories": [],
    "notes": "",
}


def default_visibility_settings() -> dict[str, str]:
    return DEFAULT_VISIBILITY_SETTINGS.copy()


def default_collaboration_info(contact_email: str = "") -> dict[str, Any]:
    return {**DEFAULT_COLLABORATION_INFO, "contact_email": contact_email}


def normalize_visibility_settings(value: dict[str, Any] | None) -> dict[str, str]:
    settings = default_visibility_settings()
    if not value:
        return settings

    for key in settings:
        next_value = value.get(key)
        if next_value in {"public", "private"}:
            settings[key] = next_value
    return settings


def normalize_collaboration_info(value: dict[str, Any] | None, *, contact_email: str = "") -> dict[str, Any]:
    info = default_collaboration_info(contact_email)
    if value:
        info.update(value)
    return info


def creator_profile_payload(profile: CreatorProfile, *, owner: bool, force_visitor: bool = False) -> dict[str, Any]:
    visibility_settings = normalize_visibility_settings(profile.visibility_settings)
    full_view = owner and not force_visitor
    collaboration_info = normalize_collaboration_info(profile.collaboration_info)
    assets = [_asset_payload(asset) for asset in profile.assets if asset.deleted_at is None]

    if full_view:
        return {
            "id": profile.id,
            "user_id": profile.user_id,
            "org_id": profile.org_id,
            "display_name": profile.display_name,
            "bio": profile.bio,
            "gender_presentation": profile.gender_presentation,
            "height_cm": profile.height_cm,
            "body_type": profile.body_type,
            "style_tags": profile.style_tags,
            "platforms": profile.platforms,
            "visibility_settings": visibility_settings,
            "collaboration_info": collaboration_info,
            "content_examples": profile.content_examples,
            "consent_status": profile.consent_status,
            "default_usage_scope": profile.default_usage_scope,
            "assets": assets,
        }

    return {
        "id": profile.id,
        "user_id": profile.user_id,
        "org_id": profile.org_id,
        "display_name": profile.display_name,
        "bio": profile.bio,
        "gender_presentation": profile.gender_presentation,
        "height_cm": profile.height_cm if visibility_settings["stats"] == "public" else None,
        "body_type": profile.body_type if visibility_settings["stats"] == "public" else None,
        "style_tags": profile.style_tags,
        "platforms": profile.platforms if visibility_settings["platforms"] == "public" else None,
        "visibility_settings": visibility_settings,
        "collaboration_info": collaboration_info if visibility_settings["business"] == "public" else None,
        "content_examples": profile.content_examples,
        "consent_status": profile.consent_status,
        "default_usage_scope": profile.default_usage_scope,
        "assets": assets if visibility_settings["assets"] == "public" else None,
    }


def _asset_payload(asset: CreatorAsset) -> dict[str, Any]:
    return {
        "id": asset.id,
        "creator_id": asset.creator_id,
        "asset_url": asset.asset_url,
        "asset_type": asset.asset_type,
        "usage_scope": asset.usage_scope,
        "width": asset.width,
        "height": asset.height,
        "mime_type": asset.mime_type,
        "quality_score": asset.quality_score,
    }
