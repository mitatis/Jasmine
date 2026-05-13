from dataclasses import dataclass


@dataclass(frozen=True)
class QualityResult:
    overall_score: float
    garment_fidelity_score: float
    identity_consistency_score: float
    body_naturalness_score: float
    social_media_quality_score: float
    brand_safety_score: float
    color_delta: float | None
    ocr_result: dict | None
    vlm_comments: str
    failure_reasons: list[str]
    recommendation: str


def recommendation_for_score(score: float, failure_reasons: list[str] | None = None) -> str:
    if failure_reasons:
        return "fail"
    if score >= 85:
        return "pass"
    if score >= 70:
        return "manual_review"
    return "fail"


def evaluate_generated_asset(
    *,
    product_image_url: str,
    creator_image_url: str,
    generated_image_url: str,
) -> QualityResult:
    del product_image_url, creator_image_url, generated_image_url
    overall = 91.0
    return QualityResult(
        overall_score=overall,
        garment_fidelity_score=93.0,
        identity_consistency_score=90.0,
        body_naturalness_score=89.0,
        social_media_quality_score=92.0,
        brand_safety_score=94.0,
        color_delta=4.2,
        ocr_result={"detected_text": [], "status": "clean"},
        vlm_comments="Mock QC: garment, identity, pose, and brand safety are acceptable for MVP review.",
        failure_reasons=[],
        recommendation=recommendation_for_score(overall),
    )
