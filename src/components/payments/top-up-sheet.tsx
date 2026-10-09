"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreditCard, Landmark } from "lucide-react";

import { cn } from "@/lib/utils";
import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { toNumber } from "@/lib/schemes";
import { Button } from "@/components/ui/button";
import { BottomSheet } from "@/components/feedback/bottom-sheet";
import { TextField } from "@/components/forms/field";

const METHODS = [
  { key: "card", label: "Card", description: "Pay with debit or credit card", Icon: CreditCard },
  { key: "bank_transfer", label: "Bank Transfer", description: "Pay via direct bank transfer", Icon: Landmark },
] as const;

/** Amount + payment method; returns the payment page URL from `savings/plans/{id}/top-up`. */
export function TopUpSheet({
  open,
  onOpenChange,
  planId,
  onPaymentUrl,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: string;
  onPaymentUrl: (url: string, reference?: string) => void;
}) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<(typeof METHODS)[number]["key"]>("card");
  const amountNum = toNumber(amount);

  const topUp = useMutation({
    mutationFn: () =>
      api<{ authorizationUrl?: string; reference?: string }>({
        endpoint: `savings/plans/${planId}/top-up`,
        method: "POST",
        body: { planId, amount: amountNum, paymentMethod: method },
      }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Top Up Failed", text2: res?.message || "Try again" });
        return;
      }
      if (!res.data?.authorizationUrl) {
        showToast({ type: "error", text1: "Error", text2: "No payment URL returned" });
        return;
      }
      onPaymentUrl(res.data.authorizationUrl, res.data.reference);
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Error", text2: err.message || "Something went wrong" }),
  });

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Top Up Savings"
      description="Enter the amount you want to add to your savings plan."
    >
      <TextField label="Amount" placeholder="Enter amount" valueType="money" value={amount} onValueChange={setAmount} className="border-[#e6e6e6]" />
      <div>
        <p className="mb-2.5 text-base">Payment Method</p>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Payment Method">
          {METHODS.map(({ key, label, description, Icon }) => (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={method === key}
              onClick={() => setMethod(key)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-2xl border p-3 text-left",
                method === key ? "border-brand bg-brand-soft" : "border-[#e6e6e6]"
              )}
            >
              <span className={cn("flex size-9 items-center justify-center rounded-xl", method === key ? "bg-brand text-white" : "bg-[#f2f2f2] text-[#888]")}>
                <Icon className="size-4" />
              </span>
              <span className={cn("text-sm font-medium", method === key && "text-brand")}>{label}</span>
              <span className="text-xs text-muted-foreground">{description}</span>
            </button>
          ))}
        </div>
      </div>
      <Button size="cta" disabled={topUp.isPending || amountNum <= 0} onClick={() => topUp.mutate()}>
        {topUp.isPending ? "Processing..." : "Proceed to Pay"}
      </Button>
    </BottomSheet>
  );
}
