"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { getSignupDraft } from "@/lib/signup-draft";
import { useCountdown } from "@/hooks/use-countdown";
import { Button } from "@/components/ui/button";
import { BackButton, PageIntro } from "@/components/layout/screen";
import { Loader } from "@/components/feedback/loader";
import { OtpInput, ResendLine } from "@/components/forms/otp-input";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [draft] = useState(getSignupDraft);
  const [otp, setOtp] = useState("");
  const { seconds, restart } = useCountdown(60);
  const isSms = draft?.otpMethod === "SMS";

  // Credentials are kept in memory only; after a reload, start sign-up again.
  useEffect(() => {
    if (!draft) router.replace("/sign-up/create-account");
  }, [draft, router]);

  const verify = useMutation({
    mutationFn: (code: string) =>
      api({
        endpoint: "accounts/create-new",
        method: "POST",
        body: {
          email: draft?.email,
          agentCode: draft?.agentCode,
          phoneNumber: draft?.phoneNumber,
          password: draft?.password,
          confirmPassword: draft?.confirmPassword,
          otp: code,
        },
      }),
    onSuccess: () => {
      showToast({
        type: "success",
        text1: isSms ? "Phone number verified successfully" : "Email verified successfully",
      });
      router.replace("/sign-up/verification-success");
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Verification Failed", text2: error.message || "Something went wrong" }),
  });

  const resend = useMutation({
    mutationFn: () =>
      api({
        endpoint: isSms ? "accounts/send-sms-otp" : "accounts/send-onboarding-otp",
        method: "POST",
        body: isSms ? { phoneNumber: draft?.phoneNumber } : { email: draft?.email, password: draft?.password },
      }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Failed to resend OTP", text2: res?.message });
        return;
      }
      showToast({ type: "success", text1: "OTP resent successfully" });
      restart(30);
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Failed to resend OTP", text2: error.message || "Something went wrong" }),
  });

  function handleVerify() {
    const code = otp.trim();
    if (!code) return showToast({ type: "error", text1: "Please enter the OTP" });
    if (code.length !== 6) return showToast({ type: "error", text1: "OTP must be exactly 6 digits" });
    if (!/^\d{6}$/.test(code)) return showToast({ type: "error", text1: "OTP must contain only numbers" });
    verify.mutate(code);
  }

  if (!draft) return null;

  return (
    <div className="flex flex-1 flex-col px-4 pt-14 pb-10">
      {(verify.isPending || resend.isPending) && <Loader />}
      <BackButton href="/sign-up/create-account" variant="chevron" />
      <div className="mt-10">
        <PageIntro title={isSms ? "Verify Phone Number" : "Verify Email Address"}>
          Kindly enter the 6-digit verification code sent to{" "}
          <span className="font-semibold text-foreground">{isSms ? draft.phoneNumber : draft.email}</span>.
        </PageIntro>
      </div>
      <div className="mt-16">
        <OtpInput value={otp} onChange={setOtp} />
      </div>
      <Button size="cta" className="mt-20" onClick={handleVerify} disabled={verify.isPending}>
        {verify.isPending ? "Verifying..." : "Verify"}
      </Button>
      <div className="mt-8">
        <ResendLine seconds={seconds} onResend={() => resend.mutate()} />
      </div>
    </div>
  );
}
