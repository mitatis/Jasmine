import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/components/demo-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "穿搭市集",
  description: "社区驱动的穿搭交易市场：发帖、找款、试穿、下单、征集一条线跑通。",
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
        <DemoProvider>
          {children}
          <Toaster richColors position="top-center" />
        </DemoProvider>
      </body>
    </html>
  );
}
