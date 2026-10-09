"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { BackButton, PageIntro } from "@/components/layout/screen";
import { Loader } from "@/components/feedback/loader";
import { TextField } from "@/components/forms/field";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const request = useMutation({
    mutationFn: () => api({ endpoint: "auth/forgot-password", method: "POST", body: { email: emailOrPhone } }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Request Failed", text2: res?.message || "Please try again later" });
        return;
      }
      showToast({
        type: "success",
        text1: "Reset Link Sent",
        text2: "Follow the instructions sent to your email or phone",
      });
      router.replace(`/auth/reset-password?emailOrPhone=${encodeURIComponent(emailOrPhone)}`);
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Something went wrong", text2: error.message || "Please check your input" }),
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailOrPhone) return showToast({ type: "error", text1: "Email or phone number is required" });
    request.mutate();
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-1 flex-col px-4 pt-14 pb-10">
      {request.isPending && <Loader />}
      <BackButton variant="chevron" />
      <div className="mt-10">
        <PageIntro title="Forgot Password">Reset your password to regain access</PageIntro>
      </div>
      <div className="mt-10">
        <TextField
          label="Email or Phone Number"
          autoComplete="username"
          placeholder="Enter your email or phone number"
          value={emailOrPhone}
          onValueChange={setEmailOrPhone}
        />
      </div>
      <p className="mt-6 text-center text-base">
        Remember your Password?{" "}
        <Link href="/sign-in/login" replace className="font-medium text-brand">
          Sign In
        </Link>
      </p>
      <Button type="submit" size="cta" className="mt-10" disabled={request.isPending}>
        {request.isPending ? "Processing..." : "Continue"}
      </Button>
    </form>
  );
}
