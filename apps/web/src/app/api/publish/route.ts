import { NextResponse } from "next/server";

import type { PublishDestination, PublishResult } from "@/lib/types";

const destinationLabels: Record<PublishDestination, string> = {
  community: "我的社区",
  douyin: "抖音",
  "xhs-miniapp": "小红书小程序挂载",
};

export async function POST(request: Request) {
  const body = (await request.json()) as {
    destinations?: PublishDestination[];
  };
  const destinations: PublishDestination[] = body.destinations?.length ? body.destinations : ["community"];

  const results: PublishResult[] = destinations.map((destination) => {
    if (destination === "community") {
      return {
        destination,
        status: "published",
        message: "已写入我的社区内容沉淀。",
      };
    }

    if (destination === "douyin") {
      const configured = Boolean(process.env.DOUYIN_CLIENT_KEY && process.env.DOUYIN_CLIENT_SECRET);

      return {
        destination,
        status: configured ? "needs_auth" : "needs_auth",
        message: configured
          ? "抖音应用已配置，下一步需要用户授权后调用内容发布接口。"
          : "抖音开放平台应用尚未配置，已生成发布包并等待授权。",
      };
    }

    return {
      destination,
      status: "configured",
      message: "已生成小红书小程序挂载发布包，等待小程序/Ark 商品能力承接。",
    };
  });

  return NextResponse.json({
    ok: true,
    summary: results.map((result) => `${destinationLabels[result.destination]}：${result.message}`).join("\n"),
    results,
  });
}
