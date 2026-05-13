from fastapi import APIRouter

from app.api.v1 import admin, approvals, auth, brands, campaigns, creators, generation_jobs, organizations, products, uploads, webhooks

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(auth.router)
api_router.include_router(organizations.router)
api_router.include_router(brands.router)
api_router.include_router(products.router)
api_router.include_router(creators.router)
api_router.include_router(campaigns.router)
api_router.include_router(uploads.router)
api_router.include_router(generation_jobs.router)
api_router.include_router(approvals.router)
api_router.include_router(admin.router)
api_router.include_router(webhooks.router)
