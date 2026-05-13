PROMPT = {
    "name": "flux_social_refine",
    "version": "2026-05-13",
    "template": """You are editing a fashion campaign image.
Preserve the exact garment, creator identity, body proportions, skin tone, and pose.
Improve lighting, background, composition, depth, and editorial quality.
Scene direction: {scene_direction}
Brand direction: {brand_direction}
Output a realistic premium social-media-ready fashion image.""",
    "required_variables": ["scene_direction", "brand_direction"],
}
