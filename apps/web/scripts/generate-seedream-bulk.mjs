import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_ROOT = path.join(ROOT, "public", "generated", "seedream-bulk");
const POSTS_DIR = path.join(OUT_ROOT, "posts");
const PRODUCTS_DIR = path.join(OUT_ROOT, "products");
const REQUESTS_DIR = path.join(OUT_ROOT, "requests");
const MODEL = "doubao-seedream-5-0-260128";
const TOTAL_REQUESTS = 20;
const SKIP_API = process.env.SEEDREAM_SKIP_API === "1";

const CATEGORIES = {
  outerwear: "外套/夹克",
  suit: "西装/风衣",
  knit: "针织/毛衣",
  shirt: "衬衫/上衣",
  pants: "裤装",
  skirt: "半裙/长裙",
  vest: "马甲/背心",
  bag: "包袋/配饰",
};

const palette = [
  "黑色",
  "炭灰",
  "深咖",
  "米白",
  "象牙白",
  "沙色",
  "橄榄绿",
  "牛仔蓝",
  "浅卡其",
  "奶油白",
  "雾蓝",
  "复古棕",
  "灰蓝",
  "酒红",
  "浅灰",
  "奶茶色",
];

const materialMap = {
  outerwear: ["棉感尼龙", "挺括棉布", "微光泽尼龙", "牛津纺混纺", "复古做旧棉", "防风面料"],
  suit: ["TR 混纺", "垂感西装料", "轻薄风衣布", "羊毛混纺", "亚麻混纺"],
  knit: ["柔软针织混纺", "羊毛混纺", "细腻坑条针织", "亲肤棉线", "高弹罗纹针织"],
  shirt: ["棉府绸", "挺括牛津纺", "轻薄泡泡纱", "亚麻棉混纺"],
  pants: ["垂感西装料", "水洗牛仔", "棉麻混纺", "弹力斜纹布", "柔软西装布"],
  skirt: ["轻薄垂感面料", "仿醋酸", "棉麻混纺", "柔软雪纺", "高密度缎面"],
  vest: ["挺括斜纹布", "针织混纺", "棉感工装布", "亚麻混纺"],
  bag: ["头层牛皮", "压纹皮革", "帆布拼皮", "微光泽尼龙", "荔枝纹 PU"],
};

const styleClusters = [
  {
    key: "clean",
    label: "通勤极简",
    nameBase: ["Mika", "Luna", "Ari", "Mia", "Nora"],
    genre: "Clean Fit",
    persona:
      "同一位25到28岁中国女生，面部干净，深棕或黑色直发，妆容清淡，身材高挑或中高个，拍照克制、安静，擅长通勤极简和 Clean Fit。",
    scenes: ["办公楼外街边", "美术馆入口", "咖啡店门口", "地铁口", "玻璃幕墙街区"],
    palette: ["沙色", "米白", "象牙白", "浅灰", "橄榄绿"],
    postTemplates: [
      {
        title: "沙色西装真的很适合初夏通勤",
        body:
          "这套用低饱和沙色西装配白色内搭和顺色下装，整体看起来很干净，也不会有太强的办公室感，通勤和看展都能穿。",
        tags: ["通勤极简", "沙色西装", "Clean Fit"],
        outfit: "沙色宽松西装、白色内搭、浅色阔腿裤",
        productTypes: ["suit", "pants", "shirt"],
      },
      {
        title: "橄榄绿风衣比黑白灰更有记忆点",
        body:
          "橄榄绿风衣配浅色内搭和同色系裤子，整体是轻熟通勤感，颜色安静但比基础黑白更有画面。",
        tags: ["通勤极简", "橄榄风衣", "轻熟"],
        outfit: "橄榄绿系带风衣、浅灰内搭、直筒长裤",
        productTypes: ["suit", "pants", "shirt"],
      },
      {
        title: "看展穿沙色西装，干净但不会太正式",
        body:
          "沙色西装和浅色针织组合在一起很稳，适合看展、咖啡店和轻通勤，重点是轮廓干净，颜色不要太跳。",
        tags: ["Clean Fit", "沙色西装", "看展穿搭"],
        outfit: "沙色西装外套、象牙白针织、顺色长裤",
        productTypes: ["suit", "knit", "pants"],
      },
      {
        title: "象牙白针织，松弛感比纯白更柔和",
        body:
          "象牙白针织比纯白更温柔，和浅灰裤子放在一起不会割裂，拍出来会有一种很舒服的安静感。",
        tags: ["通勤极简", "象牙针织", "松弛感"],
        outfit: "象牙白针织、浅灰长裤、奶油色包袋",
        productTypes: ["knit", "pants", "bag"],
      },
      {
        title: "黑白配也可以很高级，关键是版型",
        body:
          "这套把黑色短夹克和白色内搭做了清晰分层，下装用高腰直筒裤拉长比例，适合喜欢极简但不想太沉闷的人。",
        tags: ["Clean Fit", "黑白灰", "短款夹克"],
        outfit: "黑色短夹克、白色内搭、高腰直筒裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
    ],
  },
  {
    key: "dark",
    label: "高街暗黑",
    nameBase: ["Nora", "Nova", "Rin", "Vivi", "Dora"],
    genre: "High Street Dark",
    persona:
      "同一位24到28岁中国女生，黑发或深棕发，轮廓感强，气质偏冷，身材修长，常拍城市夜景和街头感穿搭。",
    scenes: ["城市路口", "夜景街头", "停车场", "玻璃幕墙旁", "霓虹街边"],
    palette: ["黑色", "炭灰", "深咖", "酒红", "银灰"],
    postTemplates: [
      {
        title: "黑色短夹克 + 高腰裤，比例直接拉满",
        body:
          "短款黑夹克把上半身压得很利落，白色内搭负责留白，下装选高腰长裤，整套很有高街气质。",
        tags: ["高街暗黑", "短款夹克", "黑白灰"],
        outfit: "黑色短夹克、白色内搭、黑色高腰长裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
      {
        title: "黑色飞行夹克配灰西裤，暗黑但不沉闷",
        body:
          "黑色飞行夹克本身就很有街头感，换成灰色西裤后会柔一点，适合想穿暗黑但不想太重的人。",
        tags: ["高街暗黑", "飞行夹克", "灰西裤"],
        outfit: "黑色飞行夹克、灰色西裤、黑色短靴",
        productTypes: ["outerwear", "pants", "bag"],
      },
      {
        title: "夜里穿黑色最稳，重点是面料和层次",
        body:
          "同样是黑色，尼龙外套、针织内搭和直筒裤叠在一起会更有层次，街拍里也不会只剩一块黑。",
        tags: ["高街暗黑", "飞行夹克", "层次感"],
        outfit: "黑色尼龙外套、深色针织、黑色直筒裤",
        productTypes: ["outerwear", "knit", "pants"],
      },
      {
        title: "暗黑风也能很利落，不一定要很夸张",
        body:
          "这套把廓形控制得比较紧，整体是利落的高街暗黑路线，适合夜景街头和偏酷一点的日常。",
        tags: ["高街暗黑", "利落廓形", "夜景街拍"],
        outfit: "黑色廓形外套、深灰上衣、黑色长裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
      {
        title: "银灰配黑色，暗黑里加一点冷感",
        body:
          "银灰色内搭让黑外套看起来没那么闷，配黑色长裤还是很稳，但整个人会更有冷感。",
        tags: ["高街暗黑", "黑灰配色", "冷感"],
        outfit: "黑色外套、银灰内搭、黑色长裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
    ],
  },
  {
    key: "vintage",
    label: "美式复古",
    nameBase: ["Ryan", "Tom", "Elliot", "Kobe", "Jude"],
    genre: "Vintage American",
    persona:
      "同一位25到30岁中国男生，短黑发或微卷发，脸型清爽，身材修长，拍照随性，常在咖啡店和市集出现。",
    scenes: ["咖啡店门口", "街角便利店", "复古市集", "旧墙巷子", "黄昏停车位"],
    palette: ["牛仔蓝", "棕色", "米白", "黑色", "复古红"],
    postTemplates: [
      {
        title: "水洗牛仔外套，周末咖啡店随手拍都好看",
        body:
          "浅水洗牛仔外套配白T和深色裤子很稳定，复古感不会太用力，咖啡店门口一拍就很出片。",
        tags: ["美式复古", "水洗牛仔", "咖啡店穿搭"],
        outfit: "浅水洗牛仔外套、白T、深色直筒裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
      {
        title: "白T + 牛仔夹克，周末市集最省心",
        body:
          "这套几乎不用想搭配，牛仔外套和白T就是最省心的组合，配棕色皮带会更有复古味道。",
        tags: ["美式复古", "牛仔", "周末市集"],
        outfit: "牛仔夹克、白T、复古直筒裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
      {
        title: "做旧牛仔和浅色上衣放在一起很耐看",
        body:
          "复古牛仔的好处是很耐拍，搭浅色上衣和黑色裤子就已经很完整，不需要额外配太多元素。",
        tags: ["美式复古", "做旧牛仔", "层次穿搭"],
        outfit: "做旧牛仔外套、浅色上衣、黑色长裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
      {
        title: "复古风可以很日常，关键是颜色别太多",
        body:
          "这个 look 用牛仔蓝和深色裤子做主色，整体很日常，适合拍照也适合平时出门。",
        tags: ["美式复古", "牛仔蓝", "日常穿搭"],
        outfit: "牛仔外套、白色内搭、深蓝长裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
      {
        title: "咖啡色系配牛仔，复古味一下就出来了",
        body:
          "复古棕和牛仔蓝放在一起很有味道，简单一套就能拍出有生活感的周末OOTD。",
        tags: ["美式复古", "咖啡色系", "周末OOTD"],
        outfit: "牛仔夹克、咖啡色内搭、深色长裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
    ],
  },
  {
    key: "seoul",
    label: "韩系宽松",
    nameBase: ["Seo", "Mina", "Eun", "Haru", "Yuna"],
    genre: "Korean Loose",
    persona:
      "同一位23到27岁中国女生，黑长发微卷，妆容清淡，脸圆或偏柔和，身材娇小但比例好，拍照氛围安静。",
    scenes: ["浅色家居空间", "社区街道", "咖啡店窗边", "楼下小花园", "暖光室内"],
    palette: ["象牙白", "奶油白", "浅灰", "雾粉", "米色"],
    postTemplates: [
      {
        title: "象牙白针织，韩系松弛感不用太复杂",
        body:
          "宽松针织和浅色长裤放在一起很柔和，整套没有很强的攻击性，拍出来就会有韩系松弛感。",
        tags: ["韩系宽松", "象牙针织", "松弛感"],
        outfit: "象牙白针织、浅灰长裤、奶油色包袋",
        productTypes: ["knit", "pants", "bag"],
      },
      {
        title: "浅色系穿搭想温柔，就别选太冷的白",
        body:
          "象牙白比纯白更柔一点，和浅灰、米色搭起来不会割裂，很适合轻松的日常出门。",
        tags: ["韩系宽松", "象牙针织", "同色系"],
        outfit: "象牙白针织、米色长裤、浅色肩包",
        productTypes: ["knit", "pants", "bag"],
      },
      {
        title: "宽松针织和长裤真的很适合周末",
        body:
          "这类韩系宽松穿搭重点就是舒服，版型要松，颜色要软，整体看着就会特别安静。",
        tags: ["韩系宽松", "宽松针织", "周末穿搭"],
        outfit: "宽松针织、浅色直筒裤、米色鞋包",
        productTypes: ["knit", "pants", "bag"],
      },
      {
        title: "同色系叠穿比想象中更显高级",
        body:
          "米白和浅灰叠在一起没有压力，拍出来很自然，适合日常也适合轻松见朋友。",
        tags: ["韩系宽松", "同色系", "轻松感"],
        outfit: "米白针织、浅灰长裤、浅色手提包",
        productTypes: ["knit", "pants", "bag"],
      },
      {
        title: "韩系松弛感的关键是轮廓不要太硬",
        body:
          "柔软针织和宽松下装放在一起会更有韩系氛围，镜头里看起来也更舒服。",
        tags: ["韩系宽松", "柔和配色", "松弛感"],
        outfit: "柔软针织、奶白长裤、浅色包袋",
        productTypes: ["knit", "pants", "bag"],
      },
    ],
  },
  {
    key: "japanese",
    label: "日系工装",
    nameBase: ["Yuki", "Sora", "Riku", "Nao"],
    genre: "Japanese Workwear",
    persona:
      "同一位24到29岁中国女生或男生，短发或利落发型，偏中性气质，拍照干净，喜欢工装层次和功能感。",
    scenes: ["仓库风街区", "旧厂房外墙", "河堤边", "楼梯口", "路边停车区"],
    palette: ["卡其", "军绿", "炭灰", "棕色", "牛仔蓝"],
    postTemplates: [
      {
        title: "工装马甲配直筒裤，日系感很稳",
        body:
          "这套用工装马甲和直筒裤做层次，整体偏功能感，但不会太硬，很适合日系工装爱好者。",
        tags: ["日系工装", "工装马甲", "直筒裤"],
        outfit: "工装马甲、白T、军绿直筒裤",
        productTypes: ["vest", "shirt", "pants"],
      },
      {
        title: "卡其风衣一上身，日系感就出来了",
        body:
          "卡其风衣和深色长裤的组合很耐看，偏功能又很日常，适合秋冬和换季穿。",
        tags: ["日系工装", "卡其风衣", "功能感"],
        outfit: "卡其风衣、灰色上衣、深色长裤",
        productTypes: ["suit", "shirt", "pants"],
      },
      {
        title: "马甲叠穿的层次感，真的很日系",
        body:
          "工装马甲加衬衫是最稳的叠穿方式，版型利落，颜色也很统一，看着很清爽。",
        tags: ["日系工装", "层次穿搭", "马甲"],
        outfit: "工装马甲、浅色衬衫、棕色长裤",
        productTypes: ["vest", "shirt", "pants"],
      },
      {
        title: "牛仔工装配件一点，日常也能穿",
        body:
          "牛仔和工装配件放一起会很有生活感，街拍里看着自然，平时出门也不会太夸张。",
        tags: ["日系工装", "牛仔工装", "日常"],
        outfit: "牛仔上衣、工装长裤、帆布包",
        productTypes: ["outerwear", "pants", "bag"],
      },
      {
        title: "中性工装风，真的特别适合拍路边",
        body:
          "这一套把工装布料和宽松轮廓放到一起，整体看起来比较轻，街边拍照很出氛围。",
        tags: ["日系工装", "中性风", "宽松轮廓"],
        outfit: "工装外套、宽松衬衫、工装长裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
    ],
  },
  {
    key: "sweet",
    label: "甜酷辣妹",
    nameBase: ["Lily", "Zoe", "Poppy"],
    genre: "Sweet Cool",
    persona:
      "同一位22到26岁中国女生，妆容更精致，发型会卷一点，身材纤细或曲线感明显，气质甜里带酷，适合街拍。",
    scenes: ["街头转角", "咖啡店外", "商场门口", "夜色楼梯", "车库边"],
    palette: ["黑色", "粉色", "酒红", "银色", "奶白"],
    postTemplates: [
      {
        title: "甜酷风最稳的还是短上衣配长裤",
        body:
          "短上衣和高腰长裤一搭，比例会很好，配黑色外套之后就有一点甜酷辣妹的味道。",
        tags: ["甜酷辣妹", "短上衣", "高腰裤"],
        outfit: "短上衣、黑色外套、高腰长裤",
        productTypes: ["shirt", "outerwear", "pants"],
      },
      {
        title: "黑粉配色真的很容易出片",
        body:
          "黑色和粉色放在一起会很有张力，既有甜感又不会太软，街头拍照很亮眼。",
        tags: ["甜酷辣妹", "黑粉配色", "出片"],
        outfit: "黑色上衣、粉色短外套、黑色长裤",
        productTypes: ["shirt", "outerwear", "pants"],
      },
      {
        title: "短外套 + 修身下装，甜酷感就够了",
        body:
          "这套靠版型撑气质，短外套把上半身收住，下面用修身裤拉出线条，简单但有效。",
        tags: ["甜酷辣妹", "短外套", "修身裤"],
        outfit: "短外套、修身上衣、黑色长裤",
        productTypes: ["outerwear", "shirt", "pants"],
      },
      {
        title: "如果想要一点辣，就把颜色压暗",
        body:
          "酒红和黑色的组合会更成熟一点，但还是能保留甜酷味，适合夜景或者商场门口。",
        tags: ["甜酷辣妹", "酒红", "夜景"],
        outfit: "酒红短上衣、黑色外套、黑色长裤",
        productTypes: ["shirt", "outerwear", "pants"],
      },
      {
        title: "亮一点的包袋能把整套提起来",
        body:
          "甜酷穿搭里包袋是加分项，黑色套装配一点银色或者亮面配件，照片会更有记忆点。",
        tags: ["甜酷辣妹", "亮面配件", "街拍"],
        outfit: "黑色外套、黑色长裤、银色包袋",
        productTypes: ["outerwear", "pants", "bag"],
      },
    ],
  },
  {
    key: "french",
    label: "法式松弛",
    nameBase: ["Claire", "Emma", "Noa"],
    genre: "French Ease",
    persona:
      "同一位25到30岁中国女生，长发或卷发，气质轻熟温柔，脸型柔和，镜头感自然，喜欢轻松但有质感的穿搭。",
    scenes: ["咖啡馆外摆", "街边花店", "看展入口", "午后窗边", "石板路街角"],
    palette: ["奶油白", "浅咖", "雾蓝", "燕麦色", "酒红"],
    postTemplates: [
      {
        title: "法式松弛感，靠的是颜色和垂感",
        body:
          "浅咖外套配奶油白内搭和垂感长裤，整套很轻松，拍照的时候也会显得很自然。",
        tags: ["法式松弛", "轻熟", "垂感"],
        outfit: "浅咖外套、奶油白内搭、垂感长裤",
        productTypes: ["suit", "shirt", "pants"],
      },
      {
        title: "看展穿浅咖西装，会比黑色柔很多",
        body:
          "浅咖色西装会比黑色更柔，和白色上衣一起穿会很有法式的干净感。",
        tags: ["法式松弛", "浅咖西装", "看展"],
        outfit: "浅咖西装、白色上衣、浅色长裤",
        productTypes: ["suit", "shirt", "pants"],
      },
      {
        title: "轻熟感不是成熟，是看起来不费力",
        body:
          "这套主要靠顺色和宽松版型，简单但有层次，适合咖啡店和日常出门。",
        tags: ["法式松弛", "轻熟", "顺色"],
        outfit: "奶油白上衣、浅咖长裤、雾蓝外套",
        productTypes: ["shirt", "pants", "outerwear"],
      },
      {
        title: "一件好看的风衣就够了",
        body:
          "风衣的垂感会把整个人的气质拉得很柔，搭浅色内搭就已经很完整。",
        tags: ["法式松弛", "风衣", "气质感"],
        outfit: "浅色风衣、白色上衣、直筒长裤",
        productTypes: ["suit", "shirt", "pants"],
      },
      {
        title: "奶油白和浅咖，真的很适合拍照",
        body:
          "低对比度配色会让照片看起来很安静，适合喜欢松弛感和轻熟感的人。",
        tags: ["法式松弛", "奶油白", "拍照感"],
        outfit: "奶油白上衣、浅咖长裤、浅色包袋",
        productTypes: ["shirt", "pants", "bag"],
      },
    ],
  },
];

const personByCluster = {
  clean: { gender: "女生", age: "25到28岁", hair: "深棕直发或中分长直发", face: "轮廓清爽", makeup: "清淡底妆", body: "高挑或中高个", scene: "办公楼外和美术馆", color: "沙色、米白、橄榄绿" },
  dark: { gender: "女生", age: "24到28岁", hair: "黑发中长直发", face: "冷感轮廓", makeup: "干净哑光妆", body: "修长", scene: "夜景街头和城市路面", color: "黑灰银" },
  vintage: { gender: "男生", age: "25到30岁", hair: "黑短发或微卷发", face: "清爽脸型", makeup: "自然肤感", body: "修长", scene: "咖啡店和市集", color: "牛仔蓝和棕色" },
  seoul: { gender: "女生", age: "23到27岁", hair: "黑长发微卷", face: "柔和圆脸", makeup: "清淡奶杏妆", body: "娇小但比例好", scene: "家居空间和社区街道", color: "象牙白和奶油白" },
  japanese: { gender: "女生", age: "24到29岁", hair: "短发或中短发", face: "中性柔和", makeup: "自然清透", body: "偏中性利落", scene: "仓库风街区", color: "卡其、军绿、炭灰" },
  sweet: { gender: "女生", age: "22到26岁", hair: "卷发或长卷发", face: "甜感明显", makeup: "精致唇妆", body: "纤细或曲线感", scene: "商场门口和夜景楼梯", color: "黑粉和酒红" },
  french: { gender: "女生", age: "25到30岁", hair: "长发或慵懒卷发", face: "温柔轻熟", makeup: "低饱和裸妆", body: "自然匀称", scene: "咖啡馆和花店", color: "奶油白和浅咖" },
};

const sellers = [
  { id: "seller-clean", name: "Daily Lab", avatar: "DL", styleFocus: "通勤极简" },
  { id: "seller-dark", name: "Urban Seller", avatar: "US", styleFocus: "高街暗黑" },
  { id: "seller-vintage", name: "Vintage Room", avatar: "VR", styleFocus: "美式复古" },
  { id: "seller-seoul", name: "Loose Seoul", avatar: "LS", styleFocus: "韩系宽松" },
  { id: "seller-japan", name: "Workwear Club", avatar: "WC", styleFocus: "日系工装" },
  { id: "seller-sweet", name: "Sweet Edge", avatar: "SE", styleFocus: "甜酷辣妹" },
  { id: "seller-french", name: "Maison Ease", avatar: "ME", styleFocus: "法式松弛" },
];

function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  return fs.readFile(envPath, "utf8").then((env) => {
    for (const line of env.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...parts] = trimmed.split("=");
      if (!process.env[key]) {
        process.env[key] = parts.join("=").replace(/^['"]|['"]$/g, "");
      }
    }
  });
}

function normalizeB64(raw) {
  return raw.includes(",") ? raw.split(",").pop() : raw;
}

function buildSizeGuide(sizes) {
  return sizes.map((size, index) => ({
    size,
    shoulder: `${42 + index * 2}cm`,
    chest: `${104 + index * 6}cm`,
    length: `${62 + index * 2}cm`,
  }));
}

function pick(array, index) {
  return array[index % array.length];
}

function unique(array) {
  return [...new Map(array.map((item) => [item, item])).values()];
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function saveImage(dir, id, rawB64) {
  const fileName = `${id}.jpg`;
  const filePath = path.join(dir, fileName);
  await fs.writeFile(filePath, Buffer.from(normalizeB64(rawB64), "base64"));
  return `/generated/seedream-bulk/${path.basename(dir)}/${fileName}`;
}

async function generateSeedreamBatch({ id, prompt, maxImages = 1, seed }) {
  const apiKey =
    process.env.SEEDREAM_API_KEY ??
    process.env.DOUBAO_API_KEY ??
    process.env.AI_302_API_KEY;
  const baseUrl = process.env.SEEDREAM_API_BASE_URL ?? "https://api.302.ai";

  if (!apiKey) {
    throw new Error("Missing SEEDREAM_API_KEY");
  }

  const response = await Promise.race([
    fetch(`${baseUrl.replace(/\/$/, "")}/doubao/images/generations`, {
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
    }),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Seedream timeout for ${id}`)), 120_000);
    }),
  ]);

  const payload = await response.json();
  if (!response.ok || payload.error) {
    throw new Error(payload.error?.message ?? `Seedream failed: ${response.status}`);
  }

  const items = payload.data ?? [];
  const encoded = items.map((item) => item.b64_json).filter(Boolean);
  if (!encoded.length) {
    throw new Error(`Seedream returned no image for ${id}`);
  }
  return encoded;
}

async function generateAdaptiveBatch({ items, idPrefix, seed, promptBuilder, dir }) {
  const outputs = [];

  async function runChunk(chunk, chunkSeed, chunkId) {
    console.log(`Generating ${chunkId} (${chunk.length})`);
    try {
      const images = await generateSeedreamBatch({
        id: chunkId,
        prompt: promptBuilder(chunk),
        maxImages: chunk.length,
        seed: chunkSeed,
      });

      if (images.length < chunk.length) {
        throw new Error(`Seedream returned ${images.length}/${chunk.length} images`);
      }

      for (let index = 0; index < chunk.length; index += 1) {
        const item = chunk[index];
        const publicPath = await saveImage(dir, item.id, images[index]);
        outputs.push({ id: item.id, path: publicPath, prompt: item.prompt });
        console.log(`Saved ${item.id}`);
      }
    } catch (error) {
      if (chunk.length === 1) {
        throw error;
      }

      const mid = Math.ceil(chunk.length / 2);
      await runChunk(chunk.slice(0, mid), chunkSeed, `${chunkId}-a`);
      await runChunk(chunk.slice(mid), chunkSeed + mid, `${chunkId}-b`);
    }
  }

  await runChunk(items, seed, idPrefix);
  return outputs;
}

function buildBloggers() {
  const bloggers = [];

  styleClusters.forEach((cluster, clusterIndex) => {
    const count = cluster.key === "clean" || cluster.key === "dark" || cluster.key === "vintage" || cluster.key === "seoul" ? 5 : cluster.key === "japanese" ? 4 : 3;
    for (let i = 0; i < count; i += 1) {
      const index = bloggers.length + 1;
      const person = personByCluster[cluster.key];
      const nameRoot = pick(cluster.nameBase, i);
      bloggers.push({
        id: `blogger-${String(index).padStart(3, "0")}`,
        name: `${nameRoot} ${cluster.label}`,
        avatar: `${cluster.nameBase[0][0]}${cluster.label[0]}`,
        bio: `${cluster.label}日常`,
        followerCount: 1200 + clusterIndex * 5400 + i * 480,
        styleTags: unique([cluster.label, cluster.genre, ...cluster.postTemplates[0].tags]).slice(0, 5),
        coverImage: "",
        clusterKey: cluster.key,
        persona: person,
      });
    }
  });

  return bloggers;
}

function buildProducts() {
  const productDefs = [];
  const categoryCounts = [
    ["outerwear", 16],
    ["suit", 10],
    ["knit", 12],
    ["shirt", 10],
    ["pants", 12],
    ["skirt", 8],
    ["vest", 6],
    ["bag", 6],
  ];

  let globalIndex = 0;
  for (const [category, count] of categoryCounts) {
    for (let i = 0; i < count; i += 1) {
      const styleCluster = styleClusters[globalIndex % styleClusters.length];
      const color = palette[(globalIndex * 3 + i) % palette.length];
      const material = pick(materialMap[category], i + globalIndex);
      const sellerId = sellers[globalIndex % sellers.length].id;
      const categoryLabel = CATEGORIES[category];
      const name = `${pick(["Urban", "Daily", "Loose Seoul", "Vintage", "Maison", "Studio", "North"], globalIndex)} ${color}${pick(
        {
          outerwear: ["短夹克", "飞行夹克", "棒球夹克", "短外套", "工装外套"],
          suit: ["宽松西装", "系带风衣", "通勤外套", "轻薄西装", "长风衣"],
          knit: ["针织衫", "宽松毛衣", "罗纹上衣", "开衫", "高领针织"],
          shirt: ["衬衫", "长袖上衣", "基础打底", "泡泡袖上衣", "挺括衬衣"],
          pants: ["阔腿裤", "直筒裤", "工装裤", "牛仔裤", "西裤"],
          skirt: ["半裙", "长裙", "百褶裙", "缎面裙", "A 字裙"],
          vest: ["马甲", "工装背心", "针织背心", "层次马甲"],
          bag: ["托特包", "腋下包", "单肩包", "手提包", "斜挎包"],
        }[category],
        i + globalIndex,
      )}`;
      productDefs.push({
        id: `product-bulk-${String(globalIndex + 1).padStart(3, "0")}`,
        sellerId,
        category,
        categoryLabel,
        color,
        name,
        price: [129, 139, 159, 168, 189, 199, 219, 239, 249, 279, 299][globalIndex % 11],
        stock: 3 + (globalIndex % 7),
        sizes: category === "bag" ? ["单一尺寸"] : category === "pants" || category === "skirt" ? ["S", "M", "L"] : ["M", "L", "XL"],
        sizeGuide: category === "bag" ? [] : buildSizeGuide(category === "pants" || category === "skirt" ? ["S", "M", "L"] : ["M", "L", "XL"]),
        material,
        care:
          category === "bag"
            ? "避免暴晒和过度挤压，表面污渍用软布轻擦。"
            : `建议低温洗涤，${category === "knit" ? "平铺晾干" : "悬挂晾干"}。`,
        tags: unique([styleCluster.label, styleCluster.genre, color, categoryLabel]).slice(0, 4),
        promptStyle: styleCluster.key,
      });
      globalIndex += 1;
    }
  }

  return productDefs;
}

function buildPostPlans(bloggers, products) {
  const posts = [];
  const postsByBlogger = new Map();
  const productsByStyle = new Map();
  let nextPostIndex = 1;

  for (const product of products) {
    if (!productsByStyle.has(product.promptStyle)) {
      productsByStyle.set(product.promptStyle, []);
    }
    productsByStyle.get(product.promptStyle).push(product);
  }

  bloggers.forEach((blogger, bloggerIndex) => {
    const cluster = styleClusters.find((item) => item.key === blogger.clusterKey);
    const pool = productsByStyle.get(blogger.clusterKey) ?? products;
    const blogPosts = [];

    for (let i = 0; i < 5; i += 1) {
      const template = cluster.postTemplates[i % cluster.postTemplates.length];
      const productIds = template.productTypes.map((type, typeIndex) => {
        const product = pool.find((item, poolIndex) => item.category === type && (poolIndex + i + bloggerIndex + typeIndex) % 3 === 0) ??
          pool.find((item) => item.category === type) ??
          products[(bloggerIndex * 5 + i + typeIndex) % products.length];
        return product.id;
      });
      const uniqueProductIds = unique(productIds).slice(0, 3);
      const postId = `post-bulk-${String(nextPostIndex).padStart(3, "0")}`;
      nextPostIndex += 1;
      const mainProduct = products.find((item) => item.id === uniqueProductIds[0]) ?? products[(bloggerIndex * 5 + i) % products.length];
      blogPosts.push({
        id: postId,
        type: "seller-look",
        sellerId: mainProduct.sellerId,
        bloggerId: blogger.id,
        productId: mainProduct.id,
        productIds: uniqueProductIds,
        productTags: [],
        title: template.title,
        body: template.body,
        styleTags: template.tags,
        likes: 120 + bloggerIndex * 10 + i * 14,
        createdAt: new Date(Date.UTC(2026, 4, 1, 10 - bloggerIndex, 30 - i * 6)).toISOString(),
        priceLabel: `¥${mainProduct.price} 起`,
        coverPrompt: "",
        template,
        clusterKey: blogger.clusterKey,
      });
    }

    postsByBlogger.set(blogger.id, blogPosts);
    posts.push(...blogPosts);
  });

  return { posts, postsByBlogger, productsByStyle };
}

function buildRequests(products) {
  const clusters = styleClusters.slice(0, 6);
  const requests = [];
  for (let i = 0; i < TOTAL_REQUESTS; i += 1) {
    const cluster = clusters[i % clusters.length];
    const related = products.filter((item) => item.promptStyle === cluster.key);
    const selected = related.slice(i % 3, i % 3 + 4).map((item) => ({
      sellerId: item.sellerId,
      productId: item.id,
      price: item.price,
      similarityScore: 88 - (i % 7),
      note: `${item.name} 很接近目标风格，适合直接成交。`,
    }));
    const product = selected[0] ? products.find((item) => item.id === selected[0].productId) : products[i % products.length];
    requests.push({
      id: `request-bulk-${String(i + 1).padStart(3, "0")}`,
      image: "",
      description: `${cluster.label}需求：想找一套和目标图接近的穿搭，重点是 ${cluster.postTemplates[0].outfit}。`,
      budget: product?.price ?? 199,
      tags: cluster.postTemplates[0].tags,
      expectedItem: cluster.postTemplates[0].outfit.split("、")[0],
      matchedOffers: selected.slice(0, 4),
      createdAt: new Date(Date.UTC(2026, 4, 1, 8 + i, 0)).toISOString(),
      promptStyle: cluster.key,
      prompt: `${cluster.label}求助帖参考图，亚洲博主街拍氛围，突出 ${cluster.postTemplates[0].outfit} 的风格表达，真实摄影感，适合用作求助参考图。`,
    });
  }
  return requests;
}

function postPrompt(blogger, blogPosts) {
  const person = blogger.persona;
  const cluster = styleClusters.find((item) => item.key === blogger.clusterKey) ?? styleClusters[0];
  const lines = [
    `生成${blogPosts.length}张互相关联的小红书穿搭封面图，全部是竖版真实摄影。`,
    `人物一致性：同一位亚洲${person.gender}，${person.age}，${person.hair}，${person.face}，${person.makeup}，${person.body}，${person.scene}，主风格色系是${person.color}。所有图必须保持同一个人物主体，仅更换穿搭与场景。`,
    `要求：每张图都要像真实小红书 OOTD，完整身体构图，穿搭清楚，背景自然，不能拼图，不能有文字水印，不能有品牌 logo，不能有夸张 AI 感。`,
  ];

  blogPosts.forEach((post, index) => {
    lines.push(`第${index + 1}张：${post.template.outfit}，标题方向：${post.title}，风格标签：${post.styleTags.join(" / ")}，场景：${pick(cluster.scenes, index)}。`);
  });

  lines.push("禁止：欧美脸、模糊手脚、畸形肢体、过曝、卡通感、商品穿模。");
  return lines.join("\n");
}

function productPrompt(batch) {
  const lines = [
    `生成10张商品平铺图，全部是单件服装电商图，纯净浅灰或米白背景，正面平铺，高清自然光，无模特，无人物，无品牌 logo，无文字。`,
    `这10张图需要分别对应以下商品：`,
  ];

  batch.forEach((product, index) => {
    lines.push(
      `${index + 1}. ${product.name}，类别：${product.categoryLabel}，颜色：${product.color}，材质：${product.material}，重点展示版型与细节，适合电商平铺图。`,
    );
  });
  return lines.join("\n");
}

function requestPrompt(requestsBatch) {
  const lines = [
    `生成5张求助/征集帖参考图，都是小红书风格穿搭目标图，竖版真实摄影。`,
    `要求：亚裔人像，场景自然，适合用户发征集帖时使用，图片里不要出现价格、文字水印或品牌 logo。`,
  ];
  requestsBatch.forEach((request, index) => {
    lines.push(`${index + 1}. 目标：${request.expectedItem}，风格：${request.tags.join(" / ")}，描述：${request.description}`);
  });
  return lines.join("\n");
}

function buildPostTags(productIds, products) {
  return productIds.map((productId, index) => {
    const product = products.find((item) => item.id === productId);
    const label = product ? product.name.replace(/^.*? /, "") : "同款商品";
    return {
      productId,
      label: index === 0 ? label : `${label}`,
      x: index === 0 ? 52 : index === 1 ? 39 : 67,
      y: index === 0 ? 42 : index === 1 ? 64 : 58,
    };
  });
}

function serializeTs(value) {
  return JSON.stringify(value, null, 2);
}

function chunkArray(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

async function publicFileExists(relPath) {
  try {
    await fs.access(path.join(ROOT, "public", relPath.replace(/^\/+/, "")));
    return true;
  } catch {
    return false;
  }
}

async function copyPublicFile(sourceRel, targetRel) {
  const sourceAbs = path.join(ROOT, "public", sourceRel.replace(/^\/+/, ""));
  const targetAbs = path.join(ROOT, "public", targetRel.replace(/^\/+/, ""));
  await fs.mkdir(path.dirname(targetAbs), { recursive: true });
  await fs.copyFile(sourceAbs, targetAbs);
}

function fallbackPostImageForCluster(clusterKey) {
  const map = {
    clean: "/generated/seedream-v1/post-clean-commute.jpg",
    dark: "/generated/seedream-v1/post-urban-black.jpg",
    vintage: "/generated/seedream-v1/post-vintage-leather.jpg",
    seoul: "/generated/seedream-v1/post-loose-seoul.jpg",
    japanese: "/generated/seedream-v1/post-olive-trench.jpg",
    sweet: "/generated/seedream-v1/post-bomber-night.jpg",
    french: "/generated/seedream-v1/post-sand-gallery.jpg",
  };
  return map[clusterKey] ?? "/generated/seedream-v1/post-clean-commute.jpg";
}

function fallbackProductImage(index) {
  const pool = [
    "/generated/seedream-v1/product-jacket-black.jpg",
    "/generated/seedream-v1/product-blazer-sand.jpg",
    "/generated/seedream-v1/product-denim-wash.jpg",
    "/generated/seedream-v1/product-knit-ivory.jpg",
    "/generated/seedream-v1/product-trench-olive.jpg",
    "/generated/seedream-v1/product-bomber-noir.jpg",
  ];
  return pool[index % pool.length];
}

function fallbackRequestImage(index) {
  const pool = [
    "/generated/seedream-bulk/posts/post-bulk-001.jpg",
    "/generated/seedream-bulk/posts/post-bulk-002.jpg",
    "/generated/seedream-bulk/posts/post-bulk-003.jpg",
    "/generated/seedream-bulk/posts/post-bulk-004.jpg",
    "/generated/seedream-bulk/posts/post-bulk-005.jpg",
    "/generated/seedream-bulk/posts/post-bulk-006.jpg",
    "/generated/seedream-bulk/posts/post-bulk-007.jpg",
    "/generated/seedream-bulk/posts/post-bulk-008.jpg",
    "/generated/seedream-bulk/posts/post-bulk-009.jpg",
    "/generated/seedream-bulk/posts/post-bulk-010.jpg",
    "/generated/seedream-bulk/posts/post-bulk-011.jpg",
    "/generated/seedream-bulk/posts/post-bulk-012.jpg",
    "/generated/seedream-bulk/posts/post-bulk-013.jpg",
    "/generated/seedream-bulk/posts/post-bulk-014.jpg",
    "/generated/seedream-v1/post-clean-commute.jpg",
    "/generated/seedream-v1/post-urban-black.jpg",
  ];
  return pool[index % pool.length];
}

async function main() {
  await loadEnv();
  await ensureDir(POSTS_DIR);
  await ensureDir(PRODUCTS_DIR);
  await ensureDir(REQUESTS_DIR);

  const bloggers = buildBloggers();
  const products = buildProducts();
  const { posts, postsByBlogger } = buildPostPlans(bloggers, products);
  const requests = buildRequests(products);
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalImages: 0,
    posts: [],
    products: [],
    requests: [],
  };

  if (!SKIP_API) {
    const bloggerGroups = chunkArray(bloggers, 3);
    for (let groupIndex = 0; groupIndex < bloggerGroups.length; groupIndex += 1) {
      const group = bloggerGroups[groupIndex];
      const groupPosts = group.flatMap((blogger) => postsByBlogger.get(blogger.id) ?? []);
      const batchResults = await generateAdaptiveBatch({
        items: groupPosts.map((post) => ({
          id: post.id,
          prompt: `${post.title} | ${post.body} | ${post.template.outfit}`,
        })),
        idPrefix: `blogger-group-${groupIndex + 1}`,
        promptBuilder: (chunk) => {
          const chunkMap = new Map(chunk.map((item) => [item.id, item]));
          const lines = [
            `生成${chunk.length}张互相关联的小红书穿搭封面图，全部是竖版真实摄影。`,
            `人物一致性：以下 3 位博主各自保持同一个人物主体、脸型、发型和身材比例不变，仅更换穿搭和场景。`,
          ];
          for (const blogger of group) {
            const blogPosts = (postsByBlogger.get(blogger.id) ?? []).filter((post) => chunkMap.has(post.id));
            if (!blogPosts.length) continue;
            const promptBlock = postPrompt(blogger, blogPosts);
            lines.push(`博主 ${blogger.id} / ${blogger.name}`);
            lines.push(promptBlock);
          }
          lines.push("禁止：欧美脸、模糊手脚、畸形肢体、过曝、卡通感、商品穿模。");
          return lines.join("\n");
        },
        seed: 1000 + groupIndex * 37,
        dir: POSTS_DIR,
      });

      for (const result of batchResults) {
        const post = posts.find((item) => item.id === result.id);
        const blogger = bloggers.find((item) => item.id === post?.bloggerId);
        if (!post || !blogger) {
          continue;
        }
        post.coverImage = result.path;
        post.images = [result.path];
        post.productTags = buildPostTags(post.productIds, products);
        blogger.coverImage = blogger.coverImage || result.path;
        manifest.posts.push({
          id: post.id,
          path: result.path,
          bloggerId: blogger.id,
          prompt: result.prompt,
        });
      }
    }

    const productBatches = [];
    for (let i = 0; i < products.length; i += 10) {
      productBatches.push(products.slice(i, i + 10));
    }

    for (const batch of productBatches) {
      const productGroups = chunkArray(batch, 5);

      for (let groupIndex = 0; groupIndex < productGroups.length; groupIndex += 1) {
        const group = productGroups[groupIndex];
        const batchResults = await generateAdaptiveBatch({
          items: group.map((product) => ({
            id: product.id,
            prompt: `${product.name} | ${product.categoryLabel} | ${product.material}`,
          })),
          idPrefix: `${group[0].id}-batch-${groupIndex + 1}`,
          promptBuilder: () => productPrompt(group),
          seed: 3000 + Number(group[0].id.split("-").pop()) * 10 + groupIndex,
          dir: PRODUCTS_DIR,
        });

        for (const result of batchResults) {
          const product = products.find((item) => item.id === result.id);
          if (!product) {
            continue;
          }
          product.image = result.path;
          product.detailImages = [result.path];
          product.tryOnPreset = result.path;
          manifest.products.push({
            id: result.id,
            path: result.path,
            prompt: result.prompt,
          });
        }
      }
    }

    const requestBatches = [];
    for (let i = 0; i < requests.length; i += 5) {
      requestBatches.push(requests.slice(i, i + 5));
    }

    for (const batch of requestBatches) {
      const requestGroups = chunkArray(batch, 5);

      for (let groupIndex = 0; groupIndex < requestGroups.length; groupIndex += 1) {
        const group = requestGroups[groupIndex];
        const batchResults = await generateAdaptiveBatch({
          items: group.map((request) => ({
            id: request.id,
            prompt: request.prompt,
          })),
          idPrefix: `${group[0].id}-batch-${groupIndex + 1}`,
          promptBuilder: () => requestPrompt(group),
          seed: 5000 + Number(group[0].id.split("-").pop()) * 10 + groupIndex,
          dir: REQUESTS_DIR,
        });

        for (const result of batchResults) {
          const request = requests.find((item) => item.id === result.id);
          if (!request) {
            continue;
          }
          request.image = result.path;
          manifest.requests.push({
            id: result.id,
            path: result.path,
            prompt: result.prompt,
          });
        }
      }
    }
  } else {
    for (const blogger of bloggers) {
      const blogPosts = postsByBlogger.get(blogger.id) ?? [];
      for (const post of blogPosts) {
        const relPath = `/generated/seedream-bulk/posts/${post.id}.jpg`;
        const finalPath = (await publicFileExists(relPath)) ? relPath : fallbackPostImageForCluster(blogger.clusterKey);
        post.coverImage = finalPath;
        post.images = [finalPath];
        post.productTags = buildPostTags(post.productIds, products);
        blogger.coverImage = blogger.coverImage || finalPath;
        manifest.posts.push({
          id: post.id,
          path: finalPath,
          bloggerId: blogger.id,
          prompt: `${post.title} | ${post.body} | ${post.template.outfit}`,
        });
      }
    }

    for (const [index, product] of products.entries()) {
      const relPath = `/generated/seedream-bulk/products/${product.id}.jpg`;
      const fallbackPath = fallbackProductImage(index);
      const finalPath = (await publicFileExists(relPath)) ? relPath : relPath;
      if (!(await publicFileExists(relPath))) {
        await copyPublicFile(fallbackPath, relPath);
      }
      product.image = finalPath;
      product.detailImages = [finalPath];
      product.tryOnPreset = finalPath;
      manifest.products.push({
        id: product.id,
        path: finalPath,
        prompt: `${product.name} | ${product.categoryLabel} | ${product.material}`,
      });
    }

    for (const [index, request] of requests.entries()) {
      const sourcePath = fallbackRequestImage(index);
      const finalPath = `/generated/seedream-bulk/requests/${request.id}.jpg`;
      await copyPublicFile(sourcePath, finalPath);
      request.image = finalPath;
      manifest.requests.push({
        id: request.id,
        path: finalPath,
        prompt: request.prompt,
      });
    }
  }

  for (const product of products) {
    const anchors = posts
      .filter((post) => post.productIds.includes(product.id))
      .map((post) => post.id);
    product.sourcePostIds = unique(anchors).slice(0, 3);
    const anchorPost = posts.find((post) => post.productIds.includes(product.id));
    if (anchorPost) {
      product.similarityReason = `${product.name} 对应 ${anchorPost.title} 的穿搭逻辑，版型和色系都一致。`;
    } else {
      product.similarityReason = `${product.name} 与同风格帖子高度匹配，适合继续试穿。`;
    }
    product.similarityScore = 82 + (product.price % 15);
  }

  for (const request of requests) {
    const offers = request.matchedOffers.map((offer) => ({
      sellerId: offer.sellerId,
      productId: offer.productId,
      price: offer.price,
      similarityScore: offer.similarityScore,
      note: offer.note,
    }));
    request.matchedOffers = offers;
  }

  const bloggerObjects = bloggers.map((blogger) => ({
    id: blogger.id,
    name: blogger.name,
    avatar: blogger.avatar,
    bio: blogger.bio,
    followerCount: blogger.followerCount,
    styleTags: blogger.styleTags,
    coverImage: blogger.coverImage,
  }));

  const productObjects = products.map((product) => ({
    id: product.id,
    sellerId: product.sellerId,
    name: product.name,
    price: product.price,
    stock: product.stock,
    sizes: product.sizes,
    sizeGuide: product.sizeGuide,
    material: product.material,
    care: product.care,
    tags: product.tags,
    image: product.image,
    detailImages: product.detailImages,
    similarityScore: product.similarityScore,
    similarityReason: product.similarityReason,
    tryOnPreset: product.tryOnPreset,
    sourcePostIds: product.sourcePostIds,
  }));

  const postObjects = posts.map((post) => ({
    id: post.id,
    type: "seller-look",
    sellerId: post.sellerId,
    bloggerId: post.bloggerId,
    productId: post.productId,
    productIds: post.productIds,
    productTags: post.productTags,
    title: post.title,
    body: post.body,
    coverImage: post.coverImage,
    images: post.images,
    styleTags: post.styleTags,
    likes: post.likes,
    createdAt: post.createdAt,
    priceLabel: post.priceLabel,
  }));

  const requestObjects = requests.map((request) => ({
    id: request.id,
    image: request.image,
    description: request.description,
    budget: request.budget,
    tags: request.tags,
    expectedItem: request.expectedItem,
    matchedOffers: request.matchedOffers,
    createdAt: request.createdAt,
  }));

  const tsFile = `import type { Blogger, Post, Product, RequestPost } from \"@/lib/types\";\n\nexport const generatedBloggers = ${serializeTs(bloggerObjects)} satisfies Blogger[];\n\nexport const generatedProducts = ${serializeTs(productObjects)} satisfies Product[];\n\nexport const generatedPosts = ${serializeTs(postObjects)} satisfies Post[];\n\nexport const generatedRequests = ${serializeTs(requestObjects)} satisfies RequestPost[];\n`;

  await fs.writeFile(path.join(ROOT, "src", "lib", "generated-mock-market.ts"), tsFile);
  await fs.writeFile(path.join(OUT_ROOT, "manifest.json"), `${JSON.stringify({ ...manifest, totalImages: manifest.posts.length + manifest.products.length + manifest.requests.length }, null, 2)}\n`);

  console.log(`Generated bloggers: ${bloggerObjects.length}`);
  console.log(`Generated products: ${productObjects.length}`);
  console.log(`Generated posts: ${postObjects.length}`);
  console.log(`Generated requests: ${requestObjects.length}`);
  console.log(`Images: ${manifest.posts.length + manifest.products.length + manifest.requests.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
