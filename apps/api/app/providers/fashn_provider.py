from typing import Any

import httpx

from app.core.config import settings
from app.providers.base import ProviderError, ProviderResult


class FashnProvider:
    provider = "fashn"
    base_url = "https://api.fashn.ai/v1"

    async def run(self, payload: dict[str, Any]) -> ProviderResult:
        model_name = payload.get("model_name", "tryon-max")
        if model_name == "tryon-v1.6":
            return await self.run_tryon_v16(payload)
        return await self.run_tryon_max(payload)

    async def run_tryon_v16(self, payload: dict[str, Any]) -> ProviderResult:
        return await self._post_generation("tryon-v1.6", payload)

    async def run_tryon_max(self, payload: dict[str, Any]) -> ProviderResult:
        return await self._post_generation("tryon-max", payload)

    async def poll_status(self, provider_run_id: str) -> dict[str, Any]:
        if not settings.fashn_api_key:
            raise ProviderError("fashn", "status", "missing_api_key", "FASHN_API_KEY is not configured.")
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(
                f"{self.base_url}/status/{provider_run_id}",
                headers={"Authorization": f"Bearer {settings.fashn_api_key}"},
            )
        if response.status_code >= 400:
            raise ProviderError("fashn", "status", "poll_failed", response.text, {"status": response.status_code})
        return response.json()

    def handle_webhook_payload(self, payload: dict[str, Any]) -> ProviderResult:
        outputs = payload.get("output_urls") or payload.get("outputs") or []
        provider_run_id = payload.get("id") or payload.get("run_id")
        return ProviderResult(
            provider_run_id=provider_run_id,
            output_urls=[str(item) for item in outputs],
            raw_response=payload,
            cost_estimate_usd=payload.get("cost_estimate_usd"),
            latency_ms=payload.get("latency_ms"),
        )

    async def _post_generation(self, model_name: str, payload: dict[str, Any]) -> ProviderResult:
        if not settings.fashn_api_key:
            raise ProviderError("fashn", model_name, "missing_api_key", "FASHN_API_KEY is not configured.")
        async with httpx.AsyncClient(timeout=120) as client:
            response = await client.post(
                f"{self.base_url}/run",
                headers={"Authorization": f"Bearer {settings.fashn_api_key}"},
                json=payload,
            )
        data = response.json()
        if response.status_code >= 400:
            raise ProviderError("fashn", model_name, "request_failed", data.get("message", response.text), data)
        return ProviderResult(
            provider_run_id=data.get("id") or data.get("run_id"),
            output_urls=data.get("output_urls") or data.get("outputs") or [],
            raw_response=data,
            cost_estimate_usd=data.get("cost_estimate_usd"),
            latency_ms=data.get("latency_ms"),
        )
