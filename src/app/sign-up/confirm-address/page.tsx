"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useOnboardingDraft } from "@/lib/onboarding-draft";
import { uploadDocument } from "@/lib/upload-document";
import { showToast } from "@/lib/toast";
import { Loader } from "@/components/feedback/loader";
import { OnboardingScreen } from "@/components/layout/onboarding-screen";
import { FileChip, TextField, UploadDropzone, checkFile } from "@/components/forms/field";

const ALLOWED = ["application/pdf", "image/png", "image/jpeg"];

export default function ConfirmAddressPage() {
  const router = useRouter();
  const [draft, update] = useOnboardingDraft();
  const [address, setAddress] = useState(draft.userAddress ?? "");
  const [bill, setBill] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!address || !bill) {
      return showToast({
        type: "error",
        text1: "Please provide your house address and upload a recent utility bill.",
      });
    }
    try {
      setLoading(true);
      const utilityBillUrl = await uploadDocument(bill);
      update({ userAddress: address, utilityBillUrl });
      router.replace("/sign-up/confirm-bvn");
    } catch (err) {
      showToast({ type: "error", text1: (err as Error).message || "Utility bill upload failed, please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <OnboardingScreen
      step={3}
      title="Confirm Your Address"
      description="This helps us keep your account secure and unlocks access to funding."
      primaryLabel={loading ? "Uploading..." : "Continue"}
      primaryDisabled={loading}
      onPrimary={handleSubmit}
      onSkip={() => router.replace("/sign-up/confirm-bvn")}
    >
      {loading && <Loader message="Uploading Utility Bill..." />}
      <div className="flex flex-col gap-5">
        <TextField
          label="House Address"
          autoComplete="street-address"
          placeholder="Enter Valid Address"
          value={address}
          onValueChange={setAddress}
        />
        <p className="text-center text-sm font-medium text-muted-foreground">AND</p>
        <UploadDropzone
          title="Upload a recent utility bill"
          accept={ALLOWED.join(",")}
          formats="PDF, PNG, JPEG"
          error={error}
          onFiles={([picked]) => {
            const result = checkFile(picked, ALLOWED, 5);
            setBill(result.file);
            setError(result.error);
          }}
        />
        {bill && <FileChip file={bill} onRemove={() => setBill(null)} />}
      </div>
    </OnboardingScreen>
  );
}
