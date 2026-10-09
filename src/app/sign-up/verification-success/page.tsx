"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, CircleCheck } from "lucide-react";

import { api, updateSession } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { clearSignupDraft, getSignupDraft } from "@/lib/signup-draft";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";

export default function VerificationSuccessPage() {
  const router = useRouter();
  const [draft] = useState(getSignupDraft);

  useEffect(() => {
    if (!draft) router.replace("/sign-in/login");
  }, [draft, router]);

  // Log the new account in, then start KYC onboarding.
  const login = useMutation({
    mutationFn: () =>
      api({ endpoint: "auth/login", method: "POST", body: { email: draft?.email, password: draft?.password } }),
    onSuccess: async () => {
      await updateSession({ isKycComplete: false, seenOnboarding: true });
      clearSignupDraft();
      router.replace("/sign-up/personal-info");
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Login Failed", text2: error.message || "Something went wrong" }),
  });

  if (!draft) return null;

  return (
    <div className="flex flex-1 flex-col justify-center px-4 pb-10">
      {login.isPending && <Loader />}
      <div className="flex flex-col items-center gap-3 text-center">
        <CircleCheck className="size-[172px] text-brand" strokeWidth={2.2} aria-hidden />
        <h1 className="mt-6 text-[28px] font-medium">Verification Successful</h1>
        <p className="text-base text-muted-foreground">Now Let’s Set You Up.</p>
      </div>
      <Button size="cta" className="mt-20" onClick={() => login.mutate()} disabled={login.isPending}>
        Proceed to Onboarding
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
