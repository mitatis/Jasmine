def perceptual_hash_placeholder(image_url: str) -> str:
    return str(abs(hash(image_url)))
