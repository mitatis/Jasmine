from app.db.session import SessionLocal
from app.services.generation_orchestrator import process_generation_job
from app.workers.celery_app import celery_app


@celery_app.task(name="generation.run")
def run_generation_job(job_id: str) -> None:
    db = SessionLocal()
    try:
        process_generation_job(db, job_id)
    finally:
        db.close()


@celery_app.task(name="generation.preview")
def run_preview(job_id: str) -> None:
    run_generation_job(job_id)


@celery_app.task(name="generation.final_standard")
def run_final_standard(job_id: str) -> None:
    run_generation_job(job_id)


@celery_app.task(name="generation.final_premium")
def run_final_premium(job_id: str) -> None:
    run_generation_job(job_id)
