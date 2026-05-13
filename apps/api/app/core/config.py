from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Jasmine API"
    app_public_base_url: str = "http://localhost:3000"
    backend_public_base_url: str = "http://localhost:8000"
    database_url: str = "sqlite:///./.local-storage/jasmine.db"
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: str = "dev-only-change-me-dev-only-change-me"
    jwt_expires_minutes: int = 10080
    model_provider_mode: str = Field(default="mock", pattern="^(mock|live)$")
    celery_task_always_eager: bool = True

    storage_provider: str = "local"
    s3_endpoint_url: str | None = None
    s3_access_key_id: str | None = None
    s3_secret_access_key: str | None = None
    s3_bucket: str = "jasmine"
    s3_public_base_url: str = "http://localhost:9000/jasmine"
    local_storage_dir: str = ".local-storage"

    fashn_api_key: str | None = None
    fashn_webhook_secret: str | None = None
    bfl_api_key: str | None = None
    fal_key: str | None = None
    openai_api_key: str | None = None

    @property
    def local_storage_path(self) -> Path:
        return Path(self.local_storage_dir)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
