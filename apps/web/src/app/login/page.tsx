import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-10">
      <section className="w-full max-w-3xl rounded-md border bg-background p-8">
        <Link href="/" className="font-heading text-4xl leading-none tracking-[-0.05em]">
          Jasmine
        </Link>
        <h1 className="mt-10 text-4xl leading-tight">选择要登录的账号类型</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          商户端和博主端账号完全隔离，同一个邮箱可以分别注册两个身份。
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link href="/merchant/login" className="rounded-md border bg-white p-5 transition hover:bg-secondary/50">
            <p className="font-sans text-xl font-semibold tracking-normal">商户端登录</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">进入品牌、商品和商单管理。</p>
            <span className={cn(buttonVariants({ variant: "outline" }), "mt-5")}>
              进入商户端 <ArrowRight className="size-4" />
            </span>
          </Link>
          <Link href="/creator/login" className="rounded-md border bg-white p-5 transition hover:bg-secondary/50">
            <p className="font-sans text-xl font-semibold tracking-normal">博主端登录</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">进入商单广场和内容工作台。</p>
            <span className={cn(buttonVariants({ variant: "outline" }), "mt-5")}>
              进入博主端 <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
        <Link href="/register" className="mt-6 block text-sm text-muted-foreground hover:text-foreground">
          没有账号，去注册
        </Link>
      </section>
    </main>
  );
}
