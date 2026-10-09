"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { uploadDocument } from "@/lib/upload-document";
import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { BackButton, PageIntro, StepProgress } from "@/components/layout/screen";
import { FileChip, UploadDropzone, checkFile } from "@/components/forms/field";

export default function VerifyIdentityKycPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!file) return showToast({ type: "error", text1: "Please upload a valid government-issued ID." });
    try {
      setLoading(true);
      const url = await uploadDocument(file);
      router.push(`/incomplete-kyc/confirm-address-kyc?governmentIssuedIDUrl=${encodeURIComponent(url)}`);
    } catch (err) {
      showToast({ type: "error", text1: (err as Error).message || "Failed to upload document" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      {loading && <Loader message="Uploading ID..." />}
      <main className="flex flex-1 flex-col gap-8 px-4 pt-12">
        <BackButton />
        <StepProgress total={2} current={1} />
        <PageIntro title="Verify Your Identity">This helps us keep your account secure and unlocks access to funding.</PageIntro>
        <div className="flex flex-col gap-4">
          <UploadDropzone
            title="Upload a Government-Issued ID"
            description="(e.g., National ID, Driver’s License, Voter’s Card, Passport)"
            accept="application/pdf"
            formats="PDF files only"
            error={error}
            onFiles={([picked]) => {
              const r = checkFile(picked, ["application/pdf"], 5);
              setFile(r.file);
              setError(r.error);
            }}
          />
          {file && <FileChip file={file} onRemove={() => setFile(null)} />}
        </div>
      </main>
      <div className="sticky bottom-0 flex flex-col items-center gap-6 bg-background px-4 pt-3 pb-8">
        <Button size="cta" onClick={submit} disabled={loading}>
          Continue
        </Button>
        <button type="button" onClick={() => router.push("/incomplete-kyc/confirm-address-kyc")} className="text-base font-medium text-brand">
          Skip for Now
        </button>
      </div>
    </div>
  );
}
