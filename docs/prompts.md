# Prompts

Prompt templates are versioned in `apps/api/app/prompts`.

- `fashn.py`: Try-on instruction prompt.
- `flux.py`: Premium social campaign refinement prompt.
- `openai_image.py`: Final polish and cover image prompt.
- `qc.py`: Strict fashion campaign QC prompt.

Every model run stores:

- `prompt_name`
- `prompt_version`
- request payload
- provider response payload or error

Do not scatter prompt strings into business services.
