from app.workers.celery_app import celery_app


@celery_app.task(name="storage.copy_output")
def copy_output(url: str) -> str:
    return url
