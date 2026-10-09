"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { PageHeader, StepProgress } from "@/components/layout/screen";
import { BankAccountFields, useBankCode } from "@/components/payments/bank-account-fields";

/** Step 2 of payment setup: where withdrawals should be paid (payment-setup & savings). */
export function WithdrawalAccountScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const { code } = useBankCode(bank);

  const save = useMutation({
    mutationFn: (body: { accountNumber: string; bankCode: string }) =>
      api({ endpoint: "users/create-withdrawal-setting", method: "POST", body }),
    onSuccess: async () => {
      showToast({ type: "success", text1: "Withdrawal account saved successfully" });
      await queryClient.invalidateQueries({ queryKey: ["users-me"] });
      router.push("/dashboard");
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Error", text2: error.message || "Something went wrong" }),
  });

  function submit() {
    if (accountNumber.length !== 10) return showToast({ type: "error", text1: "Invalid account number" });
    if (!code) return showToast({ type: "error", text1: "Please select a valid bank" });
    save.mutate({ accountNumber, bankCode: code });
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      {save.isPending && <Loader />}
      <main className="flex flex-1 flex-col px-4 pt-12">
        <PageHeader title="Withdrawal Account" backHref="/dashboard" />
        <div className="mt-8">
          <StepProgress total={2} current={2} />
        </div>
        <h2 className="mt-10 text-[32px] font-medium">Withdrawal</h2>
        <div className="mt-8">
          <BankAccountFields
            accountNumber={accountNumber}
            onAccountNumberChange={setAccountNumber}
            bank={bank}
            onBankChange={setBank}
          />
        </div>
      </main>
      <div className="sticky bottom-0 bg-background px-4 pt-3 pb-8">
        <Button size="cta" onClick={submit} disabled={save.isPending}>
          {save.isPending ? "Submitting..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
