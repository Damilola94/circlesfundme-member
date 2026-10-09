"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { saveCheckout } from "@/lib/checkout";
import { toNumber } from "@/lib/schemes";
import type { SavingsPlan } from "@/lib/savings";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { PageHeader, StepProgress } from "@/components/layout/screen";
import { TextField } from "@/components/forms/field";
import { SummaryCard } from "@/components/data/summary-card";

/** The dashboard links here without a plan; fall back to the user's first savings plan. */
function useTargetPlanId(explicit: string | null) {
  return useQuery({
    queryKey: ["first-savings-plan"],
    enabled: !explicit,
    queryFn: async () => {
      const me = await api<{ savingsSchemeId: string }[]>({ endpoint: "savings/me" });
      for (const scheme of me.data ?? []) {
        const plans = await api<SavingsPlan[]>({ endpoint: `savings/me/${scheme.savingsSchemeId}/plans` });
        if (plans.data?.[0]) return plans.data[0].id;
      }
      return null;
    },
    select: (id) => id,
  });
}

function InitialTopUp() {
  const router = useRouter();
  const explicitPlanId = useSearchParams().get("planId");
  const lookup = useTargetPlanId(explicitPlanId);
  const planId = explicitPlanId ?? lookup.data ?? null;
  const [amount, setAmount] = useState("");
  const amountNum = toNumber(amount);

  const topUp = useMutation({
    mutationFn: () =>
      api<{ authorizationUrl?: string; reference?: string }>({
        endpoint: `savings/plans/${planId}/top-up`,
        method: "POST",
        body: { amount: amountNum, paymentMethod: "card" },
      }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Top Up Failed", text2: res?.message || "Try again" });
        return;
      }
      if (!res.data?.authorizationUrl || !planId) {
        showToast({ type: "error", text1: "Error", text2: "No payment URL returned" });
        return;
      }
      saveCheckout({
        url: res.data.authorizationUrl,
        reference: res.data.reference,
        verify: { type: "plan", planId },
        successHref: `/savings/saving-withdraw-setup?planId=${planId}`,
        successMessage: "Your savings plan has been topped up 🎉",
      });
      router.push("/checkout");
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Error", text2: err.message || "Something went wrong" }),
  });

  function proceed() {
    if (amountNum <= 0) return showToast({ type: "error", text1: "Enter a valid amount" });
    if (!planId) {
      return showToast({ type: "error", text1: "No savings plan found", text2: "Create a savings plan first." });
    }
    topUp.mutate();
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      {(topUp.isPending || lookup.isLoading) && <Loader />}
      <main className="flex flex-1 flex-col gap-6 px-4 pt-12">
        <PageHeader title="Initial Saving" />
        <StepProgress total={2} current={1} />
        <p className="text-base text-muted-foreground">Enter the amount you want to add to your savings plan.</p>
        <TextField label="Amount" placeholder="Enter amount" valueType="money" value={amount} onValueChange={setAmount} />
        {amountNum > 0 && (
          <SummaryCard
            rows={[
              { label: "Amount", value: `₦${amountNum.toLocaleString()}` },
              { label: "Payment Method", value: "Card" },
            ]}
          />
        )}
      </main>
      <div className="sticky bottom-0 bg-background px-4 pt-3 pb-8">
        <Button size="cta" disabled={topUp.isPending || amountNum <= 0} onClick={proceed}>
          {topUp.isPending ? "Processing..." : "Proceed to Pay"}
        </Button>
      </div>
    </div>
  );
}

export default function InitialTopUpPage() {
  return (
    <Suspense>
      <InitialTopUp />
    </Suspense>
  );
}
