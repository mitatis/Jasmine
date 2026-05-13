# Architecture

Jasmine v0.1 is a B2B2C AI fashion campaign production platform.

The repository is a pnpm monorepo:

- `apps/web`: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, and Zustand.
- `apps/api`: FastAPI, SQLAlchemy 2.x, Alembic, Celery, Redis, PostgreSQL, and S3-compatible storage adapters.

Core flow:

1. Merchant creates organization, brand, product, product image, and campaign brief.
2. Creator creates a profile, uploads an authorized portrait asset, and signs consent.
3. Merchant creates a generation job.
4. API validates permissions, product readiness, and creator consent.
5. Worker runs provider chain through the unified provider interface.
6. Outputs are copied to owned storage, scored by QC, stored as generated assets, and moved to review.
7. Merchant or creator approves, rejects, or requests regeneration.

All model calls go through `app/providers/*`. Business services must not call third-party model APIs directly.
