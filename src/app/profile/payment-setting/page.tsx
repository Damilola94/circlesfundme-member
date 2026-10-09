"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { useBanks, useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { FormScreen } from "@/components/layout/screen";
import { EmptyState } from "@/components/dashboard/widgets";
import { BankAccountFields, useBankCode } from "@/components/payments/bank-account-fields";

export default function PaymentSettingPage() {
  const router = useRouter();
  const { data: user } = useUser();
  const { data: banks = [] } = useBanks();
  const setting = user?.withdrawalSetting;
  const hasSetting = !!setting && !!(setting.accountNumber || setting.accountName || setting.bankCode);

  const savedBankName = banks.find((b) => b.bankCode === setting?.bankCode)?.bankName ?? "";
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const [bank, setBank] = useState<string | null>(null);
  const number = accountNumber ?? setting?.accountNumber ?? "";
  const bankName = bank ?? savedBankName;
  const { code } = useBankCode(bankName);

  const sendOtp = useMutation({
    mutationFn: () => api({ endpoint: "accounts/send-onboarding-otp", method: "POST", body: { email: user?.email } }),
    onSuccess: () => {
      const params = new URLSearchParams({
        withdrawalSettingId: setting?.id ?? "",
        accountNumber: number,
        bankCode: code ?? "",
      });
      router.push(`/profile/verify-otp?${params}`);
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Failed to send OTP", text2: err.message || "Try again later" }),
  });

  function submit() {
    if (number.length !== 10) return showToast({ type: "error", text1: "Account Number must be 10 digits" });
    if (!code || !user?.email) return showToast({ type: "error", text1: "All fields are required" });
    sendOtp.mutate();
  }

  return (
    <FormScreen
      title="Payment Settings"
      footer={
        hasSetting && (
          <Button size="cta" onClick={submit} disabled={sendOtp.isPending}>
            Update
          </Button>
        )
      }
    >
      {sendOtp.isPending && <Loader />}
      {!hasSetting ? (
        <EmptyState title="No account detail is set up" />
      ) : (
        <div className="mt-4">
          <BankAccountFields
            accountNumber={number}
            onAccountNumberChange={setAccountNumber}
            bank={bankName}
            onBankChange={setBank}
            fallbackAccountName={setting?.accountName}
          />
        </div>
      )}
    </FormScreen>
  );
}
