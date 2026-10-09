"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/layout/screen";
import { Loader } from "@/components/feedback/loader";
import { PasswordField, TextField } from "@/components/forms/field";

export default function LoginPage() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const login = useMutation({
    mutationFn: (body: { email: string; password: string }) => api({ endpoint: "auth/login", method: "POST", body }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Login Failed", text2: res?.message || "Invalid credentials" });
        return;
      }
      showToast({ type: "success", text1: "Login Successful" });
      router.replace(res?.data?.onboardingStatus === "InProgress" ? "/sign-in/welcome-onboarding" : "/dashboard");
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Error", text2: error.message || "Something went wrong" }),
  });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!emailOrPhone || !password) return showToast({ type: "error", text1: "All fields are required" });
    login.mutate({ email: emailOrPhone, password: password.trim() });
  }

  return (
    <form onSubmit={handleLogin} noValidate className="flex flex-1 flex-col px-4 pt-14 pb-10">
      {login.isPending && <Loader />}
      <div className="pt-6">
        <PageIntro title="Log In">Welcome back to Circlesfundme</PageIntro>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <TextField
          label="Email Address"
          type="email"
          autoComplete="username"
          placeholder="Enter Your Email Address"
          value={emailOrPhone}
          onValueChange={setEmailOrPhone}
        />
        <div className="flex flex-col gap-3">
          <PasswordField
            label="Password"
            autoComplete="current-password"
            placeholder="Enter Your Password"
            value={password}
            onValueChange={setPassword}
          />
          <Link href="/auth/forgot-password" className="self-end text-sm text-brand">
            Forgotten Password?
          </Link>
        </div>
      </div>

      <Button type="submit" size="cta" className="mt-12" disabled={login.isPending}>
        {login.isPending ? "Logging in..." : "Log In"}
      </Button>
      <p className="mt-8 text-center text-base">
        Don’t have an account?{" "}
        <Link href="/sign-up/create-account" className="font-medium text-brand">
          Create Account
        </Link>
      </p>
    </form>
  );
}
