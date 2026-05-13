from typing import Any

import httpx

from app.core.config import settings
from app.providers.base import ProviderError, ProviderResult


class OpenAIImageProvider:
    provider = "openai"

    async def run(self, payload: dict[str, Any]) -> ProviderResult:
        action = payload.get("action", "edit")
        if action == "generate_cover":
            return await self.run_gpt_image_generate_cover(payload)
        if action == "repair":
            return await self.run_gpt_image_repair(payload)
        return await self.run_gpt_image_edit(payload)

    async def run_gpt_image_edit(self, payload: dict[str, Any]) -> ProviderResult:
        return await self._request("gpt-image-2-edit", payload)

    async def run_gpt_image_generate_cover(self, payload: dict[str, Any]) -> ProviderResult:
        return await self._request("gpt-image-2-cover", payload)

    async def run_gpt_image_repair(self, payload: dict[str, Any]) -> ProviderResult:
        return await self._request("gpt-image-2-repair", payload)

    async def _request(self, model_name: str, payload: dict[str, Any]) -> ProviderResult:
        if not settings.openai_api_key:
            raise ProviderError("openai", model_name, "missing_api_key", "OPENAI_API_KEY is not configured.")
        async with httpx.AsyncClient(timeout=180) as client:
            response = await client.post(
                "https://api.openai.com/v1/images/edits",
                headers={"Authorization": f"Bearer {settings.openai_api_key}"},
                data={"model": "gpt-image-2", "prompt": payload.get("prompt", "")},
            )
        data = response.json()
        if response.status_code >= 400:
            raise ProviderError("openai", model_name, "request_failed", data.get("error", {}).get("message", response.text), data)
        urls = [item.get("url") for item in data.get("data", []) if item.get("url")]
        return ProviderResult(provider_run_id=data.get("id"), output_urls=urls, raw_response=data)
