from celery import Celery

from app.core.config import settings


celery_app = Celery("jasmine", broker=settings.redis_url, backend=settings.redis_url)
celery_app.conf.task_always_eager = settings.celery_task_always_eager
celery_app.conf.task_routes = {
    "generation.preview": {"queue": "generation"},
    "generation.final_standard": {"queue": "generation"},
    "generation.final_premium": {"queue": "generation"},
}
