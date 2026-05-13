from typing import Any

import httpx

from app.core.config import settings
from app.providers.base import ProviderError, ProviderResult


class BflProvider:
    provider = "bfl"

    async def run(self, payload: dict[str, Any]) -> ProviderResult:
        action = payload.get("action", "flux2_max_edit")
        if action == "flux2_pro_edit":
            return await self.run_flux2_pro_edit(payload)
        if action == "flux2_max_generate":
            return await self.run_flux2_max_generate(payload)
        return await self.run_flux2_max_edit(payload)

    async def run_flux2_pro_edit(self, payload: dict[str, Any]) -> ProviderResult:
        return await self._fal_request("fal-ai/flux-pro/v2/edit", payload)

    async def run_flux2_max_edit(self, payload: dict[str, Any]) -> ProviderResult:
        return await self._fal_request("fal-ai/flux-2/max/edit", payload)

    async def run_flux2_max_generate(self, payload: dict[str, Any]) -> ProviderResult:
        return await self._fal_request("fal-ai/flux-2/max", payload)

    async def _fal_request(self, model_name: str, payload: dict[str, Any]) -> ProviderResult:
        key = settings.fal_key or settings.bfl_api_key
        if not key:
            raise ProviderError("bfl", model_name, "missing_api_key", "FAL_KEY or BFL_API_KEY is not configured.")
        async with httpx.AsyncClient(timeout=180) as client:
            response = await client.post(
                f"https://fal.run/{model_name}",
                headers={"Authorization": f"Key {key}"},
                json=payload,
            )
        data = response.json()
        if response.status_code >= 400:
            raise ProviderError("bfl", model_name, "request_failed", data.get("detail", response.text), data)
        images = data.get("images") or []
        urls = [item.get("url", item) if isinstance(item, dict) else item for item in images]
        return ProviderResult(
            provider_run_id=data.get("request_id"),
            output_urls=[str(url) for url in urls if url],
            raw_response=data,
            cost_estimate_usd=data.get("cost_estimate_usd"),
        )
