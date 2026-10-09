"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useOnboardingDraft } from "@/lib/onboarding-draft";
import { showToast } from "@/lib/toast";
import { OnboardingScreen } from "@/components/layout/onboarding-screen";
import { TextField } from "@/components/forms/field";

export default function ConfirmBvnPage() {
  const router = useRouter();
  const [draft, update] = useOnboardingDraft();
  const [bvn, setBvn] = useState(draft.bvn ?? "");

  function handleSubmit() {
    if (!bvn) return showToast({ type: "error", text1: "Please provide your BVN" });
    if (bvn.length !== 11) return showToast({ type: "error", text1: "BVN must be exactly 11 digits" });
    update({ bvn });
    router.replace("/sign-up/take-selfie");
  }

  return (
    <OnboardingScreen
      step={4}
      title="Confirm Your BVN"
      description="This helps us keep your account secure and unlocks access to funding."
      onPrimary={handleSubmit}
    >
      <TextField
        label="BVN"
        inputMode="numeric"
        maxLength={11}
        placeholder="Enter Your BVN"
        value={bvn}
        onValueChange={(v) => setBvn(v.replace(/\D/g, ""))}
      />
    </OnboardingScreen>
  );
}
