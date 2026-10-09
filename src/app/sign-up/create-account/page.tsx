"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { setSignupDraft } from "@/lib/signup-draft";
import {
  PASSWORD_RULE_MESSAGE,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/layout/screen";
import { Loader } from "@/components/feedback/loader";
import { CheckboxRow, PasswordField, SelectField, TextField } from "@/components/forms/field";

const TERMS_URL = "https://www.circlesfundme.com/terms-and-condition";
type OtpMethod = "Email" | "SMS";

export default function CreateAccountPage() {
  const router = useRouter();
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [otpMethod, setOtpMethod] = useState<OtpMethod>("Email");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agentCode, setAgentCode] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const passwordTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(passwordTimer.current), []);

  function handlePasswordChange(value: string) {
    setPassword(value);
    clearTimeout(passwordTimer.current);
    passwordTimer.current = setTimeout(() => setIsPasswordInvalid(!validatePassword(value)), 800);
  }

  const sendOtp = useMutation({
    mutationFn: (body: object) =>
      api({
        endpoint: otpMethod === "Email" ? "accounts/send-onboarding-otp" : "accounts/send-sms-otp",
        method: "POST",
        body,
      }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "OTP request failed", text2: res?.message || "Try again" });
        return;
      }
      showToast({
        type: "success",
        text1: otpMethod === "Email" ? "Email OTP Sent Successfully" : "SMS OTP Sent Successfully",
      });
      setSignupDraft({ email: email.trim(), phoneNumber, password, confirmPassword, agentCode, otpMethod });
      router.replace("/sign-up/verify-email");
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Error", text2: error.message || "Something went wrong" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password || !confirmPassword) {
      return showToast({ type: "error", text1: "All fields are required" });
    }
    if (!validateEmail(trimmedEmail)) {
      return showToast({ type: "error", text1: "Invalid email address", text2: "Please enter a valid email format" });
    }
    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      return showToast({
        type: "error",
        text1: "Invalid phone number",
        text2: "Phone number must be in 234XXXXXXXXXX format",
      });
    }
    if (otpMethod === "SMS" && !phoneNumber) {
      return showToast({ type: "error", text1: "Phone number is required to receive an SMS OTP" });
    }
    if (!validatePassword(password)) {
      return showToast({ type: "error", text1: "Invalid password format", text2: PASSWORD_RULE_MESSAGE });
    }
    if (password !== confirmPassword) {
      return showToast({ type: "error", text1: "Passwords do not match" });
    }
    if (!hasAcceptedTerms) {
      return showToast({
        type: "error",
        text1: "Terms not accepted",
        text2: "Please accept the Terms & Conditions to continue",
      });
    }
    sendOtp.mutate(otpMethod === "Email" ? { email: trimmedEmail, password } : { phoneNumber });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col px-4 pt-14 pb-10">
      {sendOtp.isPending && <Loader />}
      <div className="pt-6">
        <PageIntro title="Create Account">
          Join the Circle. Start saving, growing, and accessing funds the smart way
        </PageIntro>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <TextField
          label="Email Address"
          type="email"
          autoComplete="email"
          placeholder="Enter Your Email Address"
          value={email}
          onValueChange={setEmail}
        />
        <TextField
          label="Phone Number (Optional)"
          type="tel"
          inputMode="numeric"
          maxLength={13}
          placeholder="2349034059032"
          value={phoneNumber}
          onValueChange={(v) => setPhoneNumber(v.replace(/\D/g, ""))}
        />
        <SelectField
          label="Where should we send your OTP?"
          placeholder="Choose OTP delivery method"
          options={["Email", "SMS"]}
          value={otpMethod}
          onSelect={(v) => setOtpMethod(v as OtpMethod)}
        />
        <PasswordField
          label="Password"
          autoComplete="new-password"
          placeholder="Enter Your Password"
          value={password}
          onValueChange={handlePasswordChange}
          error={isPasswordInvalid ? PASSWORD_RULE_MESSAGE : undefined}
        />
        <PasswordField
          label="Confirm Password"
          autoComplete="new-password"
          placeholder="Re-enter Password"
          value={confirmPassword}
          onValueChange={setConfirmPassword}
        />
        <TextField
          label="Agent Code (Optional)"
          placeholder="Enter Agent Code"
          value={agentCode}
          onValueChange={setAgentCode}
        />
        <CheckboxRow checked={hasAcceptedTerms} onCheckedChange={setHasAcceptedTerms}>
          I agree to{" "}
          <a href={TERMS_URL} target="_blank" rel="noreferrer" className="font-medium text-brand">
            Terms &amp; Conditions
          </a>
        </CheckboxRow>
      </div>

      <Button type="submit" size="cta" className="mt-10" disabled={!hasAcceptedTerms || sendOtp.isPending}>
        {sendOtp.isPending ? "Sending OTP..." : "Create Account"}
      </Button>
      <p className="mt-8 text-center text-base text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in/login" replace className="font-medium text-brand">
          Sign In
        </Link>
      </p>
      <p className="mt-6 text-center text-sm leading-relaxed text-muted-foreground">
        By creating an account, you agree to our{" "}
        <a href={TERMS_URL} target="_blank" rel="noreferrer" className="text-brand">
          Terms &amp; Conditions and Cooperative Agreement
        </a>
      </p>
    </form>
  );
}
