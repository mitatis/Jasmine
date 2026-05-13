# Jasmine B2B2C AI Fashion Campaign Platform

Jasmine v0.1 connects fashion merchants and creators. Merchants upload products and campaign briefs, creators upload authorized portraits and style assets, and the platform generates reviewable AI fashion campaign images with provider logs, QC reports, approvals, and cost estimates.

## Stack

- Frontend: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, Zustand.
- Backend: FastAPI, Python 3.12, Pydantic v2, SQLAlchemy 2.x, Alembic, Celery, Redis.
- Database: PostgreSQL 16. Local tests can use SQLite when Docker is unavailable.
- Storage: S3-compatible adapter. Local development targets MinIO.
- Providers: FASHN Try-On Max/v1.6, FLUX.2 Max/Pro, GPT Image 2, and `internal_mock`.

## Local Setup

```bash
pnpm install
cd apps/api
/Users/zik/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m venv .venv
.venv/bin/python -m pip install -e . pytest
cd ../..
```

Start the API without Docker:

```bash
pnpm api:dev
```

Start the web app:

```bash
pnpm dev
```

Health check:

```bash
curl http://localhost:8000/health
```

## Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

Services:

- web: `http://localhost:3000`
- api: `http://localhost:8000`
- postgres: `localhost:5432`
- redis: `localhost:6379`
- minio: `http://localhost:9001`

## Database Migrations

```bash
cd apps/api
.venv/bin/alembic upgrade head
```

## Mock Provider

Default mode is safe local mock mode:

```env
MODEL_PROVIDER_MODE=mock
```

Mock mode runs the full persistence chain: `generation_jobs`, `model_runs`, `generated_assets`, `quality_reports`, `cost_records`, and `audit_logs`.

## Live Provider

Set:

```env
MODEL_PROVIDER_MODE=live
FASHN_API_KEY=
FAL_KEY=
OPENAI_API_KEY=
```

Live provider code is isolated in `apps/api/app/providers`. Business services must not call model APIs directly. Real API key validation is still marked as TODO in `docs/model-routing.md`.

## Demo Flow

1. Register or log in at `/register` or `/login`.
2. Open `/merchant/products/new` and create a demo product.
3. Open `/creator/profile` and create a creator profile.
4. Open `/creator/assets` and add a demo portrait plus consent.
5. Open `/merchant/campaigns/new` and create a demo campaign.
6. Open `/studio/generate` and create a `final_standard` job.
7. Review the output at `/studio/jobs/{jobId}`.
8. Approve or reject from the review panel.
9. Inspect `/admin/jobs` and `/admin/model-runs`.

## Tests

```bash
pnpm api:test
pnpm --filter web lint
pnpm --filter web build
```

## Security Notes

- Model API keys are backend-only and never use `NEXT_PUBLIC_*`.
- Generation requires active creator consent.
- Signed URLs are short-lived.
- Upload presign responses do not expose raw storage keys.
- Third-party output URLs are treated as temporary; worker code stores generated assets under owned storage keys.
