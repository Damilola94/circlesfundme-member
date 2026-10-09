"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { saveCheckout } from "@/lib/checkout";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { FormScreen } from "@/components/layout/screen";
import { PasswordField } from "@/components/forms/field";

export default function VerifyCardOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const verify = useMutation({
    mutationFn: () => api<{ authorizationUrl?: string; reference?: string }>({ endpoint: "users/update-linked-card", method: "POST", body: { otp } }),
    onSuccess: (res) => {
      if (!isOk(res) || !res.data?.authorizationUrl) {
        showToast({ type: "error", text1: "Verification Failed", text2: res?.message || "Please try again later" });
        return;
      }
      showToast({ type: "success", text1: "OTP Verified", text2: "Your OTP has been successfully verified" });
      saveCheckout({
        url: res.data.authorizationUrl,
        reference: res.data.reference,
        title: "Update Card",
        verify: { type: "contribution" },
        successHref: "/profile",
        successMessage: "Card updated",
        cancelHref: "/profile",
      });
      router.push("/checkout");
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Error", text2: err.message || "Something went wrong" }),
  });

  return (
    <FormScreen
      title="Update Card Settings"
      footer={
        <Button size="cta" onClick={() => verify.mutate()} disabled={!otp || verify.isPending}>
          Verify
        </Button>
      }
    >
      {verify.isPending && <Loader />}
      <div className="mt-4">
        <PasswordField
          label="OTP"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="Enter the OTP sent to your email"
          value={otp}
          onValueChange={setOtp}
        />
      </div>
    </FormScreen>
  );
}
