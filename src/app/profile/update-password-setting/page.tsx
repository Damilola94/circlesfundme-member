"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { FormScreen } from "@/components/layout/screen";
import { PasswordField } from "@/components/forms/field";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [otp, setOtp] = useState("");
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const change = useMutation({
    mutationFn: () =>
      api({
        endpoint: "users/change-password",
        method: "POST",
        body: { otp, currentPassword: current, newPassword: next, confirmNewPassword: confirm },
      }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Password Update Failed", text2: res?.message || "Please try again later" });
        return;
      }
      showToast({ type: "success", text1: "Password Updated", text2: "Your password has been changed successfully" });
      queryClient.invalidateQueries({ queryKey: ["users-me"] });
      router.push("/profile");
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Something went wrong", text2: error.message || "Please try again later" }),
  });

  function submit() {
    if (!otp || !current || !next || !confirm) return showToast({ type: "error", text1: "All fields are required" });
    if (next !== confirm) return showToast({ type: "error", text1: "Passwords do not match" });
    change.mutate();
  }

  return (
    <FormScreen
      title="Update Password"
      footer={
        <Button size="cta" onClick={submit} disabled={change.isPending}>
          Continue
        </Button>
      }
    >
      {change.isPending && <Loader message="Updating Password..." />}
      <div className="mt-4 flex flex-col gap-5">
        <PasswordField
          label="OTP"
          inputMode="numeric"
          maxLength={6}
          autoComplete="one-time-code"
          placeholder="Enter the OTP sent to your mail"
          value={otp}
          onValueChange={setOtp}
        />
        <PasswordField label="Current Password" autoComplete="current-password" placeholder="Enter Current Password" value={current} onValueChange={setCurrent} />
        <PasswordField label="New Password" autoComplete="new-password" placeholder="Enter Your New Password" value={next} onValueChange={setNext} />
        <PasswordField label="Confirm New Password" autoComplete="new-password" placeholder="Enter Your New Password" value={confirm} onValueChange={setConfirm} />
      </div>
    </FormScreen>
  );
}
