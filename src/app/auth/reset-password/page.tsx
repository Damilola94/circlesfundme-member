"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/layout/screen";
import { Loader } from "@/components/feedback/loader";
import { PasswordField } from "@/components/forms/field";

function ResetPasswordForm() {
  const router = useRouter();
  const emailOrPhone = useSearchParams().get("emailOrPhone") ?? "";
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const reset = useMutation({
    mutationFn: () =>
      api({ endpoint: "auth/reset-password", method: "POST", body: { email: emailOrPhone, otp, newPassword } }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Reset Failed", text2: res?.message || "Unable to reset password" });
        return;
      }
      showToast({ type: "success", text1: "Password Reset Successful", text2: "You can now log in" });
      router.replace("/sign-in/login");
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Error", text2: error.message || "Something went wrong" }),
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      return showToast({ type: "error", text1: "All fields are required" });
    }
    if (newPassword.length < 6) {
      return showToast({
        type: "error",
        text1: "Password too short",
        text2: "Password must be at least 6 characters",
      });
    }
    if (newPassword !== confirmPassword) return showToast({ type: "error", text1: "Passwords do not match" });
    reset.mutate();
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-1 flex-col px-4 pt-14 pb-10">
      {reset.isPending && <Loader />}
      <div className="pt-6">
        <PageIntro title="Reset Password" />
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <PasswordField
          label="OTP"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="Enter the OTP sent to your email/phone"
          value={otp}
          onValueChange={setOtp}
        />
        <PasswordField
          label="New Password"
          autoComplete="new-password"
          placeholder="Enter New Password"
          value={newPassword}
          onValueChange={setNewPassword}
        />
        <PasswordField
          label="Confirm Password"
          autoComplete="new-password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onValueChange={setConfirmPassword}
        />
      </div>
      <Button type="submit" size="cta" className="mt-12" disabled={reset.isPending}>
        {reset.isPending ? "Resetting..." : "Reset Password"}
      </Button>
      <p className="mt-8 text-center text-base">
        Back to{" "}
        <Link href="/sign-in/login" className="font-medium text-brand">
          Login
        </Link>
      </p>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
