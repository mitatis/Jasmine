import type { Blogger, Post, Product, RequestPost } from "@/lib/types";

export const generatedBloggers = [
  {
    "id": "blogger-001",
    "name": "Mika 通勤极简",
    "avatar": "M通",
    "bio": "通勤极简日常",
    "followerCount": 1200,
    "styleTags": [
      "通勤极简",
      "Clean Fit",
      "沙色西装"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-001.jpg"
  },
  {
    "id": "blogger-002",
    "name": "Luna 通勤极简",
    "avatar": "M通",
    "bio": "通勤极简日常",
    "followerCount": 1680,
    "styleTags": [
      "通勤极简",
      "Clean Fit",
      "沙色西装"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-006.jpg"
  },
  {
    "id": "blogger-003",
    "name": "Ari 通勤极简",
    "avatar": "M通",
    "bio": "通勤极简日常",
    "followerCount": 2160,
    "styleTags": [
      "通勤极简",
      "Clean Fit",
      "沙色西装"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-011.jpg"
  },
  {
    "id": "blogger-004",
    "name": "Mia 通勤极简",
    "avatar": "M通",
    "bio": "通勤极简日常",
    "followerCount": 2640,
    "styleTags": [
      "通勤极简",
      "Clean Fit",
      "沙色西装"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-016.jpg"
  },
  {
    "id": "blogger-005",
    "name": "Nora 通勤极简",
    "avatar": "M通",
    "bio": "通勤极简日常",
    "followerCount": 3120,
    "styleTags": [
      "通勤极简",
      "Clean Fit",
      "沙色西装"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-021.jpg"
  },
  {
    "id": "blogger-006",
    "name": "Nora 高街暗黑",
    "avatar": "N高",
    "bio": "高街暗黑日常",
    "followerCount": 6600,
    "styleTags": [
      "高街暗黑",
      "High Street Dark",
      "短款夹克",
      "黑白灰"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-026.jpg"
  },
  {
    "id": "blogger-007",
    "name": "Nova 高街暗黑",
    "avatar": "N高",
    "bio": "高街暗黑日常",
    "followerCount": 7080,
    "styleTags": [
      "高街暗黑",
      "High Street Dark",
      "短款夹克",
      "黑白灰"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-031.jpg"
  },
  {
    "id": "blogger-008",
    "name": "Rin 高街暗黑",
    "avatar": "N高",
    "bio": "高街暗黑日常",
    "followerCount": 7560,
    "styleTags": [
      "高街暗黑",
      "High Street Dark",
      "短款夹克",
      "黑白灰"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-036.jpg"
  },
  {
    "id": "blogger-009",
    "name": "Vivi 高街暗黑",
    "avatar": "N高",
    "bio": "高街暗黑日常",
    "followerCount": 8040,
    "styleTags": [
      "高街暗黑",
      "High Street Dark",
      "短款夹克",
      "黑白灰"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-041.jpg"
  },
  {
    "id": "blogger-010",
    "name": "Dora 高街暗黑",
    "avatar": "N高",
    "bio": "高街暗黑日常",
    "followerCount": 8520,
    "styleTags": [
      "高街暗黑",
      "High Street Dark",
      "短款夹克",
      "黑白灰"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-046.jpg"
  },
  {
    "id": "blogger-011",
    "name": "Ryan 美式复古",
    "avatar": "R美",
    "bio": "美式复古日常",
    "followerCount": 12000,
    "styleTags": [
      "美式复古",
      "Vintage American",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-051.jpg"
  },
  {
    "id": "blogger-012",
    "name": "Tom 美式复古",
    "avatar": "R美",
    "bio": "美式复古日常",
    "followerCount": 12480,
    "styleTags": [
      "美式复古",
      "Vintage American",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-056.jpg"
  },
  {
    "id": "blogger-013",
    "name": "Elliot 美式复古",
    "avatar": "R美",
    "bio": "美式复古日常",
    "followerCount": 12960,
    "styleTags": [
      "美式复古",
      "Vintage American",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-061.jpg"
  },
  {
    "id": "blogger-014",
    "name": "Kobe 美式复古",
    "avatar": "R美",
    "bio": "美式复古日常",
    "followerCount": 13440,
    "styleTags": [
      "美式复古",
      "Vintage American",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-066.jpg"
  },
  {
    "id": "blogger-015",
    "name": "Jude 美式复古",
    "avatar": "R美",
    "bio": "美式复古日常",
    "followerCount": 13920,
    "styleTags": [
      "美式复古",
      "Vintage American",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-071.jpg"
  },
  {
    "id": "blogger-016",
    "name": "Seo 韩系宽松",
    "avatar": "S韩",
    "bio": "韩系宽松日常",
    "followerCount": 17400,
    "styleTags": [
      "韩系宽松",
      "Korean Loose",
      "象牙针织",
      "松弛感"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-076.jpg"
  },
  {
    "id": "blogger-017",
    "name": "Mina 韩系宽松",
    "avatar": "S韩",
    "bio": "韩系宽松日常",
    "followerCount": 17880,
    "styleTags": [
      "韩系宽松",
      "Korean Loose",
      "象牙针织",
      "松弛感"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-081.jpg"
  },
  {
    "id": "blogger-018",
    "name": "Eun 韩系宽松",
    "avatar": "S韩",
    "bio": "韩系宽松日常",
    "followerCount": 18360,
    "styleTags": [
      "韩系宽松",
      "Korean Loose",
      "象牙针织",
      "松弛感"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-086.jpg"
  },
  {
    "id": "blogger-019",
    "name": "Haru 韩系宽松",
    "avatar": "S韩",
    "bio": "韩系宽松日常",
    "followerCount": 18840,
    "styleTags": [
      "韩系宽松",
      "Korean Loose",
      "象牙针织",
      "松弛感"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-091.jpg"
  },
  {
    "id": "blogger-020",
    "name": "Yuna 韩系宽松",
    "avatar": "S韩",
    "bio": "韩系宽松日常",
    "followerCount": 19320,
    "styleTags": [
      "韩系宽松",
      "Korean Loose",
      "象牙针织",
      "松弛感"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-096.jpg"
  },
  {
    "id": "blogger-021",
    "name": "Yuki 日系工装",
    "avatar": "Y日",
    "bio": "日系工装日常",
    "followerCount": 22800,
    "styleTags": [
      "日系工装",
      "Japanese Workwear",
      "工装马甲",
      "直筒裤"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-101.jpg"
  },
  {
    "id": "blogger-022",
    "name": "Sora 日系工装",
    "avatar": "Y日",
    "bio": "日系工装日常",
    "followerCount": 23280,
    "styleTags": [
      "日系工装",
      "Japanese Workwear",
      "工装马甲",
      "直筒裤"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-106.jpg"
  },
  {
    "id": "blogger-023",
    "name": "Riku 日系工装",
    "avatar": "Y日",
    "bio": "日系工装日常",
    "followerCount": 23760,
    "styleTags": [
      "日系工装",
      "Japanese Workwear",
      "工装马甲",
      "直筒裤"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-111.jpg"
  },
  {
    "id": "blogger-024",
    "name": "Nao 日系工装",
    "avatar": "Y日",
    "bio": "日系工装日常",
    "followerCount": 24240,
    "styleTags": [
      "日系工装",
      "Japanese Workwear",
      "工装马甲",
      "直筒裤"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-116.jpg"
  },
  {
    "id": "blogger-025",
    "name": "Lily 甜酷辣妹",
    "avatar": "L甜",
    "bio": "甜酷辣妹日常",
    "followerCount": 28200,
    "styleTags": [
      "甜酷辣妹",
      "Sweet Cool",
      "短上衣",
      "高腰裤"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-121.jpg"
  },
  {
    "id": "blogger-026",
    "name": "Zoe 甜酷辣妹",
    "avatar": "L甜",
    "bio": "甜酷辣妹日常",
    "followerCount": 28680,
    "styleTags": [
      "甜酷辣妹",
      "Sweet Cool",
      "短上衣",
      "高腰裤"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-126.jpg"
  },
  {
    "id": "blogger-027",
    "name": "Poppy 甜酷辣妹",
    "avatar": "L甜",
    "bio": "甜酷辣妹日常",
    "followerCount": 29160,
    "styleTags": [
      "甜酷辣妹",
      "Sweet Cool",
      "短上衣",
      "高腰裤"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-131.jpg"
  },
  {
    "id": "blogger-028",
    "name": "Claire 法式松弛",
    "avatar": "C法",
    "bio": "法式松弛日常",
    "followerCount": 33600,
    "styleTags": [
      "法式松弛",
      "French Ease",
      "轻熟",
      "垂感"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-136.jpg"
  },
  {
    "id": "blogger-029",
    "name": "Emma 法式松弛",
    "avatar": "C法",
    "bio": "法式松弛日常",
    "followerCount": 34080,
    "styleTags": [
      "法式松弛",
      "French Ease",
      "轻熟",
      "垂感"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-141.jpg"
  },
  {
    "id": "blogger-030",
    "name": "Noa 法式松弛",
    "avatar": "C法",
    "bio": "法式松弛日常",
    "followerCount": 34560,
    "styleTags": [
      "法式松弛",
      "French Ease",
      "轻熟",
      "垂感"
    ],
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-146.jpg"
  }
] satisfies Blogger[];

export const generatedProducts = [
  {
    "id": "product-bulk-001",
    "sellerId": "seller-clean",
    "name": "Urban 黑色短夹克",
    "price": 129,
    "stock": 3,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉感尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "黑色",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-001.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-001.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Urban 黑色短夹克 对应 黑白配也可以很高级，关键是版型 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-001.jpg",
    "sourcePostIds": [
      "post-bulk-015",
      "post-bulk-079"
    ]
  },
  {
    "id": "product-bulk-002",
    "sellerId": "seller-dark",
    "name": "Daily 象牙白棒球夹克",
    "price": 139,
    "stock": 4,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "微光泽尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "象牙白",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-002.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-002.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Daily 象牙白棒球夹克 对应 黑色飞行夹克配灰西裤，暗黑但不沉闷 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-002.jpg",
    "sourcePostIds": [
      "post-bulk-027",
      "post-bulk-030",
      "post-bulk-031"
    ]
  },
  {
    "id": "product-bulk-003",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 浅卡其工装外套",
    "price": 159,
    "stock": 5,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "复古做旧棉",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "浅卡其",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-003.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-003.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Loose Seoul 浅卡其工装外套 对应 水洗牛仔外套，周末咖啡店随手拍都好看 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-003.jpg",
    "sourcePostIds": [
      "post-bulk-051",
      "post-bulk-053",
      "post-bulk-054"
    ]
  },
  {
    "id": "product-bulk-004",
    "sellerId": "seller-seoul",
    "name": "Vintage 灰蓝飞行夹克",
    "price": 168,
    "stock": 6,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉感尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "灰蓝",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-004.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-004.jpg"
    ],
    "similarityScore": 85,
    "similarityReason": "Vintage 灰蓝飞行夹克 对应 浅色系穿搭想温柔，就别选太冷的白 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-004.jpg",
    "sourcePostIds": [
      "post-bulk-082"
    ]
  },
  {
    "id": "product-bulk-005",
    "sellerId": "seller-japan",
    "name": "Maison 黑色短外套",
    "price": 189,
    "stock": 7,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "微光泽尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "黑色",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-005.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-005.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Maison 黑色短外套 对应 宽松针织和长裤真的很适合周末 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-005.jpg",
    "sourcePostIds": [
      "post-bulk-083",
      "post-bulk-105",
      "post-bulk-109"
    ]
  },
  {
    "id": "product-bulk-006",
    "sellerId": "seller-sweet",
    "name": "Studio 象牙白短夹克",
    "price": 199,
    "stock": 8,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "复古做旧棉",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "象牙白",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-006.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-006.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Studio 象牙白短夹克 对应 同色系叠穿比想象中更显高级 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-006.jpg",
    "sourcePostIds": [
      "post-bulk-084",
      "post-bulk-121",
      "post-bulk-124"
    ]
  },
  {
    "id": "product-bulk-007",
    "sellerId": "seller-french",
    "name": "North 浅卡其棒球夹克",
    "price": 219,
    "stock": 9,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉感尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "法式松弛",
      "French Ease",
      "浅卡其",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-007.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-007.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "North 浅卡其棒球夹克 对应 韩系松弛感的关键是轮廓不要太硬 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-007.jpg",
    "sourcePostIds": [
      "post-bulk-085",
      "post-bulk-138",
      "post-bulk-148"
    ]
  },
  {
    "id": "product-bulk-008",
    "sellerId": "seller-clean",
    "name": "Urban 灰蓝工装外套",
    "price": 239,
    "stock": 3,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "微光泽尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "灰蓝",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-008.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-008.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Urban 灰蓝工装外套 对应 黑白配也可以很高级，关键是版型 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-008.jpg",
    "sourcePostIds": [
      "post-bulk-010",
      "post-bulk-025",
      "post-bulk-086"
    ]
  },
  {
    "id": "product-bulk-009",
    "sellerId": "seller-dark",
    "name": "Daily 黑色飞行夹克",
    "price": 249,
    "stock": 4,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "复古做旧棉",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "黑色",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-009.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-009.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Daily 黑色飞行夹克 对应 黑色短夹克 + 高腰裤，比例直接拉满 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-009.jpg",
    "sourcePostIds": [
      "post-bulk-026",
      "post-bulk-029",
      "post-bulk-033"
    ]
  },
  {
    "id": "product-bulk-010",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 象牙白短外套",
    "price": 279,
    "stock": 5,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉感尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "象牙白",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-010.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-010.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Loose Seoul 象牙白短外套 对应 白T + 牛仔夹克，周末市集最省心 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-010.jpg",
    "sourcePostIds": [
      "post-bulk-052",
      "post-bulk-055",
      "post-bulk-056"
    ]
  },
  {
    "id": "product-bulk-011",
    "sellerId": "seller-seoul",
    "name": "Vintage 浅卡其短夹克",
    "price": 299,
    "stock": 6,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "微光泽尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "浅卡其",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-011.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-011.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Vintage 浅卡其短夹克 对应 同色系叠穿比想象中更显高级 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-011.jpg",
    "sourcePostIds": [
      "post-bulk-089"
    ]
  },
  {
    "id": "product-bulk-012",
    "sellerId": "seller-japan",
    "name": "Maison 灰蓝棒球夹克",
    "price": 129,
    "stock": 7,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "复古做旧棉",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "灰蓝",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-012.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-012.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Maison 灰蓝棒球夹克 对应 韩系松弛感的关键是轮廓不要太硬 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-012.jpg",
    "sourcePostIds": [
      "post-bulk-090",
      "post-bulk-104",
      "post-bulk-115"
    ]
  },
  {
    "id": "product-bulk-013",
    "sellerId": "seller-sweet",
    "name": "Studio 黑色工装外套",
    "price": 139,
    "stock": 8,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉感尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "黑色",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-013.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-013.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Studio 黑色工装外套 对应 象牙白针织，韩系松弛感不用太复杂 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-013.jpg",
    "sourcePostIds": [
      "post-bulk-091",
      "post-bulk-122",
      "post-bulk-123"
    ]
  },
  {
    "id": "product-bulk-014",
    "sellerId": "seller-french",
    "name": "North 象牙白飞行夹克",
    "price": 159,
    "stock": 9,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "微光泽尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "法式松弛",
      "French Ease",
      "象牙白",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-014.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-014.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "North 象牙白飞行夹克 对应 浅色系穿搭想温柔，就别选太冷的白 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-014.jpg",
    "sourcePostIds": [
      "post-bulk-092",
      "post-bulk-143"
    ]
  },
  {
    "id": "product-bulk-015",
    "sellerId": "seller-clean",
    "name": "Urban 浅卡其短外套",
    "price": 168,
    "stock": 3,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "复古做旧棉",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "浅卡其",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-015.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-015.jpg"
    ],
    "similarityScore": 85,
    "similarityReason": "Urban 浅卡其短外套 对应 黑白配也可以很高级，关键是版型 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-015.jpg",
    "sourcePostIds": [
      "post-bulk-005",
      "post-bulk-020",
      "post-bulk-093"
    ]
  },
  {
    "id": "product-bulk-016",
    "sellerId": "seller-dark",
    "name": "Daily 灰蓝短夹克",
    "price": 189,
    "stock": 4,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉感尼龙",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "灰蓝",
      "外套/夹克"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-016.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-016.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Daily 灰蓝短夹克 对应 夜里穿黑色最稳，重点是面料和层次 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-016.jpg",
    "sourcePostIds": [
      "post-bulk-028",
      "post-bulk-032",
      "post-bulk-035"
    ]
  },
  {
    "id": "product-bulk-017",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 黑色系带风衣",
    "price": 199,
    "stock": 5,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "垂感西装料",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "黑色",
      "西装/风衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-017.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-017.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Loose Seoul 黑色系带风衣 对应 韩系松弛感的关键是轮廓不要太硬 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-017.jpg",
    "sourcePostIds": [
      "post-bulk-095"
    ]
  },
  {
    "id": "product-bulk-018",
    "sellerId": "seller-seoul",
    "name": "Vintage 象牙白轻薄西装",
    "price": 219,
    "stock": 6,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "羊毛混纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "象牙白",
      "西装/风衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-018.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-018.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Vintage 象牙白轻薄西装 对应 象牙白针织，韩系松弛感不用太复杂 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-018.jpg",
    "sourcePostIds": [
      "post-bulk-096"
    ]
  },
  {
    "id": "product-bulk-019",
    "sellerId": "seller-japan",
    "name": "Maison 浅卡其宽松西装",
    "price": 239,
    "stock": 7,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "TR 混纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "浅卡其",
      "西装/风衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-019.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-019.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Maison 浅卡其宽松西装 对应 浅色系穿搭想温柔，就别选太冷的白 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-019.jpg",
    "sourcePostIds": [
      "post-bulk-097",
      "post-bulk-107",
      "post-bulk-112"
    ]
  },
  {
    "id": "product-bulk-020",
    "sellerId": "seller-sweet",
    "name": "Studio 灰蓝通勤外套",
    "price": 249,
    "stock": 8,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "轻薄风衣布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "灰蓝",
      "西装/风衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-020.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-020.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Studio 灰蓝通勤外套 对应 宽松针织和长裤真的很适合周末 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-020.jpg",
    "sourcePostIds": [
      "post-bulk-098"
    ]
  },
  {
    "id": "product-bulk-021",
    "sellerId": "seller-french",
    "name": "North 黑色长风衣",
    "price": 279,
    "stock": 9,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "亚麻混纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "法式松弛",
      "French Ease",
      "黑色",
      "西装/风衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-021.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-021.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "North 黑色长风衣 对应 同色系叠穿比想象中更显高级 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-021.jpg",
    "sourcePostIds": [
      "post-bulk-099",
      "post-bulk-101",
      "post-bulk-136"
    ]
  },
  {
    "id": "product-bulk-022",
    "sellerId": "seller-clean",
    "name": "Urban 象牙白系带风衣",
    "price": 299,
    "stock": 3,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "垂感西装料",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "象牙白",
      "西装/风衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-022.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-022.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Urban 象牙白系带风衣 对应 沙色西装真的很适合初夏通勤 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-022.jpg",
    "sourcePostIds": [
      "post-bulk-001",
      "post-bulk-002",
      "post-bulk-003"
    ]
  },
  {
    "id": "product-bulk-023",
    "sellerId": "seller-dark",
    "name": "Daily 浅卡其轻薄西装",
    "price": 129,
    "stock": 4,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "羊毛混纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "浅卡其",
      "西装/风衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-023.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-023.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Daily 浅卡其轻薄西装 对应 马甲叠穿的层次感，真的很日系 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-023.jpg",
    "sourcePostIds": [
      "post-bulk-103"
    ]
  },
  {
    "id": "product-bulk-024",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 灰蓝宽松西装",
    "price": 139,
    "stock": 5,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "TR 混纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "灰蓝",
      "西装/风衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-024.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-024.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Loose Seoul 灰蓝宽松西装 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-024.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-025",
    "sellerId": "seller-seoul",
    "name": "Vintage 黑色通勤外套",
    "price": 159,
    "stock": 6,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "轻薄风衣布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "黑色",
      "西装/风衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-025.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-025.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Vintage 黑色通勤外套 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-025.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-026",
    "sellerId": "seller-japan",
    "name": "Maison 象牙白长风衣",
    "price": 168,
    "stock": 7,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "亚麻混纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "象牙白",
      "西装/风衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-026.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-026.jpg"
    ],
    "similarityScore": 85,
    "similarityReason": "Maison 象牙白长风衣 对应 卡其风衣一上身，日系感就出来了 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-026.jpg",
    "sourcePostIds": [
      "post-bulk-102",
      "post-bulk-106",
      "post-bulk-117"
    ]
  },
  {
    "id": "product-bulk-027",
    "sellerId": "seller-sweet",
    "name": "Studio 浅灰宽松毛衣",
    "price": 189,
    "stock": 8,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "羊毛混纺",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "浅灰",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-027.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-027.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Studio 浅灰宽松毛衣 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-027.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-028",
    "sellerId": "seller-french",
    "name": "North 深咖开衫",
    "price": 199,
    "stock": 9,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "亲肤棉线",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "法式松弛",
      "French Ease",
      "深咖",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-028.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-028.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "North 深咖开衫 对应 马甲叠穿的层次感，真的很日系 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-028.jpg",
    "sourcePostIds": [
      "post-bulk-108"
    ]
  },
  {
    "id": "product-bulk-029",
    "sellerId": "seller-clean",
    "name": "Urban 橄榄绿针织衫",
    "price": 219,
    "stock": 3,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "柔软针织混纺",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "橄榄绿",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-029.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-029.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Urban 橄榄绿针织衫 对应 看展穿沙色西装，干净但不会太正式 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-029.jpg",
    "sourcePostIds": [
      "post-bulk-003",
      "post-bulk-004",
      "post-bulk-013"
    ]
  },
  {
    "id": "product-bulk-030",
    "sellerId": "seller-dark",
    "name": "Daily 雾蓝罗纹上衣",
    "price": 239,
    "stock": 4,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "细腻坑条针织",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "雾蓝",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-030.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-030.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Daily 雾蓝罗纹上衣 对应 夜里穿黑色最稳，重点是面料和层次 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-030.jpg",
    "sourcePostIds": [
      "post-bulk-028",
      "post-bulk-033",
      "post-bulk-043"
    ]
  },
  {
    "id": "product-bulk-031",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 浅灰高领针织",
    "price": 249,
    "stock": 5,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "高弹罗纹针织",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "浅灰",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-031.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-031.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Loose Seoul 浅灰高领针织 对应 工装马甲配直筒裤，日系感很稳 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-031.jpg",
    "sourcePostIds": [
      "post-bulk-111"
    ]
  },
  {
    "id": "product-bulk-032",
    "sellerId": "seller-seoul",
    "name": "Vintage 深咖宽松毛衣",
    "price": 279,
    "stock": 6,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "羊毛混纺",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "深咖",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-032.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-032.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Vintage 深咖宽松毛衣 对应 象牙白针织，韩系松弛感不用太复杂 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-032.jpg",
    "sourcePostIds": [
      "post-bulk-076",
      "post-bulk-077",
      "post-bulk-078"
    ]
  },
  {
    "id": "product-bulk-033",
    "sellerId": "seller-japan",
    "name": "Maison 橄榄绿开衫",
    "price": 299,
    "stock": 7,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "亲肤棉线",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "橄榄绿",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-033.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-033.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Maison 橄榄绿开衫 对应 马甲叠穿的层次感，真的很日系 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-033.jpg",
    "sourcePostIds": [
      "post-bulk-113"
    ]
  },
  {
    "id": "product-bulk-034",
    "sellerId": "seller-sweet",
    "name": "Studio 雾蓝针织衫",
    "price": 129,
    "stock": 8,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "柔软针织混纺",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "雾蓝",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-034.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-034.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Studio 雾蓝针织衫 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-034.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-035",
    "sellerId": "seller-french",
    "name": "North 浅灰罗纹上衣",
    "price": 139,
    "stock": 9,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "细腻坑条针织",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "法式松弛",
      "French Ease",
      "浅灰",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-035.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-035.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "North 浅灰罗纹上衣 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-035.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-036",
    "sellerId": "seller-clean",
    "name": "Urban 深咖高领针织",
    "price": 159,
    "stock": 3,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "高弹罗纹针织",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "深咖",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-036.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-036.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Urban 深咖高领针织 对应 看展穿沙色西装，干净但不会太正式 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-036.jpg",
    "sourcePostIds": [
      "post-bulk-008",
      "post-bulk-009",
      "post-bulk-023"
    ]
  },
  {
    "id": "product-bulk-037",
    "sellerId": "seller-dark",
    "name": "Daily 橄榄绿宽松毛衣",
    "price": 168,
    "stock": 4,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "羊毛混纺",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "橄榄绿",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-037.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-037.jpg"
    ],
    "similarityScore": 85,
    "similarityReason": "Daily 橄榄绿宽松毛衣 对应 夜里穿黑色最稳，重点是面料和层次 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-037.jpg",
    "sourcePostIds": [
      "post-bulk-038"
    ]
  },
  {
    "id": "product-bulk-038",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 雾蓝开衫",
    "price": 189,
    "stock": 5,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "亲肤棉线",
    "care": "建议低温洗涤，平铺晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "雾蓝",
      "针织/毛衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-038.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-038.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Loose Seoul 雾蓝开衫 对应 马甲叠穿的层次感，真的很日系 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-038.jpg",
    "sourcePostIds": [
      "post-bulk-118"
    ]
  },
  {
    "id": "product-bulk-039",
    "sellerId": "seller-seoul",
    "name": "Vintage 深咖泡泡袖上衣",
    "price": 199,
    "stock": 6,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "轻薄泡泡纱",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "深咖",
      "衬衫/上衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-039.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-039.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Vintage 深咖泡泡袖上衣 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-039.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-040",
    "sellerId": "seller-japan",
    "name": "Maison 橄榄绿衬衫",
    "price": 219,
    "stock": 7,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉府绸",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "橄榄绿",
      "衬衫/上衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-040.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-040.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Maison 橄榄绿衬衫 对应 卡其风衣一上身，日系感就出来了 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-040.jpg",
    "sourcePostIds": [
      "post-bulk-102",
      "post-bulk-103",
      "post-bulk-105"
    ]
  },
  {
    "id": "product-bulk-041",
    "sellerId": "seller-sweet",
    "name": "Studio 雾蓝基础打底",
    "price": 239,
    "stock": 8,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "轻薄泡泡纱",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "雾蓝",
      "衬衫/上衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-041.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-041.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Studio 雾蓝基础打底 对应 黑粉配色真的很容易出片 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-041.jpg",
    "sourcePostIds": [
      "post-bulk-122",
      "post-bulk-126",
      "post-bulk-127"
    ]
  },
  {
    "id": "product-bulk-042",
    "sellerId": "seller-french",
    "name": "North 浅灰挺括衬衣",
    "price": 249,
    "stock": 9,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉府绸",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "法式松弛",
      "French Ease",
      "浅灰",
      "衬衫/上衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-042.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-042.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "North 浅灰挺括衬衣 对应 法式松弛感，靠的是颜色和垂感 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-042.jpg",
    "sourcePostIds": [
      "post-bulk-136",
      "post-bulk-137",
      "post-bulk-138"
    ]
  },
  {
    "id": "product-bulk-043",
    "sellerId": "seller-clean",
    "name": "Urban 深咖长袖上衣",
    "price": 279,
    "stock": 3,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "轻薄泡泡纱",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "深咖",
      "衬衫/上衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-043.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-043.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Urban 深咖长袖上衣 对应 沙色西装真的很适合初夏通勤 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-043.jpg",
    "sourcePostIds": [
      "post-bulk-001",
      "post-bulk-002",
      "post-bulk-005"
    ]
  },
  {
    "id": "product-bulk-044",
    "sellerId": "seller-dark",
    "name": "Daily 橄榄绿泡泡袖上衣",
    "price": 299,
    "stock": 4,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉府绸",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "橄榄绿",
      "衬衫/上衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-044.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-044.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Daily 橄榄绿泡泡袖上衣 对应 黑色短夹克 + 高腰裤，比例直接拉满 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-044.jpg",
    "sourcePostIds": [
      "post-bulk-026",
      "post-bulk-029",
      "post-bulk-030"
    ]
  },
  {
    "id": "product-bulk-045",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 雾蓝衬衫",
    "price": 129,
    "stock": 5,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "轻薄泡泡纱",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "雾蓝",
      "衬衫/上衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-045.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-045.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Loose Seoul 雾蓝衬衫 对应 水洗牛仔外套，周末咖啡店随手拍都好看 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-045.jpg",
    "sourcePostIds": [
      "post-bulk-051",
      "post-bulk-052",
      "post-bulk-053"
    ]
  },
  {
    "id": "product-bulk-046",
    "sellerId": "seller-seoul",
    "name": "Vintage 浅灰基础打底",
    "price": 139,
    "stock": 6,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉府绸",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "浅灰",
      "衬衫/上衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-046.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-046.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Vintage 浅灰基础打底 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-046.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-047",
    "sellerId": "seller-japan",
    "name": "Maison 深咖挺括衬衣",
    "price": 159,
    "stock": 7,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "轻薄泡泡纱",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "深咖",
      "衬衫/上衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-047.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-047.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Maison 深咖挺括衬衣 对应 工装马甲配直筒裤，日系感很稳 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-047.jpg",
    "sourcePostIds": [
      "post-bulk-101",
      "post-bulk-108",
      "post-bulk-112"
    ]
  },
  {
    "id": "product-bulk-048",
    "sellerId": "seller-sweet",
    "name": "Studio 橄榄绿长袖上衣",
    "price": 168,
    "stock": 8,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉府绸",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "橄榄绿",
      "衬衫/上衣"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-048.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-048.jpg"
    ],
    "similarityScore": 85,
    "similarityReason": "Studio 橄榄绿长袖上衣 对应 甜酷风最稳的还是短上衣配长裤 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-048.jpg",
    "sourcePostIds": [
      "post-bulk-121",
      "post-bulk-123",
      "post-bulk-124"
    ]
  },
  {
    "id": "product-bulk-049",
    "sellerId": "seller-french",
    "name": "North 黑色牛仔裤",
    "price": 189,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "弹力斜纹布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "法式松弛",
      "French Ease",
      "黑色",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-049.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-049.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "North 黑色牛仔裤 对应 看展穿浅咖西装，会比黑色柔很多 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-049.jpg",
    "sourcePostIds": [
      "post-bulk-137",
      "post-bulk-138",
      "post-bulk-141"
    ]
  },
  {
    "id": "product-bulk-050",
    "sellerId": "seller-clean",
    "name": "Urban 象牙白阔腿裤",
    "price": 199,
    "stock": 3,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "垂感西装料",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "象牙白",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-050.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-050.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Urban 象牙白阔腿裤 对应 橄榄绿风衣比黑白灰更有记忆点 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-050.jpg",
    "sourcePostIds": [
      "post-bulk-002",
      "post-bulk-005",
      "post-bulk-006"
    ]
  },
  {
    "id": "product-bulk-051",
    "sellerId": "seller-dark",
    "name": "Daily 浅卡其工装裤",
    "price": 219,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉麻混纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "浅卡其",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-051.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-051.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Daily 浅卡其工装裤 对应 夜里穿黑色最稳，重点是面料和层次 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-051.jpg",
    "sourcePostIds": [
      "post-bulk-028",
      "post-bulk-030",
      "post-bulk-031"
    ]
  },
  {
    "id": "product-bulk-052",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 灰蓝西裤",
    "price": 239,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "柔软西装布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "灰蓝",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-052.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-052.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Loose Seoul 灰蓝西裤 对应 水洗牛仔外套，周末咖啡店随手拍都好看 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-052.jpg",
    "sourcePostIds": [
      "post-bulk-051",
      "post-bulk-053",
      "post-bulk-054"
    ]
  },
  {
    "id": "product-bulk-053",
    "sellerId": "seller-seoul",
    "name": "Vintage 黑色直筒裤",
    "price": 249,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "水洗牛仔",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "黑色",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-053.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-053.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Vintage 黑色直筒裤 对应 浅色系穿搭想温柔，就别选太冷的白 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-053.jpg",
    "sourcePostIds": [
      "post-bulk-077",
      "post-bulk-078",
      "post-bulk-080"
    ]
  },
  {
    "id": "product-bulk-054",
    "sellerId": "seller-japan",
    "name": "Maison 象牙白牛仔裤",
    "price": 279,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "弹力斜纹布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "象牙白",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-054.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-054.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Maison 象牙白牛仔裤 对应 工装马甲配直筒裤，日系感很稳 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-054.jpg",
    "sourcePostIds": [
      "post-bulk-101",
      "post-bulk-102",
      "post-bulk-103"
    ]
  },
  {
    "id": "product-bulk-055",
    "sellerId": "seller-sweet",
    "name": "Studio 浅卡其阔腿裤",
    "price": 299,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "垂感西装料",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "浅卡其",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-055.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-055.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Studio 浅卡其阔腿裤 对应 甜酷风最稳的还是短上衣配长裤 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-055.jpg",
    "sourcePostIds": [
      "post-bulk-121",
      "post-bulk-122",
      "post-bulk-123"
    ]
  },
  {
    "id": "product-bulk-056",
    "sellerId": "seller-french",
    "name": "North 灰蓝工装裤",
    "price": 129,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉麻混纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "法式松弛",
      "French Ease",
      "灰蓝",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-056.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-056.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "North 灰蓝工装裤 对应 法式松弛感，靠的是颜色和垂感 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-056.jpg",
    "sourcePostIds": [
      "post-bulk-136",
      "post-bulk-139",
      "post-bulk-140"
    ]
  },
  {
    "id": "product-bulk-057",
    "sellerId": "seller-clean",
    "name": "Urban 黑色西裤",
    "price": 139,
    "stock": 3,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "柔软西装布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "黑色",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-057.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-057.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Urban 黑色西裤 对应 沙色西装真的很适合初夏通勤 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-057.jpg",
    "sourcePostIds": [
      "post-bulk-001",
      "post-bulk-003",
      "post-bulk-004"
    ]
  },
  {
    "id": "product-bulk-058",
    "sellerId": "seller-dark",
    "name": "Daily 象牙白直筒裤",
    "price": 159,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "水洗牛仔",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "象牙白",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-058.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-058.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Daily 象牙白直筒裤 对应 黑色短夹克 + 高腰裤，比例直接拉满 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-058.jpg",
    "sourcePostIds": [
      "post-bulk-026",
      "post-bulk-027",
      "post-bulk-029"
    ]
  },
  {
    "id": "product-bulk-059",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 浅卡其牛仔裤",
    "price": 168,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "弹力斜纹布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "浅卡其",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-059.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-059.jpg"
    ],
    "similarityScore": 85,
    "similarityReason": "Loose Seoul 浅卡其牛仔裤 对应 白T + 牛仔夹克，周末市集最省心 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-059.jpg",
    "sourcePostIds": [
      "post-bulk-052",
      "post-bulk-055",
      "post-bulk-056"
    ]
  },
  {
    "id": "product-bulk-060",
    "sellerId": "seller-seoul",
    "name": "Vintage 灰蓝阔腿裤",
    "price": 189,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "垂感西装料",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "灰蓝",
      "裤装"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-060.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-060.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Vintage 灰蓝阔腿裤 对应 象牙白针织，韩系松弛感不用太复杂 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-060.jpg",
    "sourcePostIds": [
      "post-bulk-076",
      "post-bulk-079",
      "post-bulk-083"
    ]
  },
  {
    "id": "product-bulk-061",
    "sellerId": "seller-japan",
    "name": "Maison 象牙白半裙",
    "price": 199,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "轻薄垂感面料",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "象牙白",
      "半裙/长裙"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-061.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-061.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Maison 象牙白半裙 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-061.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-062",
    "sellerId": "seller-sweet",
    "name": "Studio 浅卡其百褶裙",
    "price": 219,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉麻混纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "浅卡其",
      "半裙/长裙"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-062.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-062.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Studio 浅卡其百褶裙 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-062.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-063",
    "sellerId": "seller-french",
    "name": "North 灰蓝A 字裙",
    "price": 239,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "高密度缎面",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "法式松弛",
      "French Ease",
      "灰蓝",
      "半裙/长裙"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-063.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-063.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "North 灰蓝A 字裙 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-063.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-064",
    "sellerId": "seller-clean",
    "name": "Urban 黑色长裙",
    "price": 249,
    "stock": 3,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "仿醋酸",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "黑色",
      "半裙/长裙"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-064.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-064.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Urban 黑色长裙 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-064.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-065",
    "sellerId": "seller-dark",
    "name": "Daily 象牙白缎面裙",
    "price": 279,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "柔软雪纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "象牙白",
      "半裙/长裙"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-065.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-065.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Daily 象牙白缎面裙 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-065.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-066",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 浅卡其半裙",
    "price": 299,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "轻薄垂感面料",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "浅卡其",
      "半裙/长裙"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-066.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-066.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Loose Seoul 浅卡其半裙 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-066.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-067",
    "sellerId": "seller-seoul",
    "name": "Vintage 灰蓝百褶裙",
    "price": 129,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉麻混纺",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "灰蓝",
      "半裙/长裙"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-067.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-067.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Vintage 灰蓝百褶裙 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-067.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-068",
    "sellerId": "seller-japan",
    "name": "Maison 黑色A 字裙",
    "price": 139,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "sizeGuide": [
      {
        "size": "S",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "M",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "L",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "高密度缎面",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "黑色",
      "半裙/长裙"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-068.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-068.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Maison 黑色A 字裙 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-068.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-069",
    "sellerId": "seller-sweet",
    "name": "Studio 灰蓝马甲",
    "price": 159,
    "stock": 8,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "挺括斜纹布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "灰蓝",
      "马甲/背心"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-069.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-069.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Studio 灰蓝马甲 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-069.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-070",
    "sellerId": "seller-french",
    "name": "North 黑色针织背心",
    "price": 168,
    "stock": 9,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉感工装布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "法式松弛",
      "French Ease",
      "黑色",
      "马甲/背心"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-070.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-070.jpg"
    ],
    "similarityScore": 85,
    "similarityReason": "North 黑色针织背心 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-070.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-071",
    "sellerId": "seller-clean",
    "name": "Urban 象牙白马甲",
    "price": 189,
    "stock": 3,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "挺括斜纹布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "象牙白",
      "马甲/背心"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-071.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-071.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Urban 象牙白马甲 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-071.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-072",
    "sellerId": "seller-dark",
    "name": "Daily 浅卡其针织背心",
    "price": 199,
    "stock": 4,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉感工装布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "浅卡其",
      "马甲/背心"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-072.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-072.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Daily 浅卡其针织背心 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-072.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-073",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 灰蓝马甲",
    "price": 219,
    "stock": 5,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "挺括斜纹布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "美式复古",
      "Vintage American",
      "灰蓝",
      "马甲/背心"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-073.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-073.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Loose Seoul 灰蓝马甲 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-073.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-074",
    "sellerId": "seller-seoul",
    "name": "Vintage 黑色针织背心",
    "price": 239,
    "stock": 6,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "sizeGuide": [
      {
        "size": "M",
        "shoulder": "42cm",
        "chest": "104cm",
        "length": "62cm"
      },
      {
        "size": "L",
        "shoulder": "44cm",
        "chest": "110cm",
        "length": "64cm"
      },
      {
        "size": "XL",
        "shoulder": "46cm",
        "chest": "116cm",
        "length": "66cm"
      }
    ],
    "material": "棉感工装布",
    "care": "建议低温洗涤，悬挂晾干。",
    "tags": [
      "韩系宽松",
      "Korean Loose",
      "黑色",
      "马甲/背心"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-074.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-074.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "Vintage 黑色针织背心 与同风格帖子高度匹配，适合继续试穿。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-074.jpg",
    "sourcePostIds": []
  },
  {
    "id": "product-bulk-075",
    "sellerId": "seller-japan",
    "name": "Maison 浅灰斜挎包",
    "price": 249,
    "stock": 7,
    "sizes": [
      "单一尺寸"
    ],
    "sizeGuide": [],
    "material": "荔枝纹 PU",
    "care": "避免暴晒和过度挤压，表面污渍用软布轻擦。",
    "tags": [
      "日系工装",
      "Japanese Workwear",
      "浅灰",
      "包袋/配饰"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-075.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-075.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Maison 浅灰斜挎包 对应 牛仔工装配件一点，日常也能穿 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-075.jpg",
    "sourcePostIds": [
      "post-bulk-104",
      "post-bulk-109",
      "post-bulk-114"
    ]
  },
  {
    "id": "product-bulk-076",
    "sellerId": "seller-sweet",
    "name": "Studio 深咖腋下包",
    "price": 279,
    "stock": 8,
    "sizes": [
      "单一尺寸"
    ],
    "sizeGuide": [],
    "material": "压纹皮革",
    "care": "避免暴晒和过度挤压，表面污渍用软布轻擦。",
    "tags": [
      "甜酷辣妹",
      "Sweet Cool",
      "深咖",
      "包袋/配饰"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-076.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-076.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Studio 深咖腋下包 对应 亮一点的包袋能把整套提起来 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-076.jpg",
    "sourcePostIds": [
      "post-bulk-125",
      "post-bulk-130",
      "post-bulk-135"
    ]
  },
  {
    "id": "product-bulk-077",
    "sellerId": "seller-french",
    "name": "North 橄榄绿手提包",
    "price": 299,
    "stock": 9,
    "sizes": [
      "单一尺寸"
    ],
    "sizeGuide": [],
    "material": "微光泽尼龙",
    "care": "避免暴晒和过度挤压，表面污渍用软布轻擦。",
    "tags": [
      "法式松弛",
      "French Ease",
      "橄榄绿",
      "包袋/配饰"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-077.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-077.jpg"
    ],
    "similarityScore": 96,
    "similarityReason": "North 橄榄绿手提包 对应 奶油白和浅咖，真的很适合拍照 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-077.jpg",
    "sourcePostIds": [
      "post-bulk-140",
      "post-bulk-145",
      "post-bulk-150"
    ]
  },
  {
    "id": "product-bulk-078",
    "sellerId": "seller-clean",
    "name": "Urban 雾蓝托特包",
    "price": 129,
    "stock": 3,
    "sizes": [
      "单一尺寸"
    ],
    "sizeGuide": [],
    "material": "头层牛皮",
    "care": "避免暴晒和过度挤压，表面污渍用软布轻擦。",
    "tags": [
      "通勤极简",
      "Clean Fit",
      "雾蓝",
      "包袋/配饰"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-078.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-078.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Urban 雾蓝托特包 对应 象牙白针织，松弛感比纯白更柔和 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-078.jpg",
    "sourcePostIds": [
      "post-bulk-004",
      "post-bulk-009",
      "post-bulk-014"
    ]
  },
  {
    "id": "product-bulk-079",
    "sellerId": "seller-dark",
    "name": "Daily 浅灰单肩包",
    "price": 139,
    "stock": 4,
    "sizes": [
      "单一尺寸"
    ],
    "sizeGuide": [],
    "material": "帆布拼皮",
    "care": "避免暴晒和过度挤压，表面污渍用软布轻擦。",
    "tags": [
      "高街暗黑",
      "High Street Dark",
      "浅灰",
      "包袋/配饰"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-079.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-079.jpg"
    ],
    "similarityScore": 86,
    "similarityReason": "Daily 浅灰单肩包 对应 黑色飞行夹克配灰西裤，暗黑但不沉闷 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-079.jpg",
    "sourcePostIds": [
      "post-bulk-027",
      "post-bulk-032",
      "post-bulk-037"
    ]
  },
  {
    "id": "product-bulk-080",
    "sellerId": "seller-vintage",
    "name": "Loose Seoul 深咖斜挎包",
    "price": 159,
    "stock": 5,
    "sizes": [
      "单一尺寸"
    ],
    "sizeGuide": [],
    "material": "荔枝纹 PU",
    "care": "避免暴晒和过度挤压，表面污渍用软布轻擦。",
    "tags": [
      "美式复古",
      "Vintage American",
      "深咖",
      "包袋/配饰"
    ],
    "image": "/generated/seedream-bulk/products/product-bulk-080.jpg",
    "detailImages": [
      "/generated/seedream-bulk/products/product-bulk-080.jpg"
    ],
    "similarityScore": 91,
    "similarityReason": "Loose Seoul 深咖斜挎包 对应 宽松针织和长裤真的很适合周末 的穿搭逻辑，版型和色系都一致。",
    "tryOnPreset": "/generated/seedream-bulk/products/product-bulk-080.jpg",
    "sourcePostIds": [
      "post-bulk-078"
    ]
  }
] satisfies Product[];

export const generatedPosts = [
  {
    "id": "post-bulk-001",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-001",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-057",
      "product-bulk-043"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-057",
        "label": "黑色西裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "沙色西装真的很适合初夏通勤",
    "body": "这套用低饱和沙色西装配白色内搭和顺色下装，整体看起来很干净，也不会有太强的办公室感，通勤和看展都能穿。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-001.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-001.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "沙色西装",
      "Clean Fit"
    ],
    "likes": 120,
    "createdAt": "2026-05-01T10:30:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-002",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-001",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-050",
      "product-bulk-043"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "橄榄绿风衣比黑白灰更有记忆点",
    "body": "橄榄绿风衣配浅色内搭和同色系裤子，整体是轻熟通勤感，颜色安静但比基础黑白更有画面。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-002.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-002.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "橄榄风衣",
      "轻熟"
    ],
    "likes": 134,
    "createdAt": "2026-05-01T10:24:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-003",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-001",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-029",
      "product-bulk-057"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-029",
        "label": "橄榄绿针织衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-057",
        "label": "黑色西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "看展穿沙色西装，干净但不会太正式",
    "body": "沙色西装和浅色针织组合在一起很稳，适合看展、咖啡店和轻通勤，重点是轮廓干净，颜色不要太跳。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-003.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-003.jpg"
    ],
    "styleTags": [
      "Clean Fit",
      "沙色西装",
      "看展穿搭"
    ],
    "likes": 148,
    "createdAt": "2026-05-01T10:18:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-004",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-001",
    "productId": "product-bulk-029",
    "productIds": [
      "product-bulk-029",
      "product-bulk-057",
      "product-bulk-078"
    ],
    "productTags": [
      {
        "productId": "product-bulk-029",
        "label": "橄榄绿针织衫",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-057",
        "label": "黑色西裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-078",
        "label": "雾蓝托特包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "象牙白针织，松弛感比纯白更柔和",
    "body": "象牙白针织比纯白更温柔，和浅灰裤子放在一起不会割裂，拍出来会有一种很舒服的安静感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-004.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-004.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "象牙针织",
      "松弛感"
    ],
    "likes": 162,
    "createdAt": "2026-05-01T10:12:00.000Z",
    "priceLabel": "¥219 起"
  },
  {
    "id": "post-bulk-005",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-001",
    "productId": "product-bulk-015",
    "productIds": [
      "product-bulk-015",
      "product-bulk-043",
      "product-bulk-050"
    ],
    "productTags": [
      {
        "productId": "product-bulk-015",
        "label": "浅卡其短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑白配也可以很高级，关键是版型",
    "body": "这套把黑色短夹克和白色内搭做了清晰分层，下装用高腰直筒裤拉长比例，适合喜欢极简但不想太沉闷的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-005.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-005.jpg"
    ],
    "styleTags": [
      "Clean Fit",
      "黑白灰",
      "短款夹克"
    ],
    "likes": 176,
    "createdAt": "2026-05-01T10:06:00.000Z",
    "priceLabel": "¥168 起"
  },
  {
    "id": "post-bulk-006",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-002",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-050",
      "product-bulk-043"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "沙色西装真的很适合初夏通勤",
    "body": "这套用低饱和沙色西装配白色内搭和顺色下装，整体看起来很干净，也不会有太强的办公室感，通勤和看展都能穿。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-006.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-006.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "沙色西装",
      "Clean Fit"
    ],
    "likes": 130,
    "createdAt": "2026-05-01T09:30:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-007",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-002",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-050",
      "product-bulk-043"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "橄榄绿风衣比黑白灰更有记忆点",
    "body": "橄榄绿风衣配浅色内搭和同色系裤子，整体是轻熟通勤感，颜色安静但比基础黑白更有画面。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-007.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-007.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "橄榄风衣",
      "轻熟"
    ],
    "likes": 144,
    "createdAt": "2026-05-01T09:24:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-008",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-002",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-036",
      "product-bulk-050"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-036",
        "label": "深咖高领针织",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "看展穿沙色西装，干净但不会太正式",
    "body": "沙色西装和浅色针织组合在一起很稳，适合看展、咖啡店和轻通勤，重点是轮廓干净，颜色不要太跳。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-008.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-008.jpg"
    ],
    "styleTags": [
      "Clean Fit",
      "沙色西装",
      "看展穿搭"
    ],
    "likes": 158,
    "createdAt": "2026-05-01T09:18:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-009",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-002",
    "productId": "product-bulk-036",
    "productIds": [
      "product-bulk-036",
      "product-bulk-050",
      "product-bulk-078"
    ],
    "productTags": [
      {
        "productId": "product-bulk-036",
        "label": "深咖高领针织",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-078",
        "label": "雾蓝托特包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "象牙白针织，松弛感比纯白更柔和",
    "body": "象牙白针织比纯白更温柔，和浅灰裤子放在一起不会割裂，拍出来会有一种很舒服的安静感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-009.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-009.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "象牙针织",
      "松弛感"
    ],
    "likes": 172,
    "createdAt": "2026-05-01T09:12:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-010",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-002",
    "productId": "product-bulk-008",
    "productIds": [
      "product-bulk-008",
      "product-bulk-043",
      "product-bulk-057"
    ],
    "productTags": [
      {
        "productId": "product-bulk-008",
        "label": "灰蓝工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-057",
        "label": "黑色西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑白配也可以很高级，关键是版型",
    "body": "这套把黑色短夹克和白色内搭做了清晰分层，下装用高腰直筒裤拉长比例，适合喜欢极简但不想太沉闷的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-010.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-010.jpg"
    ],
    "styleTags": [
      "Clean Fit",
      "黑白灰",
      "短款夹克"
    ],
    "likes": 186,
    "createdAt": "2026-05-01T09:06:00.000Z",
    "priceLabel": "¥239 起"
  },
  {
    "id": "post-bulk-011",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-003",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-050",
      "product-bulk-043"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "沙色西装真的很适合初夏通勤",
    "body": "这套用低饱和沙色西装配白色内搭和顺色下装，整体看起来很干净，也不会有太强的办公室感，通勤和看展都能穿。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-011.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-011.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "沙色西装",
      "Clean Fit"
    ],
    "likes": 140,
    "createdAt": "2026-05-01T08:30:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-012",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-003",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-057",
      "product-bulk-043"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-057",
        "label": "黑色西裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "橄榄绿风衣比黑白灰更有记忆点",
    "body": "橄榄绿风衣配浅色内搭和同色系裤子，整体是轻熟通勤感，颜色安静但比基础黑白更有画面。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-012.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-012.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "橄榄风衣",
      "轻熟"
    ],
    "likes": 154,
    "createdAt": "2026-05-01T08:24:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-013",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-003",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-029",
      "product-bulk-050"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-029",
        "label": "橄榄绿针织衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "看展穿沙色西装，干净但不会太正式",
    "body": "沙色西装和浅色针织组合在一起很稳，适合看展、咖啡店和轻通勤，重点是轮廓干净，颜色不要太跳。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-013.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-013.jpg"
    ],
    "styleTags": [
      "Clean Fit",
      "沙色西装",
      "看展穿搭"
    ],
    "likes": 168,
    "createdAt": "2026-05-01T08:18:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-014",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-003",
    "productId": "product-bulk-029",
    "productIds": [
      "product-bulk-029",
      "product-bulk-050",
      "product-bulk-078"
    ],
    "productTags": [
      {
        "productId": "product-bulk-029",
        "label": "橄榄绿针织衫",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-078",
        "label": "雾蓝托特包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "象牙白针织，松弛感比纯白更柔和",
    "body": "象牙白针织比纯白更温柔，和浅灰裤子放在一起不会割裂，拍出来会有一种很舒服的安静感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-014.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-014.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "象牙针织",
      "松弛感"
    ],
    "likes": 182,
    "createdAt": "2026-05-01T08:12:00.000Z",
    "priceLabel": "¥219 起"
  },
  {
    "id": "post-bulk-015",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-003",
    "productId": "product-bulk-001",
    "productIds": [
      "product-bulk-001",
      "product-bulk-043",
      "product-bulk-050"
    ],
    "productTags": [
      {
        "productId": "product-bulk-001",
        "label": "黑色短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑白配也可以很高级，关键是版型",
    "body": "这套把黑色短夹克和白色内搭做了清晰分层，下装用高腰直筒裤拉长比例，适合喜欢极简但不想太沉闷的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-015.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-015.jpg"
    ],
    "styleTags": [
      "Clean Fit",
      "黑白灰",
      "短款夹克"
    ],
    "likes": 196,
    "createdAt": "2026-05-01T08:06:00.000Z",
    "priceLabel": "¥129 起"
  },
  {
    "id": "post-bulk-016",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-004",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-057",
      "product-bulk-043"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-057",
        "label": "黑色西裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "沙色西装真的很适合初夏通勤",
    "body": "这套用低饱和沙色西装配白色内搭和顺色下装，整体看起来很干净，也不会有太强的办公室感，通勤和看展都能穿。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-016.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-016.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "沙色西装",
      "Clean Fit"
    ],
    "likes": 150,
    "createdAt": "2026-05-01T07:30:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-017",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-004",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-050",
      "product-bulk-043"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "橄榄绿风衣比黑白灰更有记忆点",
    "body": "橄榄绿风衣配浅色内搭和同色系裤子，整体是轻熟通勤感，颜色安静但比基础黑白更有画面。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-017.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-017.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "橄榄风衣",
      "轻熟"
    ],
    "likes": 164,
    "createdAt": "2026-05-01T07:24:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-018",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-004",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-029",
      "product-bulk-057"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-029",
        "label": "橄榄绿针织衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-057",
        "label": "黑色西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "看展穿沙色西装，干净但不会太正式",
    "body": "沙色西装和浅色针织组合在一起很稳，适合看展、咖啡店和轻通勤，重点是轮廓干净，颜色不要太跳。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-018.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-018.jpg"
    ],
    "styleTags": [
      "Clean Fit",
      "沙色西装",
      "看展穿搭"
    ],
    "likes": 178,
    "createdAt": "2026-05-01T07:18:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-019",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-004",
    "productId": "product-bulk-029",
    "productIds": [
      "product-bulk-029",
      "product-bulk-057",
      "product-bulk-078"
    ],
    "productTags": [
      {
        "productId": "product-bulk-029",
        "label": "橄榄绿针织衫",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-057",
        "label": "黑色西裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-078",
        "label": "雾蓝托特包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "象牙白针织，松弛感比纯白更柔和",
    "body": "象牙白针织比纯白更温柔，和浅灰裤子放在一起不会割裂，拍出来会有一种很舒服的安静感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-019.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-019.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "象牙针织",
      "松弛感"
    ],
    "likes": 192,
    "createdAt": "2026-05-01T07:12:00.000Z",
    "priceLabel": "¥219 起"
  },
  {
    "id": "post-bulk-020",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-004",
    "productId": "product-bulk-015",
    "productIds": [
      "product-bulk-015",
      "product-bulk-043",
      "product-bulk-050"
    ],
    "productTags": [
      {
        "productId": "product-bulk-015",
        "label": "浅卡其短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑白配也可以很高级，关键是版型",
    "body": "这套把黑色短夹克和白色内搭做了清晰分层，下装用高腰直筒裤拉长比例，适合喜欢极简但不想太沉闷的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-020.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-020.jpg"
    ],
    "styleTags": [
      "Clean Fit",
      "黑白灰",
      "短款夹克"
    ],
    "likes": 206,
    "createdAt": "2026-05-01T07:06:00.000Z",
    "priceLabel": "¥168 起"
  },
  {
    "id": "post-bulk-021",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-005",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-050",
      "product-bulk-043"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "沙色西装真的很适合初夏通勤",
    "body": "这套用低饱和沙色西装配白色内搭和顺色下装，整体看起来很干净，也不会有太强的办公室感，通勤和看展都能穿。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-021.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-021.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "沙色西装",
      "Clean Fit"
    ],
    "likes": 160,
    "createdAt": "2026-05-01T06:30:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-022",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-005",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-050",
      "product-bulk-043"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "橄榄绿风衣比黑白灰更有记忆点",
    "body": "橄榄绿风衣配浅色内搭和同色系裤子，整体是轻熟通勤感，颜色安静但比基础黑白更有画面。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-022.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-022.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "橄榄风衣",
      "轻熟"
    ],
    "likes": 174,
    "createdAt": "2026-05-01T06:24:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-023",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-005",
    "productId": "product-bulk-022",
    "productIds": [
      "product-bulk-022",
      "product-bulk-036",
      "product-bulk-050"
    ],
    "productTags": [
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-036",
        "label": "深咖高领针织",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "看展穿沙色西装，干净但不会太正式",
    "body": "沙色西装和浅色针织组合在一起很稳，适合看展、咖啡店和轻通勤，重点是轮廓干净，颜色不要太跳。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-023.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-023.jpg"
    ],
    "styleTags": [
      "Clean Fit",
      "沙色西装",
      "看展穿搭"
    ],
    "likes": 188,
    "createdAt": "2026-05-01T06:18:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-024",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-005",
    "productId": "product-bulk-036",
    "productIds": [
      "product-bulk-036",
      "product-bulk-050",
      "product-bulk-078"
    ],
    "productTags": [
      {
        "productId": "product-bulk-036",
        "label": "深咖高领针织",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-050",
        "label": "象牙白阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-078",
        "label": "雾蓝托特包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "象牙白针织，松弛感比纯白更柔和",
    "body": "象牙白针织比纯白更温柔，和浅灰裤子放在一起不会割裂，拍出来会有一种很舒服的安静感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-024.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-024.jpg"
    ],
    "styleTags": [
      "通勤极简",
      "象牙针织",
      "松弛感"
    ],
    "likes": 202,
    "createdAt": "2026-05-01T06:12:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-025",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-005",
    "productId": "product-bulk-008",
    "productIds": [
      "product-bulk-008",
      "product-bulk-043",
      "product-bulk-057"
    ],
    "productTags": [
      {
        "productId": "product-bulk-008",
        "label": "灰蓝工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-043",
        "label": "深咖长袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-057",
        "label": "黑色西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑白配也可以很高级，关键是版型",
    "body": "这套把黑色短夹克和白色内搭做了清晰分层，下装用高腰直筒裤拉长比例，适合喜欢极简但不想太沉闷的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-025.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-025.jpg"
    ],
    "styleTags": [
      "Clean Fit",
      "黑白灰",
      "短款夹克"
    ],
    "likes": 216,
    "createdAt": "2026-05-01T06:06:00.000Z",
    "priceLabel": "¥239 起"
  },
  {
    "id": "post-bulk-026",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-006",
    "productId": "product-bulk-009",
    "productIds": [
      "product-bulk-009",
      "product-bulk-044",
      "product-bulk-058"
    ],
    "productTags": [
      {
        "productId": "product-bulk-009",
        "label": "黑色飞行夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-058",
        "label": "象牙白直筒裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑色短夹克 + 高腰裤，比例直接拉满",
    "body": "短款黑夹克把上半身压得很利落，白色内搭负责留白，下装选高腰长裤，整套很有高街气质。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-026.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-026.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "短款夹克",
      "黑白灰"
    ],
    "likes": 170,
    "createdAt": "2026-05-01T05:30:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-027",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-006",
    "productId": "product-bulk-002",
    "productIds": [
      "product-bulk-002",
      "product-bulk-058",
      "product-bulk-079"
    ],
    "productTags": [
      {
        "productId": "product-bulk-002",
        "label": "象牙白棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-058",
        "label": "象牙白直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-079",
        "label": "浅灰单肩包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑色飞行夹克配灰西裤，暗黑但不沉闷",
    "body": "黑色飞行夹克本身就很有街头感，换成灰色西裤后会柔一点，适合想穿暗黑但不想太重的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-027.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-027.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "飞行夹克",
      "灰西裤"
    ],
    "likes": 184,
    "createdAt": "2026-05-01T05:24:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-028",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-006",
    "productId": "product-bulk-016",
    "productIds": [
      "product-bulk-016",
      "product-bulk-030",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-016",
        "label": "灰蓝短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-030",
        "label": "雾蓝罗纹上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "夜里穿黑色最稳，重点是面料和层次",
    "body": "同样是黑色，尼龙外套、针织内搭和直筒裤叠在一起会更有层次，街拍里也不会只剩一块黑。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-028.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-028.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "飞行夹克",
      "层次感"
    ],
    "likes": 198,
    "createdAt": "2026-05-01T05:18:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-029",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-006",
    "productId": "product-bulk-009",
    "productIds": [
      "product-bulk-009",
      "product-bulk-044",
      "product-bulk-058"
    ],
    "productTags": [
      {
        "productId": "product-bulk-009",
        "label": "黑色飞行夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-058",
        "label": "象牙白直筒裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "暗黑风也能很利落，不一定要很夸张",
    "body": "这套把廓形控制得比较紧，整体是利落的高街暗黑路线，适合夜景街头和偏酷一点的日常。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-029.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-029.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "利落廓形",
      "夜景街拍"
    ],
    "likes": 212,
    "createdAt": "2026-05-01T05:12:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-030",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-006",
    "productId": "product-bulk-002",
    "productIds": [
      "product-bulk-002",
      "product-bulk-044",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-002",
        "label": "象牙白棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "银灰配黑色，暗黑里加一点冷感",
    "body": "银灰色内搭让黑外套看起来没那么闷，配黑色长裤还是很稳，但整个人会更有冷感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-030.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-030.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "黑灰配色",
      "冷感"
    ],
    "likes": 226,
    "createdAt": "2026-05-01T05:06:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-031",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-007",
    "productId": "product-bulk-002",
    "productIds": [
      "product-bulk-002",
      "product-bulk-044",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-002",
        "label": "象牙白棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑色短夹克 + 高腰裤，比例直接拉满",
    "body": "短款黑夹克把上半身压得很利落，白色内搭负责留白，下装选高腰长裤，整套很有高街气质。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-031.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-031.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "短款夹克",
      "黑白灰"
    ],
    "likes": 180,
    "createdAt": "2026-05-01T04:30:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-032",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-007",
    "productId": "product-bulk-016",
    "productIds": [
      "product-bulk-016",
      "product-bulk-051",
      "product-bulk-079"
    ],
    "productTags": [
      {
        "productId": "product-bulk-016",
        "label": "灰蓝短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-079",
        "label": "浅灰单肩包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑色飞行夹克配灰西裤，暗黑但不沉闷",
    "body": "黑色飞行夹克本身就很有街头感，换成灰色西裤后会柔一点，适合想穿暗黑但不想太重的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-032.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-032.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "飞行夹克",
      "灰西裤"
    ],
    "likes": 194,
    "createdAt": "2026-05-01T04:24:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-033",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-007",
    "productId": "product-bulk-009",
    "productIds": [
      "product-bulk-009",
      "product-bulk-030",
      "product-bulk-058"
    ],
    "productTags": [
      {
        "productId": "product-bulk-009",
        "label": "黑色飞行夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-030",
        "label": "雾蓝罗纹上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-058",
        "label": "象牙白直筒裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "夜里穿黑色最稳，重点是面料和层次",
    "body": "同样是黑色，尼龙外套、针织内搭和直筒裤叠在一起会更有层次，街拍里也不会只剩一块黑。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-033.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-033.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "飞行夹克",
      "层次感"
    ],
    "likes": 208,
    "createdAt": "2026-05-01T04:18:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-034",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-007",
    "productId": "product-bulk-002",
    "productIds": [
      "product-bulk-002",
      "product-bulk-044",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-002",
        "label": "象牙白棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "暗黑风也能很利落，不一定要很夸张",
    "body": "这套把廓形控制得比较紧，整体是利落的高街暗黑路线，适合夜景街头和偏酷一点的日常。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-034.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-034.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "利落廓形",
      "夜景街拍"
    ],
    "likes": 222,
    "createdAt": "2026-05-01T04:12:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-035",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-007",
    "productId": "product-bulk-016",
    "productIds": [
      "product-bulk-016",
      "product-bulk-044",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-016",
        "label": "灰蓝短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "银灰配黑色，暗黑里加一点冷感",
    "body": "银灰色内搭让黑外套看起来没那么闷，配黑色长裤还是很稳，但整个人会更有冷感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-035.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-035.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "黑灰配色",
      "冷感"
    ],
    "likes": 236,
    "createdAt": "2026-05-01T04:06:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-036",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-008",
    "productId": "product-bulk-016",
    "productIds": [
      "product-bulk-016",
      "product-bulk-044",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-016",
        "label": "灰蓝短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑色短夹克 + 高腰裤，比例直接拉满",
    "body": "短款黑夹克把上半身压得很利落，白色内搭负责留白，下装选高腰长裤，整套很有高街气质。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-036.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-036.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "短款夹克",
      "黑白灰"
    ],
    "likes": 190,
    "createdAt": "2026-05-01T03:30:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-037",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-008",
    "productId": "product-bulk-009",
    "productIds": [
      "product-bulk-009",
      "product-bulk-051",
      "product-bulk-079"
    ],
    "productTags": [
      {
        "productId": "product-bulk-009",
        "label": "黑色飞行夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-079",
        "label": "浅灰单肩包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑色飞行夹克配灰西裤，暗黑但不沉闷",
    "body": "黑色飞行夹克本身就很有街头感，换成灰色西裤后会柔一点，适合想穿暗黑但不想太重的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-037.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-037.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "飞行夹克",
      "灰西裤"
    ],
    "likes": 204,
    "createdAt": "2026-05-01T03:24:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-038",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-008",
    "productId": "product-bulk-002",
    "productIds": [
      "product-bulk-002",
      "product-bulk-037",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-002",
        "label": "象牙白棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-037",
        "label": "橄榄绿宽松毛衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "夜里穿黑色最稳，重点是面料和层次",
    "body": "同样是黑色，尼龙外套、针织内搭和直筒裤叠在一起会更有层次，街拍里也不会只剩一块黑。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-038.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-038.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "飞行夹克",
      "层次感"
    ],
    "likes": 218,
    "createdAt": "2026-05-01T03:18:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-039",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-008",
    "productId": "product-bulk-016",
    "productIds": [
      "product-bulk-016",
      "product-bulk-044",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-016",
        "label": "灰蓝短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "暗黑风也能很利落，不一定要很夸张",
    "body": "这套把廓形控制得比较紧，整体是利落的高街暗黑路线，适合夜景街头和偏酷一点的日常。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-039.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-039.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "利落廓形",
      "夜景街拍"
    ],
    "likes": 232,
    "createdAt": "2026-05-01T03:12:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-040",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-008",
    "productId": "product-bulk-009",
    "productIds": [
      "product-bulk-009",
      "product-bulk-044",
      "product-bulk-058"
    ],
    "productTags": [
      {
        "productId": "product-bulk-009",
        "label": "黑色飞行夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-058",
        "label": "象牙白直筒裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "银灰配黑色，暗黑里加一点冷感",
    "body": "银灰色内搭让黑外套看起来没那么闷，配黑色长裤还是很稳，但整个人会更有冷感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-040.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-040.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "黑灰配色",
      "冷感"
    ],
    "likes": 246,
    "createdAt": "2026-05-01T03:06:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-041",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-009",
    "productId": "product-bulk-009",
    "productIds": [
      "product-bulk-009",
      "product-bulk-044",
      "product-bulk-058"
    ],
    "productTags": [
      {
        "productId": "product-bulk-009",
        "label": "黑色飞行夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-058",
        "label": "象牙白直筒裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑色短夹克 + 高腰裤，比例直接拉满",
    "body": "短款黑夹克把上半身压得很利落，白色内搭负责留白，下装选高腰长裤，整套很有高街气质。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-041.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-041.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "短款夹克",
      "黑白灰"
    ],
    "likes": 200,
    "createdAt": "2026-05-01T02:30:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-042",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-009",
    "productId": "product-bulk-002",
    "productIds": [
      "product-bulk-002",
      "product-bulk-058",
      "product-bulk-079"
    ],
    "productTags": [
      {
        "productId": "product-bulk-002",
        "label": "象牙白棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-058",
        "label": "象牙白直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-079",
        "label": "浅灰单肩包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑色飞行夹克配灰西裤，暗黑但不沉闷",
    "body": "黑色飞行夹克本身就很有街头感，换成灰色西裤后会柔一点，适合想穿暗黑但不想太重的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-042.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-042.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "飞行夹克",
      "灰西裤"
    ],
    "likes": 214,
    "createdAt": "2026-05-01T02:24:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-043",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-009",
    "productId": "product-bulk-016",
    "productIds": [
      "product-bulk-016",
      "product-bulk-030",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-016",
        "label": "灰蓝短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-030",
        "label": "雾蓝罗纹上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "夜里穿黑色最稳，重点是面料和层次",
    "body": "同样是黑色，尼龙外套、针织内搭和直筒裤叠在一起会更有层次，街拍里也不会只剩一块黑。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-043.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-043.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "飞行夹克",
      "层次感"
    ],
    "likes": 228,
    "createdAt": "2026-05-01T02:18:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-044",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-009",
    "productId": "product-bulk-009",
    "productIds": [
      "product-bulk-009",
      "product-bulk-044",
      "product-bulk-058"
    ],
    "productTags": [
      {
        "productId": "product-bulk-009",
        "label": "黑色飞行夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-058",
        "label": "象牙白直筒裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "暗黑风也能很利落，不一定要很夸张",
    "body": "这套把廓形控制得比较紧，整体是利落的高街暗黑路线，适合夜景街头和偏酷一点的日常。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-044.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-044.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "利落廓形",
      "夜景街拍"
    ],
    "likes": 242,
    "createdAt": "2026-05-01T02:12:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-045",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-009",
    "productId": "product-bulk-002",
    "productIds": [
      "product-bulk-002",
      "product-bulk-044",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-002",
        "label": "象牙白棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "银灰配黑色，暗黑里加一点冷感",
    "body": "银灰色内搭让黑外套看起来没那么闷，配黑色长裤还是很稳，但整个人会更有冷感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-045.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-045.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "黑灰配色",
      "冷感"
    ],
    "likes": 256,
    "createdAt": "2026-05-01T02:06:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-046",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-010",
    "productId": "product-bulk-002",
    "productIds": [
      "product-bulk-002",
      "product-bulk-044",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-002",
        "label": "象牙白棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑色短夹克 + 高腰裤，比例直接拉满",
    "body": "短款黑夹克把上半身压得很利落，白色内搭负责留白，下装选高腰长裤，整套很有高街气质。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-046.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-046.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "短款夹克",
      "黑白灰"
    ],
    "likes": 210,
    "createdAt": "2026-05-01T01:30:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-047",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-010",
    "productId": "product-bulk-016",
    "productIds": [
      "product-bulk-016",
      "product-bulk-051",
      "product-bulk-079"
    ],
    "productTags": [
      {
        "productId": "product-bulk-016",
        "label": "灰蓝短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-079",
        "label": "浅灰单肩包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑色飞行夹克配灰西裤，暗黑但不沉闷",
    "body": "黑色飞行夹克本身就很有街头感，换成灰色西裤后会柔一点，适合想穿暗黑但不想太重的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-047.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-047.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "飞行夹克",
      "灰西裤"
    ],
    "likes": 224,
    "createdAt": "2026-05-01T01:24:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-048",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-010",
    "productId": "product-bulk-009",
    "productIds": [
      "product-bulk-009",
      "product-bulk-030",
      "product-bulk-058"
    ],
    "productTags": [
      {
        "productId": "product-bulk-009",
        "label": "黑色飞行夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-030",
        "label": "雾蓝罗纹上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-058",
        "label": "象牙白直筒裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "夜里穿黑色最稳，重点是面料和层次",
    "body": "同样是黑色，尼龙外套、针织内搭和直筒裤叠在一起会更有层次，街拍里也不会只剩一块黑。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-048.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-048.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "飞行夹克",
      "层次感"
    ],
    "likes": 238,
    "createdAt": "2026-05-01T01:18:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-049",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-010",
    "productId": "product-bulk-002",
    "productIds": [
      "product-bulk-002",
      "product-bulk-044",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-002",
        "label": "象牙白棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "暗黑风也能很利落，不一定要很夸张",
    "body": "这套把廓形控制得比较紧，整体是利落的高街暗黑路线，适合夜景街头和偏酷一点的日常。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-049.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-049.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "利落廓形",
      "夜景街拍"
    ],
    "likes": 252,
    "createdAt": "2026-05-01T01:12:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-050",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-010",
    "productId": "product-bulk-016",
    "productIds": [
      "product-bulk-016",
      "product-bulk-044",
      "product-bulk-051"
    ],
    "productTags": [
      {
        "productId": "product-bulk-016",
        "label": "灰蓝短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-044",
        "label": "橄榄绿泡泡袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-051",
        "label": "浅卡其工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "银灰配黑色，暗黑里加一点冷感",
    "body": "银灰色内搭让黑外套看起来没那么闷，配黑色长裤还是很稳，但整个人会更有冷感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-050.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-050.jpg"
    ],
    "styleTags": [
      "高街暗黑",
      "黑灰配色",
      "冷感"
    ],
    "likes": 266,
    "createdAt": "2026-05-01T01:06:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-051",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-011",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "水洗牛仔外套，周末咖啡店随手拍都好看",
    "body": "浅水洗牛仔外套配白T和深色裤子很稳定，复古感不会太用力，咖啡店门口一拍就很出片。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-051.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-051.jpg"
    ],
    "styleTags": [
      "美式复古",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "likes": 220,
    "createdAt": "2026-05-01T00:30:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-052",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-011",
    "productId": "product-bulk-010",
    "productIds": [
      "product-bulk-010",
      "product-bulk-045",
      "product-bulk-059"
    ],
    "productTags": [
      {
        "productId": "product-bulk-010",
        "label": "Seoul 象牙白短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-059",
        "label": "Seoul 浅卡其牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "白T + 牛仔夹克，周末市集最省心",
    "body": "这套几乎不用想搭配，牛仔外套和白T就是最省心的组合，配棕色皮带会更有复古味道。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-052.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-052.jpg"
    ],
    "styleTags": [
      "美式复古",
      "牛仔",
      "周末市集"
    ],
    "likes": 234,
    "createdAt": "2026-05-01T00:24:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-053",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-011",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "做旧牛仔和浅色上衣放在一起很耐看",
    "body": "复古牛仔的好处是很耐拍，搭浅色上衣和黑色裤子就已经很完整，不需要额外配太多元素。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-053.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-053.jpg"
    ],
    "styleTags": [
      "美式复古",
      "做旧牛仔",
      "层次穿搭"
    ],
    "likes": 248,
    "createdAt": "2026-05-01T00:18:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-054",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-011",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "复古风可以很日常，关键是颜色别太多",
    "body": "这个 look 用牛仔蓝和深色裤子做主色，整体很日常，适合拍照也适合平时出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-054.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-054.jpg"
    ],
    "styleTags": [
      "美式复古",
      "牛仔蓝",
      "日常穿搭"
    ],
    "likes": 262,
    "createdAt": "2026-05-01T00:12:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-055",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-011",
    "productId": "product-bulk-010",
    "productIds": [
      "product-bulk-010",
      "product-bulk-045",
      "product-bulk-059"
    ],
    "productTags": [
      {
        "productId": "product-bulk-010",
        "label": "Seoul 象牙白短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-059",
        "label": "Seoul 浅卡其牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "咖啡色系配牛仔，复古味一下就出来了",
    "body": "复古棕和牛仔蓝放在一起很有味道，简单一套就能拍出有生活感的周末OOTD。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-055.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-055.jpg"
    ],
    "styleTags": [
      "美式复古",
      "咖啡色系",
      "周末OOTD"
    ],
    "likes": 276,
    "createdAt": "2026-05-01T00:06:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-056",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-012",
    "productId": "product-bulk-010",
    "productIds": [
      "product-bulk-010",
      "product-bulk-045",
      "product-bulk-059"
    ],
    "productTags": [
      {
        "productId": "product-bulk-010",
        "label": "Seoul 象牙白短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-059",
        "label": "Seoul 浅卡其牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "水洗牛仔外套，周末咖啡店随手拍都好看",
    "body": "浅水洗牛仔外套配白T和深色裤子很稳定，复古感不会太用力，咖啡店门口一拍就很出片。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-056.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-056.jpg"
    ],
    "styleTags": [
      "美式复古",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "likes": 230,
    "createdAt": "2026-04-30T23:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-057",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-012",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "白T + 牛仔夹克，周末市集最省心",
    "body": "这套几乎不用想搭配，牛仔外套和白T就是最省心的组合，配棕色皮带会更有复古味道。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-057.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-057.jpg"
    ],
    "styleTags": [
      "美式复古",
      "牛仔",
      "周末市集"
    ],
    "likes": 244,
    "createdAt": "2026-04-30T23:24:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-058",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-012",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "做旧牛仔和浅色上衣放在一起很耐看",
    "body": "复古牛仔的好处是很耐拍，搭浅色上衣和黑色裤子就已经很完整，不需要额外配太多元素。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-058.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-058.jpg"
    ],
    "styleTags": [
      "美式复古",
      "做旧牛仔",
      "层次穿搭"
    ],
    "likes": 258,
    "createdAt": "2026-04-30T23:18:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-059",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-012",
    "productId": "product-bulk-010",
    "productIds": [
      "product-bulk-010",
      "product-bulk-045",
      "product-bulk-059"
    ],
    "productTags": [
      {
        "productId": "product-bulk-010",
        "label": "Seoul 象牙白短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-059",
        "label": "Seoul 浅卡其牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "复古风可以很日常，关键是颜色别太多",
    "body": "这个 look 用牛仔蓝和深色裤子做主色，整体很日常，适合拍照也适合平时出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-059.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-059.jpg"
    ],
    "styleTags": [
      "美式复古",
      "牛仔蓝",
      "日常穿搭"
    ],
    "likes": 272,
    "createdAt": "2026-04-30T23:12:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-060",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-012",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "咖啡色系配牛仔，复古味一下就出来了",
    "body": "复古棕和牛仔蓝放在一起很有味道，简单一套就能拍出有生活感的周末OOTD。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-060.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-060.jpg"
    ],
    "styleTags": [
      "美式复古",
      "咖啡色系",
      "周末OOTD"
    ],
    "likes": 286,
    "createdAt": "2026-04-30T23:06:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-061",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-013",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "水洗牛仔外套，周末咖啡店随手拍都好看",
    "body": "浅水洗牛仔外套配白T和深色裤子很稳定，复古感不会太用力，咖啡店门口一拍就很出片。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-061.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-061.jpg"
    ],
    "styleTags": [
      "美式复古",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "likes": 240,
    "createdAt": "2026-04-30T22:30:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-062",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-013",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "白T + 牛仔夹克，周末市集最省心",
    "body": "这套几乎不用想搭配，牛仔外套和白T就是最省心的组合，配棕色皮带会更有复古味道。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-062.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-062.jpg"
    ],
    "styleTags": [
      "美式复古",
      "牛仔",
      "周末市集"
    ],
    "likes": 254,
    "createdAt": "2026-04-30T22:24:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-063",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-013",
    "productId": "product-bulk-010",
    "productIds": [
      "product-bulk-010",
      "product-bulk-045",
      "product-bulk-059"
    ],
    "productTags": [
      {
        "productId": "product-bulk-010",
        "label": "Seoul 象牙白短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-059",
        "label": "Seoul 浅卡其牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "做旧牛仔和浅色上衣放在一起很耐看",
    "body": "复古牛仔的好处是很耐拍，搭浅色上衣和黑色裤子就已经很完整，不需要额外配太多元素。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-063.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-063.jpg"
    ],
    "styleTags": [
      "美式复古",
      "做旧牛仔",
      "层次穿搭"
    ],
    "likes": 268,
    "createdAt": "2026-04-30T22:18:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-064",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-013",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "复古风可以很日常，关键是颜色别太多",
    "body": "这个 look 用牛仔蓝和深色裤子做主色，整体很日常，适合拍照也适合平时出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-064.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-064.jpg"
    ],
    "styleTags": [
      "美式复古",
      "牛仔蓝",
      "日常穿搭"
    ],
    "likes": 282,
    "createdAt": "2026-04-30T22:12:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-065",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-013",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "咖啡色系配牛仔，复古味一下就出来了",
    "body": "复古棕和牛仔蓝放在一起很有味道，简单一套就能拍出有生活感的周末OOTD。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-065.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-065.jpg"
    ],
    "styleTags": [
      "美式复古",
      "咖啡色系",
      "周末OOTD"
    ],
    "likes": 296,
    "createdAt": "2026-04-30T22:06:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-066",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-014",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "水洗牛仔外套，周末咖啡店随手拍都好看",
    "body": "浅水洗牛仔外套配白T和深色裤子很稳定，复古感不会太用力，咖啡店门口一拍就很出片。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-066.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-066.jpg"
    ],
    "styleTags": [
      "美式复古",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "likes": 250,
    "createdAt": "2026-04-30T21:30:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-067",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-014",
    "productId": "product-bulk-010",
    "productIds": [
      "product-bulk-010",
      "product-bulk-045",
      "product-bulk-059"
    ],
    "productTags": [
      {
        "productId": "product-bulk-010",
        "label": "Seoul 象牙白短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-059",
        "label": "Seoul 浅卡其牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "白T + 牛仔夹克，周末市集最省心",
    "body": "这套几乎不用想搭配，牛仔外套和白T就是最省心的组合，配棕色皮带会更有复古味道。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-067.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-067.jpg"
    ],
    "styleTags": [
      "美式复古",
      "牛仔",
      "周末市集"
    ],
    "likes": 264,
    "createdAt": "2026-04-30T21:24:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-068",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-014",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "做旧牛仔和浅色上衣放在一起很耐看",
    "body": "复古牛仔的好处是很耐拍，搭浅色上衣和黑色裤子就已经很完整，不需要额外配太多元素。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-068.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-068.jpg"
    ],
    "styleTags": [
      "美式复古",
      "做旧牛仔",
      "层次穿搭"
    ],
    "likes": 278,
    "createdAt": "2026-04-30T21:18:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-069",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-014",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "复古风可以很日常，关键是颜色别太多",
    "body": "这个 look 用牛仔蓝和深色裤子做主色，整体很日常，适合拍照也适合平时出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-069.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-069.jpg"
    ],
    "styleTags": [
      "美式复古",
      "牛仔蓝",
      "日常穿搭"
    ],
    "likes": 292,
    "createdAt": "2026-04-30T21:12:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-070",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-014",
    "productId": "product-bulk-010",
    "productIds": [
      "product-bulk-010",
      "product-bulk-045",
      "product-bulk-059"
    ],
    "productTags": [
      {
        "productId": "product-bulk-010",
        "label": "Seoul 象牙白短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-059",
        "label": "Seoul 浅卡其牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "咖啡色系配牛仔，复古味一下就出来了",
    "body": "复古棕和牛仔蓝放在一起很有味道，简单一套就能拍出有生活感的周末OOTD。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-070.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-070.jpg"
    ],
    "styleTags": [
      "美式复古",
      "咖啡色系",
      "周末OOTD"
    ],
    "likes": 306,
    "createdAt": "2026-04-30T21:06:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-071",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-015",
    "productId": "product-bulk-010",
    "productIds": [
      "product-bulk-010",
      "product-bulk-045",
      "product-bulk-059"
    ],
    "productTags": [
      {
        "productId": "product-bulk-010",
        "label": "Seoul 象牙白短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-059",
        "label": "Seoul 浅卡其牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "水洗牛仔外套，周末咖啡店随手拍都好看",
    "body": "浅水洗牛仔外套配白T和深色裤子很稳定，复古感不会太用力，咖啡店门口一拍就很出片。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-071.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-071.jpg"
    ],
    "styleTags": [
      "美式复古",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "likes": 260,
    "createdAt": "2026-04-30T20:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-072",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-015",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "白T + 牛仔夹克，周末市集最省心",
    "body": "这套几乎不用想搭配，牛仔外套和白T就是最省心的组合，配棕色皮带会更有复古味道。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-072.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-072.jpg"
    ],
    "styleTags": [
      "美式复古",
      "牛仔",
      "周末市集"
    ],
    "likes": 274,
    "createdAt": "2026-04-30T20:24:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-073",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-015",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "做旧牛仔和浅色上衣放在一起很耐看",
    "body": "复古牛仔的好处是很耐拍，搭浅色上衣和黑色裤子就已经很完整，不需要额外配太多元素。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-073.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-073.jpg"
    ],
    "styleTags": [
      "美式复古",
      "做旧牛仔",
      "层次穿搭"
    ],
    "likes": 288,
    "createdAt": "2026-04-30T20:18:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-074",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-015",
    "productId": "product-bulk-010",
    "productIds": [
      "product-bulk-010",
      "product-bulk-045",
      "product-bulk-059"
    ],
    "productTags": [
      {
        "productId": "product-bulk-010",
        "label": "Seoul 象牙白短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-059",
        "label": "Seoul 浅卡其牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "复古风可以很日常，关键是颜色别太多",
    "body": "这个 look 用牛仔蓝和深色裤子做主色，整体很日常，适合拍照也适合平时出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-074.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-074.jpg"
    ],
    "styleTags": [
      "美式复古",
      "牛仔蓝",
      "日常穿搭"
    ],
    "likes": 302,
    "createdAt": "2026-04-30T20:12:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-075",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-015",
    "productId": "product-bulk-003",
    "productIds": [
      "product-bulk-003",
      "product-bulk-045",
      "product-bulk-052"
    ],
    "productTags": [
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-045",
        "label": "Seoul 雾蓝衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-052",
        "label": "Seoul 灰蓝西裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "咖啡色系配牛仔，复古味一下就出来了",
    "body": "复古棕和牛仔蓝放在一起很有味道，简单一套就能拍出有生活感的周末OOTD。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-075.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-075.jpg"
    ],
    "styleTags": [
      "美式复古",
      "咖啡色系",
      "周末OOTD"
    ],
    "likes": 316,
    "createdAt": "2026-04-30T20:06:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-076",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-016",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-060",
      "product-bulk-078"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-060",
        "label": "灰蓝阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-078",
        "label": "雾蓝托特包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "象牙白针织，韩系松弛感不用太复杂",
    "body": "宽松针织和浅色长裤放在一起很柔和，整套没有很强的攻击性，拍出来就会有韩系松弛感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-076.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-076.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "象牙针织",
      "松弛感"
    ],
    "likes": 270,
    "createdAt": "2026-04-30T19:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-077",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-016",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-079"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-079",
        "label": "浅灰单肩包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "浅色系穿搭想温柔，就别选太冷的白",
    "body": "象牙白比纯白更柔一点，和浅灰、米色搭起来不会割裂，很适合轻松的日常出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-077.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-077.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "象牙针织",
      "同色系"
    ],
    "likes": 284,
    "createdAt": "2026-04-30T19:24:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-078",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-016",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-080"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-080",
        "label": "Seoul 深咖斜挎包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "宽松针织和长裤真的很适合周末",
    "body": "这类韩系宽松穿搭重点就是舒服，版型要松，颜色要软，整体看着就会特别安静。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-078.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-078.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "宽松针织",
      "周末穿搭"
    ],
    "likes": 298,
    "createdAt": "2026-04-30T19:18:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-079",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-016",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-060",
      "product-bulk-001"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-060",
        "label": "灰蓝阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-001",
        "label": "黑色短夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "同色系叠穿比想象中更显高级",
    "body": "米白和浅灰叠在一起没有压力，拍出来很自然，适合日常也适合轻松见朋友。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-079.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-079.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "同色系",
      "轻松感"
    ],
    "likes": 312,
    "createdAt": "2026-04-30T19:12:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-080",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-016",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-002"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-002",
        "label": "象牙白棒球夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "韩系松弛感的关键是轮廓不要太硬",
    "body": "柔软针织和宽松下装放在一起会更有韩系氛围，镜头里看起来也更舒服。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-080.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-080.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "柔和配色",
      "松弛感"
    ],
    "likes": 326,
    "createdAt": "2026-04-30T19:06:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-081",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-017",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-003"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-003",
        "label": "Seoul 浅卡其工装外套",
        "x": 67,
        "y": 58
      }
    ],
    "title": "象牙白针织，韩系松弛感不用太复杂",
    "body": "宽松针织和浅色长裤放在一起很柔和，整套没有很强的攻击性，拍出来就会有韩系松弛感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-081.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-081.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "象牙针织",
      "松弛感"
    ],
    "likes": 280,
    "createdAt": "2026-04-30T18:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-082",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-017",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-004"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-004",
        "label": "灰蓝飞行夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "浅色系穿搭想温柔，就别选太冷的白",
    "body": "象牙白比纯白更柔一点，和浅灰、米色搭起来不会割裂，很适合轻松的日常出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-082.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-082.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "象牙针织",
      "同色系"
    ],
    "likes": 294,
    "createdAt": "2026-04-30T18:24:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-083",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-017",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-060",
      "product-bulk-005"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-060",
        "label": "灰蓝阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-005",
        "label": "黑色短外套",
        "x": 67,
        "y": 58
      }
    ],
    "title": "宽松针织和长裤真的很适合周末",
    "body": "这类韩系宽松穿搭重点就是舒服，版型要松，颜色要软，整体看着就会特别安静。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-083.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-083.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "宽松针织",
      "周末穿搭"
    ],
    "likes": 308,
    "createdAt": "2026-04-30T18:18:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-084",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-017",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-006"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "同色系叠穿比想象中更显高级",
    "body": "米白和浅灰叠在一起没有压力，拍出来很自然，适合日常也适合轻松见朋友。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-084.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-084.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "同色系",
      "轻松感"
    ],
    "likes": 322,
    "createdAt": "2026-04-30T18:12:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-085",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-017",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-007"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-007",
        "label": "浅卡其棒球夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "韩系松弛感的关键是轮廓不要太硬",
    "body": "柔软针织和宽松下装放在一起会更有韩系氛围，镜头里看起来也更舒服。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-085.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-085.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "柔和配色",
      "松弛感"
    ],
    "likes": 336,
    "createdAt": "2026-04-30T18:06:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-086",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-018",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-008"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-008",
        "label": "灰蓝工装外套",
        "x": 67,
        "y": 58
      }
    ],
    "title": "象牙白针织，韩系松弛感不用太复杂",
    "body": "宽松针织和浅色长裤放在一起很柔和，整套没有很强的攻击性，拍出来就会有韩系松弛感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-086.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-086.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "象牙针织",
      "松弛感"
    ],
    "likes": 290,
    "createdAt": "2026-04-30T17:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-087",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-018",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-060",
      "product-bulk-009"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-060",
        "label": "灰蓝阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-009",
        "label": "黑色飞行夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "浅色系穿搭想温柔，就别选太冷的白",
    "body": "象牙白比纯白更柔一点，和浅灰、米色搭起来不会割裂，很适合轻松的日常出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-087.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-087.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "象牙针织",
      "同色系"
    ],
    "likes": 304,
    "createdAt": "2026-04-30T17:24:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-088",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-018",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-010"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-010",
        "label": "Seoul 象牙白短外套",
        "x": 67,
        "y": 58
      }
    ],
    "title": "宽松针织和长裤真的很适合周末",
    "body": "这类韩系宽松穿搭重点就是舒服，版型要松，颜色要软，整体看着就会特别安静。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-088.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-088.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "宽松针织",
      "周末穿搭"
    ],
    "likes": 318,
    "createdAt": "2026-04-30T17:18:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-089",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-018",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-011"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-011",
        "label": "浅卡其短夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "同色系叠穿比想象中更显高级",
    "body": "米白和浅灰叠在一起没有压力，拍出来很自然，适合日常也适合轻松见朋友。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-089.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-089.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "同色系",
      "轻松感"
    ],
    "likes": 332,
    "createdAt": "2026-04-30T17:12:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-090",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-018",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-060",
      "product-bulk-012"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-060",
        "label": "灰蓝阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-012",
        "label": "灰蓝棒球夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "韩系松弛感的关键是轮廓不要太硬",
    "body": "柔软针织和宽松下装放在一起会更有韩系氛围，镜头里看起来也更舒服。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-090.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-090.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "柔和配色",
      "松弛感"
    ],
    "likes": 346,
    "createdAt": "2026-04-30T17:06:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-091",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-019",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-060",
      "product-bulk-013"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-060",
        "label": "灰蓝阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-013",
        "label": "黑色工装外套",
        "x": 67,
        "y": 58
      }
    ],
    "title": "象牙白针织，韩系松弛感不用太复杂",
    "body": "宽松针织和浅色长裤放在一起很柔和，整套没有很强的攻击性，拍出来就会有韩系松弛感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-091.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-091.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "象牙针织",
      "松弛感"
    ],
    "likes": 300,
    "createdAt": "2026-04-30T16:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-092",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-019",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-014"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-014",
        "label": "象牙白飞行夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "浅色系穿搭想温柔，就别选太冷的白",
    "body": "象牙白比纯白更柔一点，和浅灰、米色搭起来不会割裂，很适合轻松的日常出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-092.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-092.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "象牙针织",
      "同色系"
    ],
    "likes": 314,
    "createdAt": "2026-04-30T16:24:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-093",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-019",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-015"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-015",
        "label": "浅卡其短外套",
        "x": 67,
        "y": 58
      }
    ],
    "title": "宽松针织和长裤真的很适合周末",
    "body": "这类韩系宽松穿搭重点就是舒服，版型要松，颜色要软，整体看着就会特别安静。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-093.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-093.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "宽松针织",
      "周末穿搭"
    ],
    "likes": 328,
    "createdAt": "2026-04-30T16:18:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-094",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-019",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-060",
      "product-bulk-016"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-060",
        "label": "灰蓝阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-016",
        "label": "灰蓝短夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "同色系叠穿比想象中更显高级",
    "body": "米白和浅灰叠在一起没有压力，拍出来很自然，适合日常也适合轻松见朋友。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-094.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-094.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "同色系",
      "轻松感"
    ],
    "likes": 342,
    "createdAt": "2026-04-30T16:12:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-095",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-019",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-017"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-017",
        "label": "Seoul 黑色系带风衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "韩系松弛感的关键是轮廓不要太硬",
    "body": "柔软针织和宽松下装放在一起会更有韩系氛围，镜头里看起来也更舒服。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-095.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-095.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "柔和配色",
      "松弛感"
    ],
    "likes": 356,
    "createdAt": "2026-04-30T16:06:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-096",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-020",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-018"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-018",
        "label": "象牙白轻薄西装",
        "x": 67,
        "y": 58
      }
    ],
    "title": "象牙白针织，韩系松弛感不用太复杂",
    "body": "宽松针织和浅色长裤放在一起很柔和，整套没有很强的攻击性，拍出来就会有韩系松弛感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-096.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-096.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "象牙针织",
      "松弛感"
    ],
    "likes": 310,
    "createdAt": "2026-04-30T15:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-097",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-020",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-019"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-019",
        "label": "浅卡其宽松西装",
        "x": 67,
        "y": 58
      }
    ],
    "title": "浅色系穿搭想温柔，就别选太冷的白",
    "body": "象牙白比纯白更柔一点，和浅灰、米色搭起来不会割裂，很适合轻松的日常出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-097.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-097.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "象牙针织",
      "同色系"
    ],
    "likes": 324,
    "createdAt": "2026-04-30T15:24:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-098",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-020",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-060",
      "product-bulk-020"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-060",
        "label": "灰蓝阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-020",
        "label": "灰蓝通勤外套",
        "x": 67,
        "y": 58
      }
    ],
    "title": "宽松针织和长裤真的很适合周末",
    "body": "这类韩系宽松穿搭重点就是舒服，版型要松，颜色要软，整体看着就会特别安静。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-098.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-098.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "宽松针织",
      "周末穿搭"
    ],
    "likes": 338,
    "createdAt": "2026-04-30T15:18:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-099",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-020",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-021"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "同色系叠穿比想象中更显高级",
    "body": "米白和浅灰叠在一起没有压力，拍出来很自然，适合日常也适合轻松见朋友。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-099.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-099.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "同色系",
      "轻松感"
    ],
    "likes": 352,
    "createdAt": "2026-04-30T15:12:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-100",
    "type": "seller-look",
    "sellerId": "seller-seoul",
    "bloggerId": "blogger-020",
    "productId": "product-bulk-032",
    "productIds": [
      "product-bulk-032",
      "product-bulk-053",
      "product-bulk-022"
    ],
    "productTags": [
      {
        "productId": "product-bulk-032",
        "label": "深咖宽松毛衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-053",
        "label": "黑色直筒裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-022",
        "label": "象牙白系带风衣",
        "x": 67,
        "y": 58
      }
    ],
    "title": "韩系松弛感的关键是轮廓不要太硬",
    "body": "柔软针织和宽松下装放在一起会更有韩系氛围，镜头里看起来也更舒服。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-100.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-100.jpg"
    ],
    "styleTags": [
      "韩系宽松",
      "柔和配色",
      "松弛感"
    ],
    "likes": 366,
    "createdAt": "2026-04-30T15:06:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-101",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-021",
    "productId": "product-bulk-021",
    "productIds": [
      "product-bulk-021",
      "product-bulk-047",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-047",
        "label": "深咖挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "工装马甲配直筒裤，日系感很稳",
    "body": "这套用工装马甲和直筒裤做层次，整体偏功能感，但不会太硬，很适合日系工装爱好者。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-101.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-101.jpg"
    ],
    "styleTags": [
      "日系工装",
      "工装马甲",
      "直筒裤"
    ],
    "likes": 320,
    "createdAt": "2026-04-30T14:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-102",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-021",
    "productId": "product-bulk-026",
    "productIds": [
      "product-bulk-026",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-026",
        "label": "象牙白长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "卡其风衣一上身，日系感就出来了",
    "body": "卡其风衣和深色长裤的组合很耐看，偏功能又很日常，适合秋冬和换季穿。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-102.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-102.jpg"
    ],
    "styleTags": [
      "日系工装",
      "卡其风衣",
      "功能感"
    ],
    "likes": 334,
    "createdAt": "2026-04-30T14:24:00.000Z",
    "priceLabel": "¥168 起"
  },
  {
    "id": "post-bulk-103",
    "type": "seller-look",
    "sellerId": "seller-dark",
    "bloggerId": "blogger-021",
    "productId": "product-bulk-023",
    "productIds": [
      "product-bulk-023",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-023",
        "label": "浅卡其轻薄西装",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "马甲叠穿的层次感，真的很日系",
    "body": "工装马甲加衬衫是最稳的叠穿方式，版型利落，颜色也很统一，看着很清爽。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-103.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-103.jpg"
    ],
    "styleTags": [
      "日系工装",
      "层次穿搭",
      "马甲"
    ],
    "likes": 348,
    "createdAt": "2026-04-30T14:18:00.000Z",
    "priceLabel": "¥129 起"
  },
  {
    "id": "post-bulk-104",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-021",
    "productId": "product-bulk-012",
    "productIds": [
      "product-bulk-012",
      "product-bulk-054",
      "product-bulk-075"
    ],
    "productTags": [
      {
        "productId": "product-bulk-012",
        "label": "灰蓝棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-075",
        "label": "浅灰斜挎包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "牛仔工装配件一点，日常也能穿",
    "body": "牛仔和工装配件放一起会很有生活感，街拍里看着自然，平时出门也不会太夸张。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-104.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-104.jpg"
    ],
    "styleTags": [
      "日系工装",
      "牛仔工装",
      "日常"
    ],
    "likes": 362,
    "createdAt": "2026-04-30T14:12:00.000Z",
    "priceLabel": "¥129 起"
  },
  {
    "id": "post-bulk-105",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-021",
    "productId": "product-bulk-005",
    "productIds": [
      "product-bulk-005",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-005",
        "label": "黑色短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "中性工装风，真的特别适合拍路边",
    "body": "这一套把工装布料和宽松轮廓放到一起，整体看起来比较轻，街边拍照很出氛围。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-105.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-105.jpg"
    ],
    "styleTags": [
      "日系工装",
      "中性风",
      "宽松轮廓"
    ],
    "likes": 376,
    "createdAt": "2026-04-30T14:06:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-106",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-022",
    "productId": "product-bulk-026",
    "productIds": [
      "product-bulk-026",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-026",
        "label": "象牙白长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "工装马甲配直筒裤，日系感很稳",
    "body": "这套用工装马甲和直筒裤做层次，整体偏功能感，但不会太硬，很适合日系工装爱好者。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-106.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-106.jpg"
    ],
    "styleTags": [
      "日系工装",
      "工装马甲",
      "直筒裤"
    ],
    "likes": 330,
    "createdAt": "2026-04-30T13:30:00.000Z",
    "priceLabel": "¥168 起"
  },
  {
    "id": "post-bulk-107",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-022",
    "productId": "product-bulk-019",
    "productIds": [
      "product-bulk-019",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-019",
        "label": "浅卡其宽松西装",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "卡其风衣一上身，日系感就出来了",
    "body": "卡其风衣和深色长裤的组合很耐看，偏功能又很日常，适合秋冬和换季穿。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-107.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-107.jpg"
    ],
    "styleTags": [
      "日系工装",
      "卡其风衣",
      "功能感"
    ],
    "likes": 344,
    "createdAt": "2026-04-30T13:24:00.000Z",
    "priceLabel": "¥239 起"
  },
  {
    "id": "post-bulk-108",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-022",
    "productId": "product-bulk-028",
    "productIds": [
      "product-bulk-028",
      "product-bulk-047",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-028",
        "label": "深咖开衫",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-047",
        "label": "深咖挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "马甲叠穿的层次感，真的很日系",
    "body": "工装马甲加衬衫是最稳的叠穿方式，版型利落，颜色也很统一，看着很清爽。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-108.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-108.jpg"
    ],
    "styleTags": [
      "日系工装",
      "层次穿搭",
      "马甲"
    ],
    "likes": 358,
    "createdAt": "2026-04-30T13:18:00.000Z",
    "priceLabel": "¥199 起"
  },
  {
    "id": "post-bulk-109",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-022",
    "productId": "product-bulk-005",
    "productIds": [
      "product-bulk-005",
      "product-bulk-054",
      "product-bulk-075"
    ],
    "productTags": [
      {
        "productId": "product-bulk-005",
        "label": "黑色短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-075",
        "label": "浅灰斜挎包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "牛仔工装配件一点，日常也能穿",
    "body": "牛仔和工装配件放一起会很有生活感，街拍里看着自然，平时出门也不会太夸张。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-109.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-109.jpg"
    ],
    "styleTags": [
      "日系工装",
      "牛仔工装",
      "日常"
    ],
    "likes": 372,
    "createdAt": "2026-04-30T13:12:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-110",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-022",
    "productId": "product-bulk-005",
    "productIds": [
      "product-bulk-005",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-005",
        "label": "黑色短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "中性工装风，真的特别适合拍路边",
    "body": "这一套把工装布料和宽松轮廓放到一起，整体看起来比较轻，街边拍照很出氛围。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-110.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-110.jpg"
    ],
    "styleTags": [
      "日系工装",
      "中性风",
      "宽松轮廓"
    ],
    "likes": 386,
    "createdAt": "2026-04-30T13:06:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-111",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-023",
    "productId": "product-bulk-031",
    "productIds": [
      "product-bulk-031",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-031",
        "label": "Seoul 浅灰高领针织",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "工装马甲配直筒裤，日系感很稳",
    "body": "这套用工装马甲和直筒裤做层次，整体偏功能感，但不会太硬，很适合日系工装爱好者。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-111.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-111.jpg"
    ],
    "styleTags": [
      "日系工装",
      "工装马甲",
      "直筒裤"
    ],
    "likes": 340,
    "createdAt": "2026-04-30T12:30:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-112",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-023",
    "productId": "product-bulk-019",
    "productIds": [
      "product-bulk-019",
      "product-bulk-047",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-019",
        "label": "浅卡其宽松西装",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-047",
        "label": "深咖挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "卡其风衣一上身，日系感就出来了",
    "body": "卡其风衣和深色长裤的组合很耐看，偏功能又很日常，适合秋冬和换季穿。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-112.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-112.jpg"
    ],
    "styleTags": [
      "日系工装",
      "卡其风衣",
      "功能感"
    ],
    "likes": 354,
    "createdAt": "2026-04-30T12:24:00.000Z",
    "priceLabel": "¥239 起"
  },
  {
    "id": "post-bulk-113",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-023",
    "productId": "product-bulk-033",
    "productIds": [
      "product-bulk-033",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-033",
        "label": "橄榄绿开衫",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "马甲叠穿的层次感，真的很日系",
    "body": "工装马甲加衬衫是最稳的叠穿方式，版型利落，颜色也很统一，看着很清爽。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-113.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-113.jpg"
    ],
    "styleTags": [
      "日系工装",
      "层次穿搭",
      "马甲"
    ],
    "likes": 368,
    "createdAt": "2026-04-30T12:18:00.000Z",
    "priceLabel": "¥299 起"
  },
  {
    "id": "post-bulk-114",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-023",
    "productId": "product-bulk-005",
    "productIds": [
      "product-bulk-005",
      "product-bulk-054",
      "product-bulk-075"
    ],
    "productTags": [
      {
        "productId": "product-bulk-005",
        "label": "黑色短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-075",
        "label": "浅灰斜挎包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "牛仔工装配件一点，日常也能穿",
    "body": "牛仔和工装配件放一起会很有生活感，街拍里看着自然，平时出门也不会太夸张。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-114.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-114.jpg"
    ],
    "styleTags": [
      "日系工装",
      "牛仔工装",
      "日常"
    ],
    "likes": 382,
    "createdAt": "2026-04-30T12:12:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-115",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-023",
    "productId": "product-bulk-012",
    "productIds": [
      "product-bulk-012",
      "product-bulk-047",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-012",
        "label": "灰蓝棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-047",
        "label": "深咖挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "中性工装风，真的特别适合拍路边",
    "body": "这一套把工装布料和宽松轮廓放到一起，整体看起来比较轻，街边拍照很出氛围。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-115.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-115.jpg"
    ],
    "styleTags": [
      "日系工装",
      "中性风",
      "宽松轮廓"
    ],
    "likes": 396,
    "createdAt": "2026-04-30T12:06:00.000Z",
    "priceLabel": "¥129 起"
  },
  {
    "id": "post-bulk-116",
    "type": "seller-look",
    "sellerId": "seller-clean",
    "bloggerId": "blogger-024",
    "productId": "product-bulk-036",
    "productIds": [
      "product-bulk-036",
      "product-bulk-047",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-036",
        "label": "深咖高领针织",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-047",
        "label": "深咖挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "工装马甲配直筒裤，日系感很稳",
    "body": "这套用工装马甲和直筒裤做层次，整体偏功能感，但不会太硬，很适合日系工装爱好者。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-116.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-116.jpg"
    ],
    "styleTags": [
      "日系工装",
      "工装马甲",
      "直筒裤"
    ],
    "likes": 350,
    "createdAt": "2026-04-30T11:30:00.000Z",
    "priceLabel": "¥159 起"
  },
  {
    "id": "post-bulk-117",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-024",
    "productId": "product-bulk-026",
    "productIds": [
      "product-bulk-026",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-026",
        "label": "象牙白长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "卡其风衣一上身，日系感就出来了",
    "body": "卡其风衣和深色长裤的组合很耐看，偏功能又很日常，适合秋冬和换季穿。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-117.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-117.jpg"
    ],
    "styleTags": [
      "日系工装",
      "卡其风衣",
      "功能感"
    ],
    "likes": 364,
    "createdAt": "2026-04-30T11:24:00.000Z",
    "priceLabel": "¥168 起"
  },
  {
    "id": "post-bulk-118",
    "type": "seller-look",
    "sellerId": "seller-vintage",
    "bloggerId": "blogger-024",
    "productId": "product-bulk-038",
    "productIds": [
      "product-bulk-038",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-038",
        "label": "Seoul 雾蓝开衫",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "马甲叠穿的层次感，真的很日系",
    "body": "工装马甲加衬衫是最稳的叠穿方式，版型利落，颜色也很统一，看着很清爽。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-118.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-118.jpg"
    ],
    "styleTags": [
      "日系工装",
      "层次穿搭",
      "马甲"
    ],
    "likes": 378,
    "createdAt": "2026-04-30T11:18:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-119",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-024",
    "productId": "product-bulk-012",
    "productIds": [
      "product-bulk-012",
      "product-bulk-054",
      "product-bulk-075"
    ],
    "productTags": [
      {
        "productId": "product-bulk-012",
        "label": "灰蓝棒球夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-075",
        "label": "浅灰斜挎包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "牛仔工装配件一点，日常也能穿",
    "body": "牛仔和工装配件放一起会很有生活感，街拍里看着自然，平时出门也不会太夸张。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-119.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-119.jpg"
    ],
    "styleTags": [
      "日系工装",
      "牛仔工装",
      "日常"
    ],
    "likes": 392,
    "createdAt": "2026-04-30T11:12:00.000Z",
    "priceLabel": "¥129 起"
  },
  {
    "id": "post-bulk-120",
    "type": "seller-look",
    "sellerId": "seller-japan",
    "bloggerId": "blogger-024",
    "productId": "product-bulk-005",
    "productIds": [
      "product-bulk-005",
      "product-bulk-040",
      "product-bulk-054"
    ],
    "productTags": [
      {
        "productId": "product-bulk-005",
        "label": "黑色短外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-040",
        "label": "橄榄绿衬衫",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-054",
        "label": "象牙白牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "中性工装风，真的特别适合拍路边",
    "body": "这一套把工装布料和宽松轮廓放到一起，整体看起来比较轻，街边拍照很出氛围。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-120.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-120.jpg"
    ],
    "styleTags": [
      "日系工装",
      "中性风",
      "宽松轮廓"
    ],
    "likes": 406,
    "createdAt": "2026-04-30T11:06:00.000Z",
    "priceLabel": "¥189 起"
  },
  {
    "id": "post-bulk-121",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-025",
    "productId": "product-bulk-048",
    "productIds": [
      "product-bulk-048",
      "product-bulk-006",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-048",
        "label": "橄榄绿长袖上衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "甜酷风最稳的还是短上衣配长裤",
    "body": "短上衣和高腰长裤一搭，比例会很好，配黑色外套之后就有一点甜酷辣妹的味道。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-121.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-121.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "短上衣",
      "高腰裤"
    ],
    "likes": 360,
    "createdAt": "2026-04-30T10:30:00.000Z",
    "priceLabel": "¥168 起"
  },
  {
    "id": "post-bulk-122",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-025",
    "productId": "product-bulk-041",
    "productIds": [
      "product-bulk-041",
      "product-bulk-013",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-041",
        "label": "雾蓝基础打底",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-013",
        "label": "黑色工装外套",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑粉配色真的很容易出片",
    "body": "黑色和粉色放在一起会很有张力，既有甜感又不会太软，街头拍照很亮眼。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-122.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-122.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "黑粉配色",
      "出片"
    ],
    "likes": 374,
    "createdAt": "2026-04-30T10:24:00.000Z",
    "priceLabel": "¥239 起"
  },
  {
    "id": "post-bulk-123",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-025",
    "productId": "product-bulk-013",
    "productIds": [
      "product-bulk-013",
      "product-bulk-048",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-013",
        "label": "黑色工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-048",
        "label": "橄榄绿长袖上衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "短外套 + 修身下装，甜酷感就够了",
    "body": "这套靠版型撑气质，短外套把上半身收住，下面用修身裤拉出线条，简单但有效。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-123.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-123.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "短外套",
      "修身裤"
    ],
    "likes": 388,
    "createdAt": "2026-04-30T10:18:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-124",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-025",
    "productId": "product-bulk-048",
    "productIds": [
      "product-bulk-048",
      "product-bulk-006",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-048",
        "label": "橄榄绿长袖上衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "如果想要一点辣，就把颜色压暗",
    "body": "酒红和黑色的组合会更成熟一点，但还是能保留甜酷味，适合夜景或者商场门口。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-124.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-124.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "酒红",
      "夜景"
    ],
    "likes": 402,
    "createdAt": "2026-04-30T10:12:00.000Z",
    "priceLabel": "¥168 起"
  },
  {
    "id": "post-bulk-125",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-025",
    "productId": "product-bulk-006",
    "productIds": [
      "product-bulk-006",
      "product-bulk-055",
      "product-bulk-076"
    ],
    "productTags": [
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-076",
        "label": "深咖腋下包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "亮一点的包袋能把整套提起来",
    "body": "甜酷穿搭里包袋是加分项，黑色套装配一点银色或者亮面配件，照片会更有记忆点。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-125.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-125.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "亮面配件",
      "街拍"
    ],
    "likes": 416,
    "createdAt": "2026-04-30T10:06:00.000Z",
    "priceLabel": "¥199 起"
  },
  {
    "id": "post-bulk-126",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-026",
    "productId": "product-bulk-041",
    "productIds": [
      "product-bulk-041",
      "product-bulk-013",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-041",
        "label": "雾蓝基础打底",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-013",
        "label": "黑色工装外套",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "甜酷风最稳的还是短上衣配长裤",
    "body": "短上衣和高腰长裤一搭，比例会很好，配黑色外套之后就有一点甜酷辣妹的味道。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-126.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-126.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "短上衣",
      "高腰裤"
    ],
    "likes": 370,
    "createdAt": "2026-04-30T09:30:00.000Z",
    "priceLabel": "¥239 起"
  },
  {
    "id": "post-bulk-127",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-026",
    "productId": "product-bulk-041",
    "productIds": [
      "product-bulk-041",
      "product-bulk-006",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-041",
        "label": "雾蓝基础打底",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑粉配色真的很容易出片",
    "body": "黑色和粉色放在一起会很有张力，既有甜感又不会太软，街头拍照很亮眼。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-127.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-127.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "黑粉配色",
      "出片"
    ],
    "likes": 384,
    "createdAt": "2026-04-30T09:24:00.000Z",
    "priceLabel": "¥239 起"
  },
  {
    "id": "post-bulk-128",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-026",
    "productId": "product-bulk-006",
    "productIds": [
      "product-bulk-006",
      "product-bulk-041",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-041",
        "label": "雾蓝基础打底",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "短外套 + 修身下装，甜酷感就够了",
    "body": "这套靠版型撑气质，短外套把上半身收住，下面用修身裤拉出线条，简单但有效。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-128.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-128.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "短外套",
      "修身裤"
    ],
    "likes": 398,
    "createdAt": "2026-04-30T09:18:00.000Z",
    "priceLabel": "¥199 起"
  },
  {
    "id": "post-bulk-129",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-026",
    "productId": "product-bulk-041",
    "productIds": [
      "product-bulk-041",
      "product-bulk-013",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-041",
        "label": "雾蓝基础打底",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-013",
        "label": "黑色工装外套",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "如果想要一点辣，就把颜色压暗",
    "body": "酒红和黑色的组合会更成熟一点，但还是能保留甜酷味，适合夜景或者商场门口。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-129.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-129.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "酒红",
      "夜景"
    ],
    "likes": 412,
    "createdAt": "2026-04-30T09:12:00.000Z",
    "priceLabel": "¥239 起"
  },
  {
    "id": "post-bulk-130",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-026",
    "productId": "product-bulk-013",
    "productIds": [
      "product-bulk-013",
      "product-bulk-055",
      "product-bulk-076"
    ],
    "productTags": [
      {
        "productId": "product-bulk-013",
        "label": "黑色工装外套",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-076",
        "label": "深咖腋下包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "亮一点的包袋能把整套提起来",
    "body": "甜酷穿搭里包袋是加分项，黑色套装配一点银色或者亮面配件，照片会更有记忆点。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-130.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-130.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "亮面配件",
      "街拍"
    ],
    "likes": 426,
    "createdAt": "2026-04-30T09:06:00.000Z",
    "priceLabel": "¥139 起"
  },
  {
    "id": "post-bulk-131",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-027",
    "productId": "product-bulk-041",
    "productIds": [
      "product-bulk-041",
      "product-bulk-006",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-041",
        "label": "雾蓝基础打底",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "甜酷风最稳的还是短上衣配长裤",
    "body": "短上衣和高腰长裤一搭，比例会很好，配黑色外套之后就有一点甜酷辣妹的味道。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-131.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-131.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "短上衣",
      "高腰裤"
    ],
    "likes": 380,
    "createdAt": "2026-04-30T08:30:00.000Z",
    "priceLabel": "¥239 起"
  },
  {
    "id": "post-bulk-132",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-027",
    "productId": "product-bulk-048",
    "productIds": [
      "product-bulk-048",
      "product-bulk-006",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-048",
        "label": "橄榄绿长袖上衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "黑粉配色真的很容易出片",
    "body": "黑色和粉色放在一起会很有张力，既有甜感又不会太软，街头拍照很亮眼。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-132.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-132.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "黑粉配色",
      "出片"
    ],
    "likes": 394,
    "createdAt": "2026-04-30T08:24:00.000Z",
    "priceLabel": "¥168 起"
  },
  {
    "id": "post-bulk-133",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-027",
    "productId": "product-bulk-006",
    "productIds": [
      "product-bulk-006",
      "product-bulk-041",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-041",
        "label": "雾蓝基础打底",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "短外套 + 修身下装，甜酷感就够了",
    "body": "这套靠版型撑气质，短外套把上半身收住，下面用修身裤拉出线条，简单但有效。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-133.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-133.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "短外套",
      "修身裤"
    ],
    "likes": 408,
    "createdAt": "2026-04-30T08:18:00.000Z",
    "priceLabel": "¥199 起"
  },
  {
    "id": "post-bulk-134",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-027",
    "productId": "product-bulk-041",
    "productIds": [
      "product-bulk-041",
      "product-bulk-006",
      "product-bulk-055"
    ],
    "productTags": [
      {
        "productId": "product-bulk-041",
        "label": "雾蓝基础打底",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "如果想要一点辣，就把颜色压暗",
    "body": "酒红和黑色的组合会更成熟一点，但还是能保留甜酷味，适合夜景或者商场门口。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-134.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-134.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "酒红",
      "夜景"
    ],
    "likes": 422,
    "createdAt": "2026-04-30T08:12:00.000Z",
    "priceLabel": "¥239 起"
  },
  {
    "id": "post-bulk-135",
    "type": "seller-look",
    "sellerId": "seller-sweet",
    "bloggerId": "blogger-027",
    "productId": "product-bulk-006",
    "productIds": [
      "product-bulk-006",
      "product-bulk-055",
      "product-bulk-076"
    ],
    "productTags": [
      {
        "productId": "product-bulk-006",
        "label": "象牙白短夹克",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-055",
        "label": "浅卡其阔腿裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-076",
        "label": "深咖腋下包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "亮一点的包袋能把整套提起来",
    "body": "甜酷穿搭里包袋是加分项，黑色套装配一点银色或者亮面配件，照片会更有记忆点。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-135.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-135.jpg"
    ],
    "styleTags": [
      "甜酷辣妹",
      "亮面配件",
      "街拍"
    ],
    "likes": 436,
    "createdAt": "2026-04-30T08:06:00.000Z",
    "priceLabel": "¥199 起"
  },
  {
    "id": "post-bulk-136",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-028",
    "productId": "product-bulk-021",
    "productIds": [
      "product-bulk-021",
      "product-bulk-042",
      "product-bulk-056"
    ],
    "productTags": [
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-056",
        "label": "灰蓝工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "法式松弛感，靠的是颜色和垂感",
    "body": "浅咖外套配奶油白内搭和垂感长裤，整套很轻松，拍照的时候也会显得很自然。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-136.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-136.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "轻熟",
      "垂感"
    ],
    "likes": 390,
    "createdAt": "2026-04-30T07:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-137",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-028",
    "productId": "product-bulk-021",
    "productIds": [
      "product-bulk-021",
      "product-bulk-042",
      "product-bulk-049"
    ],
    "productTags": [
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-049",
        "label": "黑色牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "看展穿浅咖西装，会比黑色柔很多",
    "body": "浅咖色西装会比黑色更柔，和白色上衣一起穿会很有法式的干净感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-137.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-137.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "浅咖西装",
      "看展"
    ],
    "likes": 404,
    "createdAt": "2026-04-30T07:24:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-138",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-028",
    "productId": "product-bulk-042",
    "productIds": [
      "product-bulk-042",
      "product-bulk-049",
      "product-bulk-007"
    ],
    "productTags": [
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-049",
        "label": "黑色牛仔裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-007",
        "label": "浅卡其棒球夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "轻熟感不是成熟，是看起来不费力",
    "body": "这套主要靠顺色和宽松版型，简单但有层次，适合咖啡店和日常出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-138.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-138.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "轻熟",
      "顺色"
    ],
    "likes": 418,
    "createdAt": "2026-04-30T07:18:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-139",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-028",
    "productId": "product-bulk-021",
    "productIds": [
      "product-bulk-021",
      "product-bulk-042",
      "product-bulk-056"
    ],
    "productTags": [
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-056",
        "label": "灰蓝工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "一件好看的风衣就够了",
    "body": "风衣的垂感会把整个人的气质拉得很柔，搭浅色内搭就已经很完整。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-139.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-139.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "风衣",
      "气质感"
    ],
    "likes": 432,
    "createdAt": "2026-04-30T07:12:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-140",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-028",
    "productId": "product-bulk-042",
    "productIds": [
      "product-bulk-042",
      "product-bulk-056",
      "product-bulk-077"
    ],
    "productTags": [
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-056",
        "label": "灰蓝工装裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-077",
        "label": "橄榄绿手提包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "奶油白和浅咖，真的很适合拍照",
    "body": "低对比度配色会让照片看起来很安静，适合喜欢松弛感和轻熟感的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-140.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-140.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "奶油白",
      "拍照感"
    ],
    "likes": 446,
    "createdAt": "2026-04-30T07:06:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-141",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-029",
    "productId": "product-bulk-021",
    "productIds": [
      "product-bulk-021",
      "product-bulk-042",
      "product-bulk-049"
    ],
    "productTags": [
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-049",
        "label": "黑色牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "法式松弛感，靠的是颜色和垂感",
    "body": "浅咖外套配奶油白内搭和垂感长裤，整套很轻松，拍照的时候也会显得很自然。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-141.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-141.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "轻熟",
      "垂感"
    ],
    "likes": 400,
    "createdAt": "2026-04-30T06:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-142",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-029",
    "productId": "product-bulk-021",
    "productIds": [
      "product-bulk-021",
      "product-bulk-042",
      "product-bulk-049"
    ],
    "productTags": [
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-049",
        "label": "黑色牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "看展穿浅咖西装，会比黑色柔很多",
    "body": "浅咖色西装会比黑色更柔，和白色上衣一起穿会很有法式的干净感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-142.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-142.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "浅咖西装",
      "看展"
    ],
    "likes": 414,
    "createdAt": "2026-04-30T06:24:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-143",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-029",
    "productId": "product-bulk-042",
    "productIds": [
      "product-bulk-042",
      "product-bulk-049",
      "product-bulk-014"
    ],
    "productTags": [
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-049",
        "label": "黑色牛仔裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-014",
        "label": "象牙白飞行夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "轻熟感不是成熟，是看起来不费力",
    "body": "这套主要靠顺色和宽松版型，简单但有层次，适合咖啡店和日常出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-143.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-143.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "轻熟",
      "顺色"
    ],
    "likes": 428,
    "createdAt": "2026-04-30T06:18:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-144",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-029",
    "productId": "product-bulk-021",
    "productIds": [
      "product-bulk-021",
      "product-bulk-042",
      "product-bulk-049"
    ],
    "productTags": [
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-049",
        "label": "黑色牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "一件好看的风衣就够了",
    "body": "风衣的垂感会把整个人的气质拉得很柔，搭浅色内搭就已经很完整。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-144.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-144.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "风衣",
      "气质感"
    ],
    "likes": 442,
    "createdAt": "2026-04-30T06:12:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-145",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-029",
    "productId": "product-bulk-042",
    "productIds": [
      "product-bulk-042",
      "product-bulk-049",
      "product-bulk-077"
    ],
    "productTags": [
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-049",
        "label": "黑色牛仔裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-077",
        "label": "橄榄绿手提包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "奶油白和浅咖，真的很适合拍照",
    "body": "低对比度配色会让照片看起来很安静，适合喜欢松弛感和轻熟感的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-145.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-145.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "奶油白",
      "拍照感"
    ],
    "likes": 456,
    "createdAt": "2026-04-30T06:06:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-146",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-030",
    "productId": "product-bulk-021",
    "productIds": [
      "product-bulk-021",
      "product-bulk-042",
      "product-bulk-049"
    ],
    "productTags": [
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-049",
        "label": "黑色牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "法式松弛感，靠的是颜色和垂感",
    "body": "浅咖外套配奶油白内搭和垂感长裤，整套很轻松，拍照的时候也会显得很自然。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-146.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-146.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "轻熟",
      "垂感"
    ],
    "likes": 410,
    "createdAt": "2026-04-30T05:30:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-147",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-030",
    "productId": "product-bulk-021",
    "productIds": [
      "product-bulk-021",
      "product-bulk-042",
      "product-bulk-056"
    ],
    "productTags": [
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-056",
        "label": "灰蓝工装裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "看展穿浅咖西装，会比黑色柔很多",
    "body": "浅咖色西装会比黑色更柔，和白色上衣一起穿会很有法式的干净感。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-147.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-147.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "浅咖西装",
      "看展"
    ],
    "likes": 424,
    "createdAt": "2026-04-30T05:24:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-148",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-030",
    "productId": "product-bulk-042",
    "productIds": [
      "product-bulk-042",
      "product-bulk-056",
      "product-bulk-007"
    ],
    "productTags": [
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-056",
        "label": "灰蓝工装裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-007",
        "label": "浅卡其棒球夹克",
        "x": 67,
        "y": 58
      }
    ],
    "title": "轻熟感不是成熟，是看起来不费力",
    "body": "这套主要靠顺色和宽松版型，简单但有层次，适合咖啡店和日常出门。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-148.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-148.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "轻熟",
      "顺色"
    ],
    "likes": 438,
    "createdAt": "2026-04-30T05:18:00.000Z",
    "priceLabel": "¥249 起"
  },
  {
    "id": "post-bulk-149",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-030",
    "productId": "product-bulk-021",
    "productIds": [
      "product-bulk-021",
      "product-bulk-042",
      "product-bulk-049"
    ],
    "productTags": [
      {
        "productId": "product-bulk-021",
        "label": "黑色长风衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-049",
        "label": "黑色牛仔裤",
        "x": 67,
        "y": 58
      }
    ],
    "title": "一件好看的风衣就够了",
    "body": "风衣的垂感会把整个人的气质拉得很柔，搭浅色内搭就已经很完整。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-149.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-149.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "风衣",
      "气质感"
    ],
    "likes": 452,
    "createdAt": "2026-04-30T05:12:00.000Z",
    "priceLabel": "¥279 起"
  },
  {
    "id": "post-bulk-150",
    "type": "seller-look",
    "sellerId": "seller-french",
    "bloggerId": "blogger-030",
    "productId": "product-bulk-042",
    "productIds": [
      "product-bulk-042",
      "product-bulk-049",
      "product-bulk-077"
    ],
    "productTags": [
      {
        "productId": "product-bulk-042",
        "label": "浅灰挺括衬衣",
        "x": 52,
        "y": 42
      },
      {
        "productId": "product-bulk-049",
        "label": "黑色牛仔裤",
        "x": 39,
        "y": 64
      },
      {
        "productId": "product-bulk-077",
        "label": "橄榄绿手提包",
        "x": 67,
        "y": 58
      }
    ],
    "title": "奶油白和浅咖，真的很适合拍照",
    "body": "低对比度配色会让照片看起来很安静，适合喜欢松弛感和轻熟感的人。",
    "coverImage": "/generated/seedream-bulk/posts/post-bulk-150.jpg",
    "images": [
      "/generated/seedream-bulk/posts/post-bulk-150.jpg"
    ],
    "styleTags": [
      "法式松弛",
      "奶油白",
      "拍照感"
    ],
    "likes": 466,
    "createdAt": "2026-04-30T05:06:00.000Z",
    "priceLabel": "¥249 起"
  }
] satisfies Post[];

export const generatedRequests = [
  {
    "id": "request-bulk-001",
    "image": "/generated/seedream-bulk/requests/request-bulk-001.jpg",
    "description": "通勤极简需求：想找一套和目标图接近的穿搭，重点是 沙色宽松西装、白色内搭、浅色阔腿裤。",
    "budget": 129,
    "tags": [
      "通勤极简",
      "沙色西装",
      "Clean Fit"
    ],
    "expectedItem": "沙色宽松西装",
    "matchedOffers": [
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-001",
        "price": 129,
        "similarityScore": 88,
        "note": "Urban 黑色短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-008",
        "price": 239,
        "similarityScore": 88,
        "note": "Urban 灰蓝工装外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-015",
        "price": 168,
        "similarityScore": 88,
        "note": "Urban 浅卡其短外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-022",
        "price": 299,
        "similarityScore": 88,
        "note": "Urban 象牙白系带风衣 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T08:00:00.000Z"
  },
  {
    "id": "request-bulk-002",
    "image": "/generated/seedream-bulk/requests/request-bulk-002.jpg",
    "description": "高街暗黑需求：想找一套和目标图接近的穿搭，重点是 黑色短夹克、白色内搭、黑色高腰长裤。",
    "budget": 249,
    "tags": [
      "高街暗黑",
      "短款夹克",
      "黑白灰"
    ],
    "expectedItem": "黑色短夹克",
    "matchedOffers": [
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-009",
        "price": 249,
        "similarityScore": 87,
        "note": "Daily 黑色飞行夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-016",
        "price": 189,
        "similarityScore": 87,
        "note": "Daily 灰蓝短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-023",
        "price": 129,
        "similarityScore": 87,
        "note": "Daily 浅卡其轻薄西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-030",
        "price": 239,
        "similarityScore": 87,
        "note": "Daily 雾蓝罗纹上衣 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T09:00:00.000Z"
  },
  {
    "id": "request-bulk-003",
    "image": "/generated/seedream-bulk/requests/request-bulk-003.jpg",
    "description": "美式复古需求：想找一套和目标图接近的穿搭，重点是 浅水洗牛仔外套、白T、深色直筒裤。",
    "budget": 199,
    "tags": [
      "美式复古",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "expectedItem": "浅水洗牛仔外套",
    "matchedOffers": [
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-017",
        "price": 199,
        "similarityScore": 86,
        "note": "Loose Seoul 黑色系带风衣 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-024",
        "price": 139,
        "similarityScore": 86,
        "note": "Loose Seoul 灰蓝宽松西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-031",
        "price": 249,
        "similarityScore": 86,
        "note": "Loose Seoul 浅灰高领针织 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-038",
        "price": 189,
        "similarityScore": 86,
        "note": "Loose Seoul 雾蓝开衫 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T10:00:00.000Z"
  },
  {
    "id": "request-bulk-004",
    "image": "/generated/seedream-bulk/requests/request-bulk-004.jpg",
    "description": "韩系宽松需求：想找一套和目标图接近的穿搭，重点是 象牙白针织、浅灰长裤、奶油色包袋。",
    "budget": 168,
    "tags": [
      "韩系宽松",
      "象牙针织",
      "松弛感"
    ],
    "expectedItem": "象牙白针织",
    "matchedOffers": [
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-004",
        "price": 168,
        "similarityScore": 85,
        "note": "Vintage 灰蓝飞行夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-011",
        "price": 299,
        "similarityScore": 85,
        "note": "Vintage 浅卡其短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-018",
        "price": 219,
        "similarityScore": 85,
        "note": "Vintage 象牙白轻薄西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-025",
        "price": 159,
        "similarityScore": 85,
        "note": "Vintage 黑色通勤外套 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T11:00:00.000Z"
  },
  {
    "id": "request-bulk-005",
    "image": "/generated/seedream-bulk/requests/request-bulk-005.jpg",
    "description": "日系工装需求：想找一套和目标图接近的穿搭，重点是 工装马甲、白T、军绿直筒裤。",
    "budget": 129,
    "tags": [
      "日系工装",
      "工装马甲",
      "直筒裤"
    ],
    "expectedItem": "工装马甲",
    "matchedOffers": [
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-012",
        "price": 129,
        "similarityScore": 84,
        "note": "Maison 灰蓝棒球夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-019",
        "price": 239,
        "similarityScore": 84,
        "note": "Maison 浅卡其宽松西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-026",
        "price": 168,
        "similarityScore": 84,
        "note": "Maison 象牙白长风衣 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-033",
        "price": 299,
        "similarityScore": 84,
        "note": "Maison 橄榄绿开衫 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T12:00:00.000Z"
  },
  {
    "id": "request-bulk-006",
    "image": "/generated/seedream-bulk/requests/request-bulk-006.jpg",
    "description": "甜酷辣妹需求：想找一套和目标图接近的穿搭，重点是 短上衣、黑色外套、高腰长裤。",
    "budget": 249,
    "tags": [
      "甜酷辣妹",
      "短上衣",
      "高腰裤"
    ],
    "expectedItem": "短上衣",
    "matchedOffers": [
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-020",
        "price": 249,
        "similarityScore": 83,
        "note": "Studio 灰蓝通勤外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-027",
        "price": 189,
        "similarityScore": 83,
        "note": "Studio 浅灰宽松毛衣 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-034",
        "price": 129,
        "similarityScore": 83,
        "note": "Studio 雾蓝针织衫 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-041",
        "price": 239,
        "similarityScore": 83,
        "note": "Studio 雾蓝基础打底 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T13:00:00.000Z"
  },
  {
    "id": "request-bulk-007",
    "image": "/generated/seedream-bulk/requests/request-bulk-007.jpg",
    "description": "通勤极简需求：想找一套和目标图接近的穿搭，重点是 沙色宽松西装、白色内搭、浅色阔腿裤。",
    "budget": 129,
    "tags": [
      "通勤极简",
      "沙色西装",
      "Clean Fit"
    ],
    "expectedItem": "沙色宽松西装",
    "matchedOffers": [
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-001",
        "price": 129,
        "similarityScore": 82,
        "note": "Urban 黑色短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-008",
        "price": 239,
        "similarityScore": 82,
        "note": "Urban 灰蓝工装外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-015",
        "price": 168,
        "similarityScore": 82,
        "note": "Urban 浅卡其短外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-022",
        "price": 299,
        "similarityScore": 82,
        "note": "Urban 象牙白系带风衣 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T14:00:00.000Z"
  },
  {
    "id": "request-bulk-008",
    "image": "/generated/seedream-bulk/requests/request-bulk-008.jpg",
    "description": "高街暗黑需求：想找一套和目标图接近的穿搭，重点是 黑色短夹克、白色内搭、黑色高腰长裤。",
    "budget": 249,
    "tags": [
      "高街暗黑",
      "短款夹克",
      "黑白灰"
    ],
    "expectedItem": "黑色短夹克",
    "matchedOffers": [
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-009",
        "price": 249,
        "similarityScore": 88,
        "note": "Daily 黑色飞行夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-016",
        "price": 189,
        "similarityScore": 88,
        "note": "Daily 灰蓝短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-023",
        "price": 129,
        "similarityScore": 88,
        "note": "Daily 浅卡其轻薄西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-030",
        "price": 239,
        "similarityScore": 88,
        "note": "Daily 雾蓝罗纹上衣 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T15:00:00.000Z"
  },
  {
    "id": "request-bulk-009",
    "image": "/generated/seedream-bulk/requests/request-bulk-009.jpg",
    "description": "美式复古需求：想找一套和目标图接近的穿搭，重点是 浅水洗牛仔外套、白T、深色直筒裤。",
    "budget": 199,
    "tags": [
      "美式复古",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "expectedItem": "浅水洗牛仔外套",
    "matchedOffers": [
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-017",
        "price": 199,
        "similarityScore": 87,
        "note": "Loose Seoul 黑色系带风衣 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-024",
        "price": 139,
        "similarityScore": 87,
        "note": "Loose Seoul 灰蓝宽松西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-031",
        "price": 249,
        "similarityScore": 87,
        "note": "Loose Seoul 浅灰高领针织 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-038",
        "price": 189,
        "similarityScore": 87,
        "note": "Loose Seoul 雾蓝开衫 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T16:00:00.000Z"
  },
  {
    "id": "request-bulk-010",
    "image": "/generated/seedream-bulk/requests/request-bulk-010.jpg",
    "description": "韩系宽松需求：想找一套和目标图接近的穿搭，重点是 象牙白针织、浅灰长裤、奶油色包袋。",
    "budget": 168,
    "tags": [
      "韩系宽松",
      "象牙针织",
      "松弛感"
    ],
    "expectedItem": "象牙白针织",
    "matchedOffers": [
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-004",
        "price": 168,
        "similarityScore": 86,
        "note": "Vintage 灰蓝飞行夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-011",
        "price": 299,
        "similarityScore": 86,
        "note": "Vintage 浅卡其短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-018",
        "price": 219,
        "similarityScore": 86,
        "note": "Vintage 象牙白轻薄西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-025",
        "price": 159,
        "similarityScore": 86,
        "note": "Vintage 黑色通勤外套 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T17:00:00.000Z"
  },
  {
    "id": "request-bulk-011",
    "image": "/generated/seedream-bulk/requests/request-bulk-011.jpg",
    "description": "日系工装需求：想找一套和目标图接近的穿搭，重点是 工装马甲、白T、军绿直筒裤。",
    "budget": 129,
    "tags": [
      "日系工装",
      "工装马甲",
      "直筒裤"
    ],
    "expectedItem": "工装马甲",
    "matchedOffers": [
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-012",
        "price": 129,
        "similarityScore": 85,
        "note": "Maison 灰蓝棒球夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-019",
        "price": 239,
        "similarityScore": 85,
        "note": "Maison 浅卡其宽松西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-026",
        "price": 168,
        "similarityScore": 85,
        "note": "Maison 象牙白长风衣 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-033",
        "price": 299,
        "similarityScore": 85,
        "note": "Maison 橄榄绿开衫 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T18:00:00.000Z"
  },
  {
    "id": "request-bulk-012",
    "image": "/generated/seedream-bulk/requests/request-bulk-012.jpg",
    "description": "甜酷辣妹需求：想找一套和目标图接近的穿搭，重点是 短上衣、黑色外套、高腰长裤。",
    "budget": 249,
    "tags": [
      "甜酷辣妹",
      "短上衣",
      "高腰裤"
    ],
    "expectedItem": "短上衣",
    "matchedOffers": [
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-020",
        "price": 249,
        "similarityScore": 84,
        "note": "Studio 灰蓝通勤外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-027",
        "price": 189,
        "similarityScore": 84,
        "note": "Studio 浅灰宽松毛衣 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-034",
        "price": 129,
        "similarityScore": 84,
        "note": "Studio 雾蓝针织衫 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-041",
        "price": 239,
        "similarityScore": 84,
        "note": "Studio 雾蓝基础打底 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T19:00:00.000Z"
  },
  {
    "id": "request-bulk-013",
    "image": "/generated/seedream-bulk/requests/request-bulk-013.jpg",
    "description": "通勤极简需求：想找一套和目标图接近的穿搭，重点是 沙色宽松西装、白色内搭、浅色阔腿裤。",
    "budget": 129,
    "tags": [
      "通勤极简",
      "沙色西装",
      "Clean Fit"
    ],
    "expectedItem": "沙色宽松西装",
    "matchedOffers": [
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-001",
        "price": 129,
        "similarityScore": 83,
        "note": "Urban 黑色短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-008",
        "price": 239,
        "similarityScore": 83,
        "note": "Urban 灰蓝工装外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-015",
        "price": 168,
        "similarityScore": 83,
        "note": "Urban 浅卡其短外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-022",
        "price": 299,
        "similarityScore": 83,
        "note": "Urban 象牙白系带风衣 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T20:00:00.000Z"
  },
  {
    "id": "request-bulk-014",
    "image": "/generated/seedream-bulk/requests/request-bulk-014.jpg",
    "description": "高街暗黑需求：想找一套和目标图接近的穿搭，重点是 黑色短夹克、白色内搭、黑色高腰长裤。",
    "budget": 249,
    "tags": [
      "高街暗黑",
      "短款夹克",
      "黑白灰"
    ],
    "expectedItem": "黑色短夹克",
    "matchedOffers": [
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-009",
        "price": 249,
        "similarityScore": 82,
        "note": "Daily 黑色飞行夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-016",
        "price": 189,
        "similarityScore": 82,
        "note": "Daily 灰蓝短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-023",
        "price": 129,
        "similarityScore": 82,
        "note": "Daily 浅卡其轻薄西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-030",
        "price": 239,
        "similarityScore": 82,
        "note": "Daily 雾蓝罗纹上衣 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T21:00:00.000Z"
  },
  {
    "id": "request-bulk-015",
    "image": "/generated/seedream-bulk/requests/request-bulk-015.jpg",
    "description": "美式复古需求：想找一套和目标图接近的穿搭，重点是 浅水洗牛仔外套、白T、深色直筒裤。",
    "budget": 199,
    "tags": [
      "美式复古",
      "水洗牛仔",
      "咖啡店穿搭"
    ],
    "expectedItem": "浅水洗牛仔外套",
    "matchedOffers": [
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-017",
        "price": 199,
        "similarityScore": 88,
        "note": "Loose Seoul 黑色系带风衣 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-024",
        "price": 139,
        "similarityScore": 88,
        "note": "Loose Seoul 灰蓝宽松西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-031",
        "price": 249,
        "similarityScore": 88,
        "note": "Loose Seoul 浅灰高领针织 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-vintage",
        "productId": "product-bulk-038",
        "price": 189,
        "similarityScore": 88,
        "note": "Loose Seoul 雾蓝开衫 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T22:00:00.000Z"
  },
  {
    "id": "request-bulk-016",
    "image": "/generated/seedream-bulk/requests/request-bulk-016.jpg",
    "description": "韩系宽松需求：想找一套和目标图接近的穿搭，重点是 象牙白针织、浅灰长裤、奶油色包袋。",
    "budget": 168,
    "tags": [
      "韩系宽松",
      "象牙针织",
      "松弛感"
    ],
    "expectedItem": "象牙白针织",
    "matchedOffers": [
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-004",
        "price": 168,
        "similarityScore": 87,
        "note": "Vintage 灰蓝飞行夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-011",
        "price": 299,
        "similarityScore": 87,
        "note": "Vintage 浅卡其短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-018",
        "price": 219,
        "similarityScore": 87,
        "note": "Vintage 象牙白轻薄西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-seoul",
        "productId": "product-bulk-025",
        "price": 159,
        "similarityScore": 87,
        "note": "Vintage 黑色通勤外套 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-01T23:00:00.000Z"
  },
  {
    "id": "request-bulk-017",
    "image": "/generated/seedream-bulk/requests/request-bulk-017.jpg",
    "description": "日系工装需求：想找一套和目标图接近的穿搭，重点是 工装马甲、白T、军绿直筒裤。",
    "budget": 129,
    "tags": [
      "日系工装",
      "工装马甲",
      "直筒裤"
    ],
    "expectedItem": "工装马甲",
    "matchedOffers": [
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-012",
        "price": 129,
        "similarityScore": 86,
        "note": "Maison 灰蓝棒球夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-019",
        "price": 239,
        "similarityScore": 86,
        "note": "Maison 浅卡其宽松西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-026",
        "price": 168,
        "similarityScore": 86,
        "note": "Maison 象牙白长风衣 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-japan",
        "productId": "product-bulk-033",
        "price": 299,
        "similarityScore": 86,
        "note": "Maison 橄榄绿开衫 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-02T00:00:00.000Z"
  },
  {
    "id": "request-bulk-018",
    "image": "/generated/seedream-bulk/requests/request-bulk-018.jpg",
    "description": "甜酷辣妹需求：想找一套和目标图接近的穿搭，重点是 短上衣、黑色外套、高腰长裤。",
    "budget": 249,
    "tags": [
      "甜酷辣妹",
      "短上衣",
      "高腰裤"
    ],
    "expectedItem": "短上衣",
    "matchedOffers": [
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-020",
        "price": 249,
        "similarityScore": 85,
        "note": "Studio 灰蓝通勤外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-027",
        "price": 189,
        "similarityScore": 85,
        "note": "Studio 浅灰宽松毛衣 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-034",
        "price": 129,
        "similarityScore": 85,
        "note": "Studio 雾蓝针织衫 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-sweet",
        "productId": "product-bulk-041",
        "price": 239,
        "similarityScore": 85,
        "note": "Studio 雾蓝基础打底 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-02T01:00:00.000Z"
  },
  {
    "id": "request-bulk-019",
    "image": "/generated/seedream-bulk/requests/request-bulk-019.jpg",
    "description": "通勤极简需求：想找一套和目标图接近的穿搭，重点是 沙色宽松西装、白色内搭、浅色阔腿裤。",
    "budget": 129,
    "tags": [
      "通勤极简",
      "沙色西装",
      "Clean Fit"
    ],
    "expectedItem": "沙色宽松西装",
    "matchedOffers": [
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-001",
        "price": 129,
        "similarityScore": 84,
        "note": "Urban 黑色短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-008",
        "price": 239,
        "similarityScore": 84,
        "note": "Urban 灰蓝工装外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-015",
        "price": 168,
        "similarityScore": 84,
        "note": "Urban 浅卡其短外套 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-clean",
        "productId": "product-bulk-022",
        "price": 299,
        "similarityScore": 84,
        "note": "Urban 象牙白系带风衣 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-02T02:00:00.000Z"
  },
  {
    "id": "request-bulk-020",
    "image": "/generated/seedream-bulk/requests/request-bulk-020.jpg",
    "description": "高街暗黑需求：想找一套和目标图接近的穿搭，重点是 黑色短夹克、白色内搭、黑色高腰长裤。",
    "budget": 249,
    "tags": [
      "高街暗黑",
      "短款夹克",
      "黑白灰"
    ],
    "expectedItem": "黑色短夹克",
    "matchedOffers": [
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-009",
        "price": 249,
        "similarityScore": 83,
        "note": "Daily 黑色飞行夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-016",
        "price": 189,
        "similarityScore": 83,
        "note": "Daily 灰蓝短夹克 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-023",
        "price": 129,
        "similarityScore": 83,
        "note": "Daily 浅卡其轻薄西装 很接近目标风格，适合直接成交。"
      },
      {
        "sellerId": "seller-dark",
        "productId": "product-bulk-030",
        "price": 239,
        "similarityScore": 83,
        "note": "Daily 雾蓝罗纹上衣 很接近目标风格，适合直接成交。"
      }
    ],
    "createdAt": "2026-05-02T03:00:00.000Z"
  }
] satisfies RequestPost[];
