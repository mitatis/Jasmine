# Model Routing

Provider mode is controlled by `MODEL_PROVIDER_MODE=mock|live`.

Routes:

- `preview`: FASHN Try-On v1.6
- `final_standard`: FASHN Try-On Max, 2K, quality, 2 images
- `final_premium`: FASHN Try-On Max, then FLUX.2 Max edit, then GPT Image 2 polish
- `batch_creator_campaign`: preview pool, QC, then Try-On Max

In mock mode, the system still creates model runs, generated assets, cost records, audit logs, and quality reports, but it uses `internal_mock` output URLs and no external API spend.

Live mode TODO:

- Verify exact FASHN endpoint shape and webhook signature once `FASHN_API_KEY` is available.
- Verify FLUX.2 Max/Pro request and pricing against the selected BFL/fal deployment.
- Verify GPT Image 2 image edit endpoint shape with real assets and logo/text print QC.
