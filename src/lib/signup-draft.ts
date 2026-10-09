"use client";

/**
 * Credentials entered on Create Account, needed again on Verify Email (to create the account)
 * and Verification Success (to log in). Kept in memory only; a page reload restarts sign-up.
 */
export type SignupDraft = {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agentCode: string;
  otpMethod: "Email" | "SMS";
};

let draft: SignupDraft | null = null;

export function setSignupDraft(value: SignupDraft) {
  draft = value;
}

export function getSignupDraft() {
  return draft;
}

export function clearSignupDraft() {
  draft = null;
}
