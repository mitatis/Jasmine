"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";
import { useAuthStore } from "@/lib/auth";
import type { AccountType } from "@/lib/types";

const labels: Record<AccountType, { title: string; subtitle: string; defaultName: string; defaultEmail: string; home: string }> = {
  merchant: {
    title: "商户端",
    subtitle: "管理品牌、商品、商单和 AI 生成审核。",
    defaultName: "Jasmine Merchant",
    defaultEmail: "merchant@example.com",
    home: "/seller",
  },
  creator: {
    title: "博主端",
    subtitle: "管理博主资料、授权素材和商单内容生成。",
    defaultName: "Jasmine Creator",
    defaultEmail: "creator@example.com",
    home: "/campaigns",
  },
};

const schema = z.object({
  display_name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export function RoleAuthForm({ accountType, mode }: { accountType: AccountType; mode: "login" | "register" }) {
  const setSession = useAuthStore((state) => state.setSession);
  const copy = labels[accountType];
  const isRegister = mode === "register";
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      display_name: copy.defaultName,
      email: copy.defaultEmail,
      password: "password123",
    },
  });

  async function onSubmit(values: FormData) {
    const token = isRegister
      ? await api.registerForAccount(accountType, {
          email: values.email,
          password: values.password,
          display_name: values.display_name,
        })
      : await api.loginForAccount(accountType, {
          email: values.email,
          password: values.password,
        });

    setSession(accountType, token.access_token);
    toast.success(isRegister ? `${copy.title}账号已创建` : `${copy.title}已登录`);
    const next = new URLSearchParams(window.location.search).get("next");
    window.location.assign(next || copy.home);
  }

  const otherModeHref = isRegister ? `/${accountType}/login` : `/${accountType}/register`;
  const otherRole: AccountType = accountType === "merchant" ? "creator" : "merchant";

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-10">
      <section className="grid w-full max-w-4xl overflow-hidden rounded-md border bg-background shadow-[0_24px_80px_-56px_rgba(0,0,0,0.45)] md:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-foreground p-8 text-background">
          <Link href="/" className="font-heading text-4xl leading-none tracking-[-0.05em]">
            Jasmine
          </Link>
          <h1 className="mt-12 text-4xl leading-tight">
            {copy.title}
            {isRegister ? "注册" : "登录"}
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-7 text-background/72">{copy.subtitle}</p>
          <div className="mt-8 grid gap-2 text-sm text-background/72">
            <Link href={`/${otherRole}/login`} className="hover:text-background">
              切换到{labels[otherRole].title}登录
            </Link>
            <Link href="/" className="hover:text-background">
              返回初始页
            </Link>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-8">
          <div>
            <p className="text-sm text-muted-foreground">{isRegister ? "创建独立账号" : "使用独立账号进入"}</p>
            <h2 className="mt-2 font-sans text-2xl font-semibold tracking-normal">{copy.title}</h2>
          </div>
          <div className="mt-6 grid gap-3">
            {isRegister ? <Input placeholder="显示名称" {...form.register("display_name")} /> : null}
            <Input placeholder="邮箱" {...form.register("email")} />
            <Input placeholder="密码" type="password" {...form.register("password")} />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {isRegister ? "注册并进入" : "登录"}
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <Link href={otherModeHref} className="hover:text-foreground">
              {isRegister ? "已有账号，去登录" : "没有账号，去注册"}
            </Link>
            <Link href={accountType === "merchant" ? "/creator/login" : "/merchant/login"} className="hover:text-foreground">
              {accountType === "merchant" ? "我是博主" : "我是商户"}
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
