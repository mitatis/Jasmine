from typing import Any, Protocol

from pydantic import BaseModel, Field


class ProviderResult(BaseModel):
    provider_run_id: str | None = None
    output_urls: list[str] = Field(default_factory=list)
    raw_response: dict[str, Any] = Field(default_factory=dict)
    cost_estimate_usd: float | None = None
    latency_ms: int | None = None


class ProviderError(Exception):
    def __init__(
        self,
        provider: str,
        model_name: str,
        error_code: str,
        message: str,
        raw: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(message)
        self.provider = provider
        self.model_name = model_name
        self.error_code = error_code
        self.message = message
        self.raw = raw or {}


class ImageGenerationProvider(Protocol):
    async def run(self, payload: dict[str, Any]) -> ProviderResult:
        ...
