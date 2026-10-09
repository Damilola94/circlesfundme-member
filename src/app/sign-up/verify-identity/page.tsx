"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useOnboardingDraft } from "@/lib/onboarding-draft";
import { uploadDocument } from "@/lib/upload-document";
import { showToast } from "@/lib/toast";
import { Loader } from "@/components/feedback/loader";
import { OnboardingScreen } from "@/components/layout/onboarding-screen";
import { FileChip, UploadDropzone, checkFile } from "@/components/forms/field";

export default function VerifyIdentityPage() {
  const router = useRouter();
  const [, update] = useOnboardingDraft();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!file) return showToast({ type: "error", text1: "Please upload a valid government-issued ID." });
    try {
      setLoading(true);
      const documentUrl = await uploadDocument(file);
      update({ documentUrl });
      router.replace("/sign-up/confirm-address");
    } catch (err) {
      showToast({ type: "error", text1: (err as Error).message || "Upload failed, please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <OnboardingScreen
      step={2}
      title="Verify Your Identity"
      description="This helps us keep your account secure and unlocks access to funding."
      primaryLabel={loading ? "Uploading..." : "Continue"}
      primaryDisabled={loading}
      onPrimary={handleSubmit}
      onSkip={() => router.replace("/sign-up/confirm-address")}
    >
      {loading && <Loader message="Uploading ID..." />}
      <div className="flex flex-col gap-4">
        <UploadDropzone
          title="Upload a Government-Issued ID"
          description="(e.g., National ID, Driver’s License, Voter’s Card, Passport)"
          accept="application/pdf"
          formats="PDF files only"
          error={error}
          onFiles={([picked]) => {
            const result = checkFile(picked, ["application/pdf"], 5);
            setFile(result.file);
            setError(result.error);
          }}
        />
        {file && <FileChip file={file} onRemove={() => setFile(null)} />}
      </div>
    </OnboardingScreen>
  );
}
