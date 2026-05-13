import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "generated", "seedream-v1");
const MODEL = "doubao-seedream-5-0-260128";

async function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  try {
    const env = await fs.readFile(envPath, "utf8");
    for (const line of env.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        continue;
      }
      const [key, ...valueParts] = trimmed.split("=");
      if (!process.env[key]) {
        process.env[key] = valueParts.join("=").replace(/^['"]|['"]$/g, "");
      }
    }
  } catch {
    // .env.local is optional when env vars are already provided by the shell.
  }
}

function normalizeB64(raw) {
  return raw.includes(",") ? raw.split(",").pop() : raw;
}

async function saveImage(id, rawB64) {
  const fileName = `${id}.jpg`;
  const filePath = path.join(OUT_DIR, fileName);
  await fs.writeFile(filePath, Buffer.from(normalizeB64(rawB64), "base64"));
  return `/generated/seedream-v1/${fileName}`;
}

async function generateImages({ id, prompt, maxImages = 1, seed }) {
  const apiKey =
    process.env.SEEDREAM_API_KEY ??
    process.env.DOUBAO_API_KEY ??
    process.env.AI_302_API_KEY;
  const baseUrl = process.env.SEEDREAM_API_BASE_URL ?? "https://api.302.ai";

  if (!apiKey) {
    throw new Error("Missing SEEDREAM_API_KEY");
  }

  console.log(`Generating ${id} (${maxImages})...`);
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/doubao/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      size: "2K",
      seed,
      sequential_image_generation: maxImages > 1 ? "auto" : "disabled",
      sequential_image_generation_options: maxImages > 1 ? { max_images: maxImages } : undefined,
      response_format: "b64_json",
      stream: false,
      watermark: false,
    }),
    signal: AbortSignal.timeout(180_000),
  });

  const payload = await response.json();
  if (!response.ok || payload.error) {
    throw new Error(payload.error?.message ?? `Seedream failed: ${response.status}`);
  }

  const items = payload.data ?? [];
  if (!items.length) {
    throw new Error(`Seedream returned no image for ${id}`);
  }

  return items.map((item) => item.b64_json).filter(Boolean);
}

const bloggerBatches = [
  {
    bloggerId: "blogger-nora",
    persona:
      "同一位25岁中国女生，冷白皮，黑色及肩直发，中分，五官清冷，身材高挑偏瘦，拍照表情克制，有高街暗黑和黑白灰通勤感。",
    style:
      "高街暗黑通勤，小红书OOTD街拍，黑色短夹克、黑色飞行夹克、白色内搭、直筒长裤，利落肩线，上短下长比例。",
    location: "上海街头傍晚、玻璃幕墙和城市路面，真实自然光",
    ids: ["post-urban-black", "post-bomber-night"],
    seed: 1101,
  },
  {
    bloggerId: "blogger-mika",
    persona:
      "同一位27岁中国女生，暖白皮，深棕色低马尾，气质温柔干净，身材中等偏高，适合通勤极简和Clean Fit。",
    style:
      "低饱和Clean Fit通勤，沙色宽松西装、橄榄风衣、米白内搭、浅色阔腿裤，大地色高级感，适合上班和看展。",
    location: "白色办公楼外和美术馆入口，明亮柔和自然光",
    ids: ["post-clean-commute", "post-sand-gallery"],
    seed: 1201,
  },
  {
    bloggerId: "blogger-ryan",
    persona:
      "同一位26岁中国男生，黑色短发，清爽脸型，身材修长，轻复古气质，不夸张，适合美式复古和牛仔穿搭。",
    style:
      "美式复古日常，小红书OOTD，水洗牛仔外套、白T、深色直筒裤、复古皮带，咖啡店门口街拍，层次清楚。",
    location: "街角咖啡店和复古市集外，午后自然光",
    ids: ["post-vintage-leather", "post-denim-cafe"],
    seed: 1301,
  },
  {
    bloggerId: "blogger-seo",
    persona:
      "同一位24岁中国女生，圆脸，黑色长发微卷，妆容清淡，亲和温柔，身材小巧，穿搭偏韩系宽松和柔和针织。",
    style:
      "韩系宽松松弛感，象牙白针织、浅灰长裤、柔和同色系叠穿，温柔干净，小红书居家和街边OOTD。",
    location: "浅色家居空间和安静社区街道，柔和窗光",
    ids: ["post-loose-seoul", "post-ivory-layer"],
    seed: 1401,
  },
];

const productSpecs = [
  {
    id: "product-jacket-black",
    prompt:
      "单件服装商品图，黑色短夹克平铺在暖白色背景上，正面完整展开，能清晰看到短款版型、利落肩线、拉链、口袋和袖口细节。没有人物、没有模特、没有衣架、没有品牌logo、没有文字，电商商品摄影，柔和阴影，真实布料质感。",
    seed: 2101,
  },
  {
    id: "product-blazer-sand",
    prompt:
      "单件服装商品图，沙色宽松西装外套平铺在暖白色背景上，正面完整展开，清晰展示翻领、垫肩、单排扣、宽松直筒版型和面料垂感。没有人物、没有模特、没有衣架、没有品牌logo、没有文字，电商平铺摄影。",
    seed: 2201,
  },
  {
    id: "product-denim-wash",
    prompt:
      "单件服装商品图，做旧水洗牛仔外套平铺在浅灰白背景上，正面完整展开，清晰看到水洗纹理、胸前口袋、金属扣、短宽版型和下摆结构。没有人物、没有模特、没有衣架、没有品牌logo、没有文字，真实电商平铺图。",
    seed: 2301,
  },
  {
    id: "product-knit-ivory",
    prompt:
      "单件服装商品图，象牙白宽松针织衫平铺在暖白色背景上，正面完整展开，清晰展示圆领、罗纹袖口、柔软针织纹理和宽松落肩版型。没有人物、没有模特、没有衣架、没有品牌logo、没有文字，柔和自然阴影。",
    seed: 2401,
  },
  {
    id: "product-trench-olive",
    prompt:
      "单件服装商品图，低饱和橄榄色风衣平铺在浅米色背景上，正面完整展开，清晰展示翻领、腰带、门襟、袖袢、中长款版型和轻薄风衣面料。没有人物、没有模特、没有衣架、没有品牌logo、没有文字，电商平铺摄影。",
    seed: 2501,
  },
  {
    id: "product-bomber-noir",
    prompt:
      "单件服装商品图，暗黑尼龙飞行夹克平铺在暖白色背景上，正面完整展开，清晰看到短款廓形、罗纹领口袖口、拉链、袖袋和微光泽尼龙材质。没有人物、没有模特、没有衣架、没有品牌logo、没有文字，真实平铺商品摄影。",
    seed: 2601,
  },
];

function postBatchPrompt(batch) {
  return [
    "生成2张互相关联的小红书穿搭帖子封面图，竖版真实摄影，不要拼图，不要文字，不要水印。",
    `人物一致性：两张图必须是${batch.persona}`,
    `穿搭风格：${batch.style}`,
    `场景：${batch.location}`,
    "要求：全身或3/4身，画面像真实中国穿搭博主OOTD，亚裔人像，服装版型清楚，光影自然，手机也能看清主体。",
    "禁止：欧美面孔、品牌logo、中文字、价格牌、畸形手指、多余肢体、过度网红滤镜、AI塑料质感。",
  ].join("\n");
}

async function main() {
  await loadEnv();
  await fs.mkdir(OUT_DIR, { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    model: MODEL,
    posts: {},
    products: {},
  };

  for (const batch of bloggerBatches) {
    const images = await generateImages({
      id: `${batch.bloggerId}-posts`,
      prompt: postBatchPrompt(batch),
      maxImages: 2,
      seed: batch.seed,
    });

    for (let index = 0; index < batch.ids.length; index++) {
      const b64 = images[index] ?? images[0];
      const publicPath = await saveImage(batch.ids[index], b64);
      manifest.posts[batch.ids[index]] = {
        path: publicPath,
        bloggerId: batch.bloggerId,
      };
      console.log(`Saved ${batch.ids[index]} -> ${publicPath}`);
    }
  }

  for (const product of productSpecs) {
    const [image] = await generateImages({
      id: product.id,
      prompt: product.prompt,
      maxImages: 1,
      seed: product.seed,
    });
    const publicPath = await saveImage(product.id, image);
    manifest.products[product.id] = {
      path: publicPath,
    };
    console.log(`Saved ${product.id} -> ${publicPath}`);
  }

  await fs.writeFile(path.join(OUT_DIR, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Manifest saved to ${path.join(OUT_DIR, "manifest.json")}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
