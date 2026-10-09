"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { saveCheckout } from "@/lib/checkout";
import { daysUntil, formatLongDate } from "@/lib/format";
import { toNumber } from "@/lib/schemes";
import { frequencyLabel, shortAmount, statusLabel, type PlanDetail } from "@/lib/savings";
import { Button } from "@/components/ui/button";
import { InlineLoader, Loader } from "@/components/feedback/loader";
import { BottomSheet } from "@/components/feedback/bottom-sheet";
import { PageHeader } from "@/components/layout/screen";
import { CheckboxRow, TextField } from "@/components/forms/field";
import { TopUpSheet } from "@/components/payments/top-up-sheet";

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", accent && "text-forest")}>{value}</span>
    </div>
  );
}

function WithdrawSheet({
  open,
  onOpenChange,
  planId,
  balance,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: string;
  balance: number;
  onSuccess: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [deduct, setDeduct] = useState(true);
  const amountNum = toNumber(amount);

  const withdraw = useMutation({
    mutationFn: () =>
      api({
        endpoint: `savings/plans/${planId}/withdraw`,
        method: "POST",
        body: { planId, amount: amountNum, deductChargeFromBalance: deduct },
      }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Withdrawal Failed", text2: res?.message || "Try again" });
        return;
      }
      showToast({ type: "success", text1: "Withdrawal Successful", text2: "Your funds are on the way." });
      setAmount("");
      onSuccess();
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Error", text2: err.message || "Something went wrong" }),
  });

  function submit() {
    if (balance <= 0) return showToast({ type: "error", text1: "Insufficient Balance", text2: "Your savings balance is zero." });
    if (amountNum <= 0) return showToast({ type: "error", text1: "Enter a valid amount" });
    if (amountNum > balance) {
      return showToast({ type: "error", text1: "Insufficient Balance", text2: "Withdrawal amount exceeds available balance." });
    }
    withdraw.mutate();
  }

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Withdraw Savings"
      description="Enter the amount you want to withdraw from your savings plan."
    >
      {withdraw.isPending && <Loader />}
      <TextField label="Amount" placeholder="Enter amount" valueType="money" value={amount} onValueChange={setAmount} className="border-[#e6e6e6]" />
      <CheckboxRow checked={deduct} onCheckedChange={setDeduct}>
        <span className="block font-medium">Deduct charges from balance</span>
        <span className="block text-xs text-muted-foreground">
          Withdrawal charges will be deducted from your savings balance instead of the withdrawn amount.
        </span>
      </CheckboxRow>
      <Button size="cta" disabled={withdraw.isPending || amountNum <= 0} onClick={submit}>
        {withdraw.isPending ? "Processing..." : "Withdraw"}
      </Button>
    </BottomSheet>
  );
}

function PlanDetails() {
  const router = useRouter();
  const planId = useSearchParams().get("planId") ?? "";
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [now] = useState(() => Date.now());

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["savings-plan-detail", planId],
    queryFn: () => api<PlanDetail>({ endpoint: `savings/plans/${planId}` }),
    enabled: !!planId,
  });
  const plan = data?.data;

  if (isLoading) return <InlineLoader />;
  if (isError || !plan) {
    return <p className="flex flex-1 items-center justify-center text-destructive">Failed to load plan details.</p>;
  }

  const status = statusLabel(plan.status);
  const days = daysUntil(plan.maturityDate);
  const start = new Date(plan.commencementDate).getTime();
  const end = new Date(plan.maturityDate).getTime();
  const elapsed = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <main className="flex flex-1 flex-col gap-6 px-4 pt-12 pb-4">
        <PageHeader title={plan.name} />
        <div className="rounded-[28px] bg-forest p-5 text-white">
          <div className="flex items-center justify-between">
            <p className="text-sm">Current Balance</p>
            <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-medium", status.className)}>{status.label}</span>
          </div>
          <p className="mt-4 text-[34px] font-medium">{shortAmount(plan.balance)}</p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white" style={{ width: `${elapsed}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-white/80">
            <span>{formatLongDate(plan.commencementDate)}</span>
            <span>{days > 0 ? `${days} days left` : "Matured"}</span>
            <span>{formatLongDate(plan.maturityDate)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-[#eee] rounded-3xl bg-white">
          <div className="p-4">
            <p className="text-xs text-muted-foreground">Accrued Interest</p>
            <p className="mt-1 text-lg font-medium">{shortAmount(plan.accruedInterest)}</p>
          </div>
          <div className="p-4">
            <p className="text-xs text-muted-foreground">Total Interest Paid</p>
            <p className="mt-1 text-lg font-medium">{shortAmount(plan.totalInterestCredited)}</p>
          </div>
        </div>

        <section>
          <h2 className="mb-2 text-base font-medium">Plan Details</h2>
          <div className="divide-y divide-[#eee] rounded-3xl bg-white px-4">
            <Row label="Contribution Amount" value={shortAmount(plan.contributionAmount)} accent />
            <Row label="Frequency" value={frequencyLabel(plan.frequency)} />
            <Row label="Duration" value={`${plan.durationInMonths} months`} />
            <Row label="Start Date" value={formatLongDate(plan.commencementDate)} />
            <Row label="Maturity Date" value={formatLongDate(plan.maturityDate)} />
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium">Debit Schedule</h2>
          <div className="divide-y divide-[#eee] rounded-3xl bg-white px-4">
            <Row label="Next Debit Date" value={formatLongDate(plan.nextDebitDate)} accent />
            <Row label="Last Debit Date" value={formatLongDate(plan.lastDebitDate)} />
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 grid grid-cols-2 gap-3 bg-background px-4 pt-3 pb-8">
        <Button size="cta" variant="outline" className="border-foreground bg-white" onClick={() => setShowTopUp(true)}>
          Top Up
        </Button>
        <Button size="cta" onClick={() => setShowWithdraw(true)}>
          Withdraw
        </Button>
      </div>

      <TopUpSheet
        open={showTopUp}
        onOpenChange={setShowTopUp}
        planId={planId}
        onPaymentUrl={(url, reference) => {
          setShowTopUp(false);
          saveCheckout({
            url,
            reference,
            verify: { type: "plan", planId },
            successHref: `/savings/plan-details?planId=${planId}`,
            successMessage: "Your savings have been topped up.",
          });
          router.push("/checkout");
        }}
      />
      <WithdrawSheet
        open={showWithdraw}
        onOpenChange={setShowWithdraw}
        planId={planId}
        balance={plan.balance}
        onSuccess={() => {
          setShowWithdraw(false);
          refetch();
        }}
      />
    </div>
  );
}

export default function PlanDetailsPage() {
  return (
    <Suspense>
      <PlanDetails />
    </Suspense>
  );
}
