"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { uploadDocument } from "@/lib/upload-document";
import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { BackButton, PageIntro, StepProgress } from "@/components/layout/screen";
import { FileChip, TextField, UploadDropzone, checkFile } from "@/components/forms/field";

const ALLOWED = ["application/pdf", "image/png", "image/jpeg"];

function ConfirmAddressKyc() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const governmentIssuedIDUrl = useSearchParams().get("governmentIssuedIDUrl") ?? "";
  const [address, setAddress] = useState("");
  const [bill, setBill] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const update = useMutation({
    mutationFn: (body: object) => api({ endpoint: "users/update", method: "PUT", body }),
    onSuccess: () => {
      showToast({ type: "success", text1: "Profile updated" });
      queryClient.invalidateQueries({ queryKey: ["users-me"] });
      router.push("/profile");
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Update failed", text2: err.message || "Something went wrong" }),
  });

  async function submit() {
    if (!address || !bill) {
      return showToast({ type: "error", text1: "Please provide your house address and upload a recent utility bill." });
    }
    try {
      setUploading(true);
      const utilityBillUrl = await uploadDocument(bill);
      update.mutate({ address, utilityBillUrl, governmentIssuedIDUrl });
    } catch (err) {
      showToast({ type: "error", text1: (err as Error).message || "Failed to upload utility bill" });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      {(uploading || update.isPending) && <Loader message={uploading ? "Uploading Utility Bill..." : undefined} />}
      <main className="flex flex-1 flex-col gap-8 px-4 pt-12">
        <BackButton />
        <StepProgress total={2} current={2} />
        <PageIntro title="Confirm Your Address">This helps us keep your account secure and unlocks access to funding.</PageIntro>
        <div className="flex flex-col gap-5">
          <TextField label="House Address" autoComplete="street-address" placeholder="Enter Valid Address" value={address} onValueChange={setAddress} />
          <p className="text-center text-sm font-medium text-muted-foreground">AND</p>
          <UploadDropzone
            title="Upload a recent utility bill"
            accept={ALLOWED.join(",")}
            formats="PDF, PNG, JPEG"
            error={error}
            onFiles={([picked]) => {
              const r = checkFile(picked, ALLOWED, 5);
              setBill(r.file);
              setError(r.error);
            }}
          />
          {bill && <FileChip file={bill} onRemove={() => setBill(null)} />}
        </div>
      </main>
      <div className="sticky bottom-0 flex flex-col items-center gap-6 bg-background px-4 pt-3 pb-8">
        <Button size="cta" onClick={submit} disabled={uploading || update.isPending}>
          Continue
        </Button>
        <button
          type="button"
          onClick={() => update.mutate({ address, governmentIssuedIDUrl })}
          className="text-base font-medium text-brand"
        >
          Skip for Now
        </button>
      </div>
    </div>
  );
}

export default function ConfirmAddressKycPage() {
  return (
    <Suspense>
      <ConfirmAddressKyc />
    </Suspense>
  );
}
