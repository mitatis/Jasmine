# Jasmine 项目说明

本文档记录当前 demo 的项目结构、业务逻辑和工程化注意事项，供后续把 demo 转成正式工程项目时使用。内容基于 2026-05-12 对当前项目目录的通读。

## 项目定位

Jasmine 当前是一个中文穿搭社区与交易市场 demo，页面标题为“穿搭市集”。它把以下流程串成一个本地可交互闭环：

- 用户在社区浏览穿搭帖子、买家征集帖、热门风格和趋势。
- 从帖子图片上的商品标签进入商品详情，查看相似度、尺码、材质、库存，并模拟购买。
- 用户粘贴小红书链接进行风格分析，系统匹配商品；不满意时发布征集帖，生成商户响应。
- 用户进入 AI 试衣间，选择个人形象和商品，生成 mock 或 Seedream 试穿图，并发布为穿搭帖。
- 博主通过商单广场选择商品，生成试穿图并发给商家确认。
- 商户端上架商品、调用 AI 生成穿搭帖草稿、发布到社区，也能确认博主商单。
- 我的主页展示发布、点赞、收藏、关注、粉丝、可见度设置等社交功能。

当前实现是前端 demo 为主，核心状态在浏览器本地，不是正式多用户后端系统。

## 技术栈

- 框架：Next.js `16.2.4`，App Router。
- UI：React `19.2.4`，TypeScript 严格模式。
- 样式：Tailwind CSS v4，`shadcn` base-nova 风格，CSS 变量主题。
- 组件依赖：`@base-ui/react`、`class-variance-authority`、`clsx`、`tailwind-merge`。
- 图标：`lucide-react`。
- Toast：`sonner`。
- AI 图片：`doubao-seedream-5-0-260128`，通过 302.ai 兼容接口调用。
- 路径别名：`@/*` 指向 `./src/*`。

## 常用命令

```bash
npm run dev
npm run build
npm run start
npm run lint
```

`README.md` 仍是 create-next-app 默认说明，真正的项目上下文以本文件和源码为准。

## 重要目录

```text
src/app/                    Next.js App Router 页面和 API 路由
src/components/             业务 UI 与 shadcn UI 组件
src/components/ui/          shadcn 组件封装
src/lib/                    类型、种子数据、生成数据、AI 图片调用
scripts/                    Seedream 资产生成脚本
public/generated/           已生成的 demo 图片资产
```

主要业务文件：

- `src/components/marketplace-app.tsx`：绝大多数页面、业务组件和交互都在这里，当前约 3500 行。
- `src/components/demo-provider.tsx`：全局 demo 状态、localStorage 持久化和所有状态变更方法。
- `src/lib/types.ts`：业务类型定义。
- `src/lib/seed.ts`：手写种子数据、状态初始化、风格分析和 AI 草稿构造。
- `src/lib/generated-mock-market.ts`：批量生成的 mock 市场数据。
- `src/lib/seedream.ts`：Seedream 图片生成 API 封装。

## 页面路由

用户端：

- `/`：社区 Feed，推荐/最新/关注流、风格筛选、趋势入口、小红书解析入口。
- `/products`：商品商城，含购物车和历史订单侧栏。
- `/products/[id]`：商品详情、尺码、材质、相似商品、购买、加入购物车、进入试衣间。
- `/posts/[id]`：帖子详情，图片商品浮层标签、点赞、收藏、关注博主/商户、同款与相似商品。
- `/requests/[id]`：买家征集详情，展示商户响应和报价。
- `/bloggers/[id]`：博主主页；`blogger-me` 会重定向到 `/me`。
- `/trends/[id]`：趋势详情。
- `/search?q=`：跨帖子、商品、博主、商户的本地搜索。
- `/analyze`：小红书链接解析、风格分析、匹配商品、发布征集。
- `/try-on`：AI 试衣间；支持 `productId` 和 `commission=1` 查询参数。
- `/create`：发图文和商单广场。
- `/me`：当前游客用户主页。
- `/settings`：主页 section 可见度设置。

商户端：

- `/sell`：商户发布工作台，上架商品、生成穿搭帖、发布、推荐博主商单、确认待处理商单。
- `/seller/products`：商户视角商品列表，复用商品目录页。
- `/seller/posts`：商户视角社区帖子列表。

## API 路由

这些 API 当前大多是 demo/mock 行为，正式工程化时需要接入数据库、鉴权和真实服务端状态。

- `GET /api/feed`：返回 `seedDemoState` 中的帖子、博主、商户、商品和征集。
- `GET /api/posts/[id]`：从手写 seed 数据查帖子详情、作者、商品、征集和相似商品。
- `POST /api/purchase`：基于 `seedProducts` 做购买校验，但实际扣余额/库存由客户端 Provider 完成。
- `POST /api/social/like`：回显点赞状态。
- `POST /api/social/follow`：回显关注状态。
- `POST /api/demo/reset`：返回初始 `seedDemoState`。
- `POST /api/analyze/xhs-link`：调用本地 `buildStyleAnalysis`，不是实际解析小红书。
- `POST /api/requests`：根据匹配商品生成征集帖和商户响应。
- `GET /api/requests/[id]/offers`：返回 seed 征集的 matched offers。
- `POST /api/try-on`：返回商品相关预设图片，状态为 `mock`。
- `POST /api/ai/images`：真实调用 Seedream；失败时返回 `status: "fallback"` 和空图。
- `POST /api/seller/products`：根据表单创建 Product 对象并返回，不持久化到服务端。
- `POST /api/seller/posts/generate`：构造 AI 穿搭帖草稿；有 API key 时调用 Seedream，失败回退模板草稿。
- `POST /api/seller/posts/publish`：只返回 `{ ok: true }`，客户端负责发布状态。

注意：部分 API 只查 `seedProducts` / `seedPosts`，而客户端运行时新增的商品和帖子只存在于 `DemoProvider` 的状态里。正式化时需要统一数据源。

## 数据模型

核心类型在 `src/lib/types.ts`：

- `Seller`：商户，包含收入、粉丝数、风格方向。
- `Blogger`：博主/用户，包含头像、简介、粉丝数、风格标签、封面图。
- `Product`：商品，包含商户、价格、库存、尺码、尺码表、材质、护理、标签、图片、相似度、试衣预设图和来源帖子。
- `Post`：社区帖子，类型为 `seller-look` 或 `buyer-request`，可关联商品、商品浮层标签、博主、商户或征集。
- `RequestPost`：买家征集，含预算、描述、期望商品、匹配 offer。
- `Offer`：商户响应，关联商品、报价、相似度和备注。
- `AIStyledPostDraft`：商户 AI 帖子草稿。
- `CollabRequest`：博主给商户的商单确认请求。
- `ViewerState`：当前游客用户状态，包括余额、点赞、收藏、关注、购物车、订单、浏览历史、主页可见度。
- `DemoState`：所有 demo 状态的根对象。

## 初始数据与资产

- `seedDemoState` 是初始状态根对象。
- 手写 seed 包括 4 个基础商户、6 个生成商户、若干基础博主、6 个手写商品、基础帖子和基础征集。
- `generated-mock-market.ts` 追加了 30 个博主、80 个商品、150 个帖子、20 个征集。
- `public/generated/seedream-bulk/` 下包含批量生成图片：150 张帖子图、80 张商品图、20 张征集图，以及 manifest。
- `public/generated/seedream-v1/` 下是早期少量手工 curated 图片和 manifest。
- `scripts/generate-seedream-assets.mjs` 生成 seedream-v1 资产。
- `scripts/generate-seedream-bulk.mjs` 批量生成 posts/products/requests 资产，并支持 `SEEDREAM_SKIP_API=1` 跳过真实 API。

## 状态管理

`DemoProvider` 是当前唯一应用状态中心：

- localStorage key：`jasmine-demo-state-v1`。
- 初始状态通过深拷贝 `seedDemoState` 获取。
- Hydration 后读取 localStorage，并通过 `normalizeState` 把旧本地状态和最新 seed 数据合并。
- 用户操作会写回 localStorage。
- 重置按钮调用 `resetDemo()`，只重置客户端状态。

Provider 暴露的主要能力：

- 社交：`toggleLike`、`toggleSavePost`、`toggleFollow`、`toggleBloggerFollow`。
- 交易：`toggleCartProduct`、`purchaseProduct`。
- 内容：`publishUserPost`、`publishSellerPost`、`publishBloggerCollabPost`。
- 商单：`submitCollabRequest`、`approveCollabRequest`。
- 商品与征集：`addProduct`、`addRequest`。
- 其他：`setSectionVisibility`、`trackView`、`resetDemo`。

工程化时优先把这些状态变更迁移到服务端 action/API + 数据库事务，客户端只保留 UI 状态和缓存。

## 关键业务流程

买家浏览与成交：

1. 社区 Feed 从 `state.posts` 排序和过滤。
2. 帖子详情展示商品浮层标签，点击进商品详情。
3. 商品详情选择尺码后调用 `purchaseProduct`。
4. 购买成功会更新余额、库存、商户收入和订单列表。

找款与征集：

1. `/analyze` 调用 `/api/analyze/xhs-link` 获取 mock 风格分析。
2. 分析结果给出匹配商品与试衣入口。
3. 发布征集时调用 `/api/requests` 生成 `RequestPost` 和对应 `Post`。
4. 客户端 `addRequest` 把征集写入本地状态。

AI 试衣：

1. `/try-on` 选择个人形象和商品。
2. 当前 `/api/try-on` 使用商品预设图和关联帖子图作为 mock 结果。
3. 结果可发布为用户穿搭帖，或在 `commission=1` 模式下发给商户确认。

商户发布：

1. `/sell` 调用 `/api/seller/products` 创建商品对象。
2. 商品加入客户端状态。
3. 调用 `/api/seller/posts/generate` 生成 AI 帖子草稿。
4. 调用 `/api/seller/posts/publish` 后，由客户端 `publishSellerPost` 发布到社区。

商单确认：

1. `/create` 中商单广场根据粉丝数、商品和博主标签计算适配度与建议报价。
2. 粉丝数大于 1000 时可进入试衣间生成商单样图。
3. 博主提交后生成 `CollabRequest`。
4. 商户在 `/sell` 待确认商单里审批，审批后生成带货帖。

## UI 与设计约定

- 全站语言是中文，主体体验面向穿搭社区、电商和内容商业化。
- 全局布局使用 `AppHeader` + `LayoutFrame`，页面宽度类为 `.page-shell`。
- 视觉风格偏暖白、低饱和、 editorial 电商社区感。
- 全局字体变量：
  - UI：`Avenir Next`、`Helvetica Neue`、`PingFang SC`、`Microsoft YaHei`。
  - 标题：`Songti SC`、`STSong`、`Noto Serif SC`、Georgia。
- 常用容器类：
  - `.page-shell`
  - `.glass-panel`
  - `.soft-panel`
  - `.editorial-kicker`
- 按钮和图标优先使用 shadcn UI 与 lucide-react。
- `marketplace-app.tsx` 顶部禁用了 `@next/next/no-img-element`，当前大量使用原生 `<img>`。

## 环境变量与安全

`.env.example` 中定义：

```bash
SEEDREAM_API_KEY=your_302_ai_api_key
SEEDREAM_API_BASE_URL=https://api.302.ai
```

`src/lib/seedream.ts` 的读取顺序：

1. `SEEDREAM_API_KEY`
2. `DOUBAO_API_KEY`
3. `AI_302_API_KEY`

默认 base URL 是 `https://api.302.ai`。

注意事项：

- `.env*` 已被 `.gitignore` 忽略。
- 不要把本地真实 API key 写进 README、AGENTS、日志、PR 描述或提交信息。
- 处理 `opencode.json` 等工具配置时也要注意不要泄露其中可能存在的密钥。

## 当前 demo 局限

- 没有数据库、认证、权限、服务端 session 或真实用户体系。
- 多数 API 是无持久化 mock；真实状态变更在客户端 localStorage 中完成。
- 新增商品、帖子、征集、订单和商单无法跨浏览器或跨用户共享。
- API 数据源与客户端状态不完全一致，尤其是新增数据和 `generatedProducts`。
- 图片上传使用 FileReader 转 data URL 存入 localStorage，正式项目需要对象存储/CDN。
- 小红书解析是固定 mock 分析，不是真实抓取或 OCR/多模态分析。
- `/api/try-on` 当前不调用真实 AI 试衣，只返回预设图；真实图片生成入口在 `/api/ai/images` 和商户发帖生成中。
- 交易没有支付、幂等、库存锁、订单状态机、退款、风控或审计。
- `marketplace-app.tsx` 文件过大，后续应按页面、业务域和基础组件拆分。
- 当前没有测试目录或测试脚本，只有 `npm run lint`。

## 正式工程化建议

优先级较高：

1. 建立数据模型和数据库迁移：users、sellers、bloggers、products、posts、post_images、post_product_tags、requests、offers、orders、follows、likes、saves、collab_requests。
2. 把 `DemoProvider` 中的业务写操作迁移为服务端 API/action，并为购买、库存、收入、订单使用数据库事务。
3. 引入认证和角色：买家、博主、商户、管理员；替换 `blogger-me` 游客身份。
4. 统一数据源：页面、API、搜索、详情页都从同一服务端数据层读取，不再混用 seed 和客户端新增状态。
5. 图片体系迁移到对象存储，避免把大图 data URL 放进 localStorage。
6. 拆分 `marketplace-app.tsx`：按 `feed`、`products`、`posts`、`try-on`、`seller`、`profile`、`shared` 目录组织。
7. 为核心流程补测试：购买库存/余额、发布帖子、征集匹配、商单审批、权限可见度。

可以延后但需要规划：

- 搜索改为服务端全文检索或向量检索。
- 商品相似度从固定字段迁移到真实匹配服务。
- 小红书解析接入真实输入校验、内容抓取授权、图片识别和风格抽取。
- Seedream 调用加入任务队列、重试、超时、配额、内容安全审核和生成记录。
- 增加管理后台和数据审核能力。

## 开发注意事项

- 修改业务类型时先改 `src/lib/types.ts`，再同步 seed、Provider、页面和 API。
- 新增可持久化字段时要更新 `normalizeState`，否则旧 localStorage 状态可能丢字段或覆盖 seed。
- 生成数据文件很大，避免人工大范围编辑 `src/lib/generated-mock-market.ts`。
- 若新增 shadcn 组件，保持 `components.json` 的别名和 Tailwind v4 配置一致。
- 业务文案目前大量内联在 `marketplace-app.tsx`，正式项目如需多语言或运营配置，应抽离。
- 如果改动页面视觉，务必跑 `npm run dev` 并检查移动端和桌面端，因为很多布局依赖响应式 grid、columns 和 sticky 侧栏。
- 不要把 demo 中的 localStorage 行为误认为正式数据持久化。
