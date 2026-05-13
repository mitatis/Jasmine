from app.workers.celery_app import celery_app


@celery_app.task(name="qc.run")
def run_qc(job_id: str) -> str:
    return job_id
