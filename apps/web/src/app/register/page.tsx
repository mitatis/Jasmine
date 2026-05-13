import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-10">
      <section className="w-full max-w-3xl rounded-md border bg-background p-8">
        <Link href="/" className="font-heading text-4xl leading-none tracking-[-0.05em]">
          Jasmine
        </Link>
        <h1 className="mt-10 text-4xl leading-tight">选择要注册的账号类型</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          商户端和博主端会创建独立登录态、默认资料和权限边界。
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link href="/merchant/register" className="rounded-md border bg-white p-5 transition hover:bg-secondary/50">
            <p className="font-sans text-xl font-semibold tracking-normal">注册商户账号</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">创建默认品牌组织和品牌资料。</p>
            <span className={cn(buttonVariants({ variant: "outline" }), "mt-5")}>
              注册商户端 <ArrowRight className="size-4" />
            </span>
          </Link>
          <Link href="/creator/register" className="rounded-md border bg-white p-5 transition hover:bg-secondary/50">
            <p className="font-sans text-xl font-semibold tracking-normal">注册博主账号</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">创建默认博主工作室和博主资料。</p>
            <span className={cn(buttonVariants({ variant: "outline" }), "mt-5")}>
              注册博主端 <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
        <Link href="/login" className="mt-6 block text-sm text-muted-foreground hover:text-foreground">
          已有账号，去登录
        </Link>
      </section>
    </main>
  );
}
