"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { showToast } from "@/lib/toast";
import { useOnboardingDraft } from "@/lib/onboarding-draft";
import { validateNigerianPhone } from "@/lib/validation";
import { OnboardingScreen } from "@/components/layout/onboarding-screen";
import { DateField, SelectField, TextField } from "@/components/forms/field";

const today = new Date().toISOString().slice(0, 10);

function ageFrom(iso: string) {
  const dob = new Date(iso);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}

/** ISO yyyy-mm-dd -> DD/MM/YYYY (the format the rest of onboarding expects). */
const toDisplayDate = (iso: string) => iso.split("-").reverse().join("/");
const fromDisplayDate = (dmy?: string) => (dmy ? dmy.split("/").reverse().join("-") : "");

export default function PersonalInfoPage() {
  const router = useRouter();
  const [draft, update] = useOnboardingDraft();
  const [fullName, setFullName] = useState(draft.fullName ?? "");
  const [phone, setPhone] = useState(draft.phone ?? "");
  const [dob, setDob] = useState(fromDisplayDate(draft.dob));
  const [gender, setGender] = useState(
    draft.gender === "NotSet" ? "Not Specified" : (draft.gender ?? "")
  );

  function handleSubmit() {
    if (!fullName || !phone || !dob || !gender) {
      return showToast({ type: "error", text1: "All fields are required" });
    }
    if (fullName.trim().split(/\s+/).length < 2) {
      return showToast({
        type: "error",
        text1: "Full Name Required",
        text2: "Please enter both your first and last name.",
      });
    }
    if (!validateNigerianPhone(phone)) {
      return showToast({
        type: "error",
        text1: "Invalid Phone Number",
        text2: "Enter a valid Nigerian phone number (e.g. 0803..., 0901..., 0706...).",
      });
    }
    if (ageFrom(dob) < 18) {
      return showToast({ type: "error", text1: "Invalid Age", text2: "You must be at least 18 years old to continue." });
    }
    update({
      fullName: fullName.trim(),
      phone: phone.replace(/\D/g, ""),
      dob: toDisplayDate(dob),
      gender: gender === "Not Specified" ? "NotSet" : gender,
    });
    router.replace("/sign-up/verify-identity");
  }

  return (
    <OnboardingScreen
      step={1}
      title="Let’s Get to Know You"
      description="Just a few quick details to get you started."
      onPrimary={handleSubmit}
      footerNote={
        <p className="text-base">
          Already have an account?{" "}
          <Link href="/sign-in/login" replace className="font-medium text-brand">
            Sign In
          </Link>
        </p>
      }
    >
      <div className="flex flex-col gap-5">
        <TextField
          label="Full Name"
          autoComplete="name"
          placeholder="Enter Your Full name"
          value={fullName}
          onValueChange={setFullName}
        />
        <TextField
          label="Phone Number"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={11}
          placeholder="Enter Your Phone Number"
          value={phone}
          onValueChange={(v) => setPhone(v.replace(/\D/g, ""))}
        />
        <DateField label="Date of Birth" value={dob} onValueChange={setDob} max={today} min="1900-01-01" />
        <SelectField
          label="Gender"
          placeholder="Select Gender"
          options={["Male", "Female", "Not Specified"]}
          value={gender}
          onSelect={setGender}
        />
      </div>
    </OnboardingScreen>
  );
}
