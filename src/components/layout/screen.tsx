"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";

export function BackButton({ href, variant = "arrow" }: { href?: string; variant?: "arrow" | "chevron" }) {
  const router = useRouter();
  const Icon = variant === "arrow" ? ArrowLeft : ChevronLeft;
  const className =
    "flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-foreground transition-colors hover:bg-white/70";
  if (href) {
    return (
      <Link href={href} aria-label="Go back" className={className}>
        <Icon className="size-5" />
      </Link>
    );
  }
  return (
    <button type="button" aria-label="Go back" onClick={() => router.back()} className={className}>
      <Icon className="size-5" />
    </button>
  );
}

/** Back button with a centred title, used by most inner screens. */
export function PageHeader({ title, backHref }: { title: string; backHref?: string }) {
  return (
    <header className="relative flex h-11 items-center">
      <BackButton href={backHref} />
      <h1 className="absolute inset-x-14 text-center text-lg font-medium">{title}</h1>
    </header>
  );
}

/** Large left-aligned title with supporting copy, used on onboarding/auth screens. */
export function PageIntro({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h1 className="text-[32px] leading-tight font-medium">{title}</h1>
      {children && <p className="text-base leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  );
}

/** Segmented progress bar (onboarding has 7 steps, payment flows have 2). */
export function StepProgress({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn("h-1 flex-1 rounded-full", i < current ? "bg-brand" : "bg-[#e3e3e3]")}
        />
      ))}
    </div>
  );
}

/** Inner screen: back button + centred title, scrollable body, footer pinned to the bottom. */
export function FormScreen({
  title,
  backHref,
  children,
  footer,
  className,
}: {
  title: string;
  backHref?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <main className={cn("flex flex-1 flex-col gap-6 px-4 pt-12 pb-4", className)}>
        <PageHeader title={title} backHref={backHref} />
        {children}
      </main>
      {footer && <div className="sticky bottom-0 flex flex-col gap-3 bg-background px-4 pt-3 pb-8">{footer}</div>}
    </div>
  );
}
