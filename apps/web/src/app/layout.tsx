import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/components/demo-provider";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Jasmine",
  description: "穿搭博主和商户的 AI 内容生产、商单合作与商品上架平台。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-background text-foreground">
        <QueryProvider>
          <DemoProvider>
            {children}
            <Toaster richColors position="top-center" />
          </DemoProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
