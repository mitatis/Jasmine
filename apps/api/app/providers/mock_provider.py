import asyncio
from typing import Any
from uuid import uuid4

from app.providers.base import ProviderResult


class MockImageProvider:
    provider = "internal_mock"

    async def run(self, payload: dict[str, Any]) -> ProviderResult:
        await asyncio.sleep(0)
        count = int(payload.get("num_images") or payload.get("num_samples") or 1)
        count = max(1, min(count, 4))
        demo_urls = [
            "/generated/seedream-v1/post-clean-commute.jpg",
            "/generated/seedream-v1/post-urban-black.jpg",
            "/generated/seedream-v1/post-denim-cafe.jpg",
            "/generated/seedream-v1/post-sand-gallery.jpg",
        ]
        return ProviderResult(
            provider_run_id=f"mock_{uuid4()}",
            output_urls=demo_urls[:count],
            raw_response={"mode": "mock", "payload_keys": sorted(payload.keys())},
            cost_estimate_usd=0.12 * count,
            latency_ms=280,
        )
