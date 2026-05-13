PROMPT = {
    "name": "gpt_image_final_polish",
    "version": "2026-05-13",
    "template": """Create a polished fashion social media commercial image.
Keep the garment visually identical, creator identity consistent, and body realistic.
Aspect ratio: {aspect_ratio}
Style: {style}
Platform: {platform}""",
    "required_variables": ["aspect_ratio", "style", "platform"],
}
