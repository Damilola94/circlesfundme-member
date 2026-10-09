"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { toNumber } from "@/lib/schemes";
import { Button } from "@/components/ui/button";
import { BottomSheet } from "@/components/feedback/bottom-sheet";
import { CheckboxRow, TextField } from "@/components/forms/field";

/** Withdraw the contribution balance before switching scheme. */
export function WithdrawContributionSheet({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [deduct, setDeduct] = useState(true);
  const amountNum = toNumber(amount);

  const withdraw = useMutation({
    mutationFn: () =>
      api({ endpoint: "financials/withdraw", method: "POST", body: { amount: amountNum, deductChargeFromBalance: deduct } }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Withdrawal Failed", text2: res?.message || "Try again" });
        return;
      }
      showToast({ type: "success", text1: "Withdrawal Successful" });
      queryClient.invalidateQueries({ queryKey: ["financials-my-wallets"] });
      onSuccess();
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Error", text2: err.message || "Something went wrong" }),
  });

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Withdraw Contribution"
      description="You have an existing contribution balance. Withdraw it before switching your scheme."
    >
      <TextField label="Amount" placeholder="Enter amount" valueType="money" value={amount} onValueChange={setAmount} className="border-[#e6e6e6]" />
      <CheckboxRow checked={deduct} onCheckedChange={setDeduct}>
        <span className="block font-medium">Deduct charges from balance</span>
        <span className="block text-xs text-muted-foreground">
          Withdrawal charges will be deducted from your balance instead of the withdrawn amount.
        </span>
      </CheckboxRow>
      <Button size="cta" disabled={withdraw.isPending || amountNum <= 0} onClick={() => withdraw.mutate()}>
        {withdraw.isPending ? "Processing..." : "Withdraw & Continue"}
      </Button>
    </BottomSheet>
  );
}
