from dataclasses import dataclass


@dataclass(frozen=True)
class CostEstimate:
    estimated_input_units: float | None
    estimated_output_units: float | None
    estimated_cost_usd: float
    pricing_snapshot: dict


def estimate_model_cost(provider: str, model_name: str, payload: dict) -> CostEstimate:
    if provider == "internal_mock":
        images = float(payload.get("num_images") or payload.get("num_samples") or 1)
        return CostEstimate(images, images, round(0.12 * images, 4), {"mode": "mock", "unit": "image"})
    if provider == "fashn" and "v1.6" in model_name:
        return CostEstimate(1, 1, 0.08, {"credits": 1, "source": "mvp_estimate"})
    if provider == "fashn":
        resolution = payload.get("inputs", {}).get("resolution", "2k")
        credits = 5 if resolution == "4k" else 2
        return CostEstimate(1, payload.get("inputs", {}).get("num_images", 1), credits * 0.08, {"credits": credits})
    if provider == "bfl":
        megapixels = float(payload.get("megapixels", 2))
        return CostEstimate(megapixels, megapixels, round(0.03 + megapixels * 0.015, 4), {"unit": "megapixel"})
    if provider == "openai":
        return CostEstimate(None, None, 0.2, {"image_input_per_1m_tokens": 8, "image_output_per_1m_tokens": 30})
    return CostEstimate(None, None, 0.0, {"mode": "unknown"})
