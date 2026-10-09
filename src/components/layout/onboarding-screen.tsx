"use client";

import { Button } from "@/components/ui/button";
import { PageIntro, StepProgress } from "@/components/layout/screen";

export const ONBOARDING_STEPS = 7;

/** Shared frame for the 7-step KYC onboarding: progress bar, title, body, primary/skip actions. */
export function OnboardingScreen({
  step,
  title,
  description,
  children,
  primaryLabel = "Continue",
  onPrimary,
  primaryDisabled,
  onSkip,
  skipLabel = "Skip for Now",
  footerNote,
}: {
  step: number;
  title: string;
  description?: string;
  children?: React.ReactNode;
  primaryLabel?: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  onSkip?: () => void;
  skipLabel?: string;
  footerNote?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <main className="flex flex-1 flex-col px-4 pt-14">
        <StepProgress total={ONBOARDING_STEPS} current={step} />
        <div className="mt-10">
          <PageIntro title={title}>{description}</PageIntro>
        </div>
        <div className="mt-10 flex flex-1 flex-col">{children}</div>
      </main>
      <div className="sticky bottom-0 flex flex-col items-center gap-6 bg-background px-4 pt-4 pb-8">
        <Button size="cta" onClick={onPrimary} disabled={primaryDisabled}>
          {primaryLabel}
        </Button>
        {onSkip && (
          <button type="button" onClick={onSkip} className="text-base font-medium text-brand">
            {skipLabel}
          </button>
        )}
        {footerNote}
      </div>
    </div>
  );
}
