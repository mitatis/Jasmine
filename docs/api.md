# API

Base prefix: `/api/v1`.

Implemented groups:

- `POST /auth/register`, `POST /auth/login`, `GET /auth/me`, `POST /auth/logout`
- `GET/POST /organizations`, `GET /organizations/{org_id}`, `POST /organizations/{org_id}/members`
- `POST /brands`, `GET /brands/me`, `PATCH /brands/{brand_id}`
- `GET/POST /products`, `GET/PATCH /products/{product_id}`, `POST /products/{product_id}/images`, `DELETE /product-images/{image_id}`
- `GET /creators`, `POST /creators/profile`, `GET /creators/me`, `PATCH /creators/{creator_id}`, `POST /creators/{creator_id}/assets`, `POST /creators/{creator_id}/consents`, `POST /consents/{consent_id}/revoke`
- `GET/POST /campaigns`, `GET/PATCH /campaigns/{campaign_id}`, `POST /campaigns/{campaign_id}/products`, `POST /campaigns/{campaign_id}/creators`
- `POST /uploads/presign`, `POST /uploads/confirm`
- `POST/GET /generation-jobs`, `GET /generation-jobs/{job_id}`, `POST /generation-jobs/{job_id}/retry`, `POST /generation-jobs/{job_id}/cancel`, `POST /generation-jobs/{job_id}/select-asset`
- `POST /generation-jobs/{job_id}/approve`, `POST /generation-jobs/{job_id}/reject`, `POST /generation-jobs/{job_id}/request-regeneration`
- `GET /admin/jobs`, `GET /admin/model-runs`, `GET /admin/costs`, `GET /admin/errors`
- `POST /webhooks/fashn`, `POST /webhooks/bfl`, `POST /webhooks/openai`

Auth uses an HTTP-only `access_token` cookie and accepts `Authorization: Bearer <token>`.

`POST /uploads/presign` intentionally returns `upload_id`, `upload_url`, `preview_url`, and `expires_in`, but not the raw storage key.
