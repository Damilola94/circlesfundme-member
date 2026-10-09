"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { useUser } from "@/hooks/use-user";
import { useCountdown } from "@/hooks/use-countdown";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { BackButton, PageIntro } from "@/components/layout/screen";
import { OtpInput, ResendLine } from "@/components/forms/otp-input";

function VerifyOtp() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const [otp, setOtp] = useState("");
  const { seconds, restart } = useCountdown(60);

  const update = useMutation({
    mutationFn: () =>
      api({
        endpoint: "users/update-withdrawal-setting",
        method: "PUT",
        body: {
          withdrawalSettingId: params.get("withdrawalSettingId"),
          accountNumber: params.get("accountNumber"),
          bankCode: params.get("bankCode"),
          otp,
        },
      }),
    onSuccess: () => {
      showToast({ type: "success", text1: "Withdrawal setting updated" });
      queryClient.invalidateQueries({ queryKey: ["users-me"] });
      router.push("/profile/setting-success");
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Failed to verify OTP", text2: error.message || "Something went wrong" }),
  });

  const resend = useMutation({
    mutationFn: () => api({ endpoint: "auth/resend-otp", method: "POST", body: { email: user?.email } }),
    onSuccess: () => {
      showToast({ type: "success", text1: "OTP resent successfully" });
      restart(30);
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Failed to resend OTP", text2: error.message || "Something went wrong" }),
  });

  function verify() {
    if (otp.length < 6) return showToast({ type: "error", text1: "Please enter a valid OTP" });
    update.mutate();
  }

  return (
    <div className="flex flex-1 flex-col px-4 pt-12 pb-10">
      {(update.isPending || resend.isPending) && <Loader />}
      <BackButton />
      <div className="mt-10">
        <PageIntro title="OTP Verification">
          Kindly enter the 6-digit verification code sent to{" "}
          <span className="font-semibold text-foreground">{user?.email}</span> to save this change
        </PageIntro>
      </div>
      <div className="mt-14">
        <OtpInput value={otp} onChange={setOtp} />
      </div>
      <Button size="cta" className="mt-16" onClick={verify} disabled={update.isPending}>
        Verify
      </Button>
      <div className="mt-8">
        <ResendLine seconds={seconds} onResend={() => resend.mutate()} />
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense>
      <VerifyOtp />
    </Suspense>
  );
}
