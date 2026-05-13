def is_safe_public_url(value: str) -> bool:
    return value.startswith(("http://", "https://", "/generated/"))
