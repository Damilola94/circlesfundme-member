"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { showToast } from "@/lib/toast";
import { OnboardingScreen } from "@/components/layout/onboarding-screen";
import { OptionCards } from "@/components/forms/option-card";

const SCHEMES = [
  {
    value: "Savings Only",
    title: "Savings Only",
    description: "Users cannot access loan features, but are not subject to service charge rules",
  },
  {
    value: "Full Scheme",
    title: "Full Scheme",
    description: "Users can access loans but are subject to service charge rules",
  },
];

export default function SelectSchemePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  function handleContinue() {
    if (!selected) return showToast({ type: "error", text1: "Please select a scheme to continue." });
    router.push(selected === "Full Scheme" ? "/sign-up/contribution-scheme" : "/sign-up/savings-scheme");
  }

  return (
    <OnboardingScreen
      step={6}
      title="Select Scheme"
      description="Select how you want to contribute and grow your funds."
      onPrimary={handleContinue}
    >
      <p className="mb-4 text-base">Your Scheme</p>
      <OptionCards options={SCHEMES} value={selected} onValueChange={setSelected} />
    </OnboardingScreen>
  );
}
