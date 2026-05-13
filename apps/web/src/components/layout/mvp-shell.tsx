import Link from "next/link";
import { Bot, BriefcaseBusiness, Images, LayoutDashboard, ShieldCheck, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

const nav = [
  { href: "/merchant/dashboard", label: "商家", icon: BriefcaseBusiness },
  { href: "/creator/dashboard", label: "博主", icon: UserRound },
  { href: "/studio/generate", label: "Studio", icon: Images },
  { href: "/admin/jobs", label: "Admin", icon: ShieldCheck },
];

export function MvpShell({
  children,
  title,
  description,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold">
            <span className="flex size-8 items-center justify-center rounded-md bg-foreground text-background">
              <Bot className="size-4" />
            </span>
            Jasmine AI Commerce
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs uppercase text-muted-foreground">
              <LayoutDashboard className="size-4" />
              MVP v0.1
            </div>
            <h1 className="font-sans text-3xl font-semibold tracking-normal md:text-5xl">{title}</h1>
            {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>
        {children}
      </section>
    </main>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-md border border-dashed bg-white p-8 text-sm">
      <div className="font-medium">{title}</div>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
