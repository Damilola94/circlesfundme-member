"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";

import { api } from "@/lib/api/client";
import { daysUntil, formatLongDate } from "@/lib/format";
import { shortAmount, type SavingsPlan } from "@/lib/savings";
import { buttonVariants } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { PageHeader } from "@/components/layout/screen";

function SavingsPlans() {
  const params = useSearchParams();
  const savingsSchemeId = params.get("savingsSchemeId") ?? "";
  const schemeName = params.get("schemeName") ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["savings-plans", savingsSchemeId],
    queryFn: () => api<SavingsPlan[]>({ endpoint: `savings/me/${savingsSchemeId}/plans` }),
    enabled: !!savingsSchemeId,
  });
  const plans = data?.data ?? [];
  const total = plans.reduce((sum, p) => sum + (p.balance || p.walletBalance || 0), 0);
  const title = schemeName || plans[0]?.savingsScheme?.name || plans[0]?.name || "Savings Flex";

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      {isLoading && <Loader message="Loading plan details" />}
      <main className="flex flex-1 flex-col px-4 pt-12">
        <PageHeader title={title} />
        <div className="mt-8 rounded-[28px] bg-forest p-5 text-white">
          <div className="flex items-center justify-between">
            <p className="text-sm">Total Amount</p>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px]">{title}</span>
          </div>
          <p className="mt-6 text-[34px] font-medium">{shortAmount(total)}</p>
        </div>

        <h2 className="mt-10 text-xl">Active plans</h2>
        <div className="mt-4 flex flex-col gap-3 pb-6">
          {isError && <p className="py-8 text-center text-destructive">Failed to load savings plans.</p>}
          {!isLoading && !isError && plans.length === 0 && (
            <p className="py-8 text-center text-muted-foreground">No active plans found.</p>
          )}
          {plans.map((plan) => {
            const days = daysUntil(plan.maturityDate);
            return (
              <Link
                key={plan.id}
                href={`/savings/plan-details?planId=${plan.id}`}
                className="flex items-center gap-4 rounded-3xl bg-white p-4 transition-colors hover:bg-white/80"
              >
                <span className="size-9 shrink-0 rounded-full border-4 border-brand border-r-[#e3e3e3]" aria-hidden />
                <div>
                  <p className="text-xs text-muted-foreground">{plan.savingsScheme?.name || plan.name}</p>
                  <p className="text-xl font-medium">{shortAmount(plan.balance || plan.walletBalance || 0)}</p>
                  <p className="text-[10px] text-muted-foreground">
                    Ends {formatLongDate(plan.maturityDate)} {days > 0 ? `(${days} days)` : "(Matured)"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <div className="sticky bottom-0 bg-background px-4 pt-3 pb-8">
        <Link href="/savings/create-plan" className={buttonVariants({ size: "cta" })}>
          <CirclePlus className="size-5" /> Create new savings
        </Link>
      </div>
    </div>
  );
}

export default function SavingsPlansPage() {
  return (
    <Suspense>
      <SavingsPlans />
    </Suspense>
  );
}
