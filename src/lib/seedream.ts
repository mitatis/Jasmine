const SEEDREAM_MODEL = "doubao-seedream-5-0-260128";

type SeedreamGenerateInput = {
  prompt: string;
  images?: string[];
  maxImages?: number;
  sequential?: boolean;
  size?: "2K" | "4K";
};

type SeedreamResponse = {
  data?: Array<{
    url?: string;
    b64_json?: string;
  }>;
  error?: {
    code?: string;
    message?: string;
  };
};

export async function generateSeedreamImages(input: SeedreamGenerateInput) {
  const apiKey =
    process.env.SEEDREAM_API_KEY ??
    process.env.DOUBAO_API_KEY ??
    process.env.AI_302_API_KEY;
  const baseUrl = process.env.SEEDREAM_API_BASE_URL ?? "https://api.302.ai";

  if (!apiKey) {
    throw new Error("Missing SEEDREAM_API_KEY");
  }

  const maxImages = Math.min(Math.max(input.maxImages ?? 1, 1), 15);
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/doubao/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: SEEDREAM_MODEL,
      prompt: input.prompt,
      image: input.images?.length ? input.images : undefined,
      size: input.size ?? "2K",
      sequential_image_generation: input.sequential || maxImages > 1 ? "auto" : "disabled",
      sequential_image_generation_options: input.sequential || maxImages > 1 ? { max_images: maxImages } : undefined,
      response_format: "url",
      stream: false,
      watermark: false,
    }),
    signal: AbortSignal.timeout(90_000),
  });

  const payload = (await response.json()) as SeedreamResponse;
  if (!response.ok || payload.error) {
    throw new Error(payload.error?.message ?? `Seedream request failed: ${response.status}`);
  }

  const images =
    payload.data
      ?.map((item) => item.url ?? (item.b64_json ? `data:image/jpeg;base64,${item.b64_json}` : ""))
      .filter(Boolean) ?? [];

  if (!images.length) {
    throw new Error("Seedream returned no images");
  }

  return images;
}
