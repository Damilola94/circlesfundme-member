"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Camera, RefreshCw } from "lucide-react";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { useOnboardingDraft } from "@/lib/onboarding-draft";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";

type Facing = "user" | "environment";

export default function SelfieCameraPage() {
  const router = useRouter();
  const [draft] = useOnboardingDraft();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facing, setFacing] = useState<Facing>("user");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<{ blob: Blob; url: string } | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    if (photo) return;
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing, width: { ideal: 1080 }, height: { ideal: 1440 } },
          audio: false,
        });
        if (cancelled) return stream.getTracks().forEach((t) => t.stop());
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraError(null);
      } catch {
        setCameraError("Camera permission is required.");
      }
    })();
    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [facing, photo, stopCamera]);

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo.url);
  }, [photo]);

  function takePhoto() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (facing === "user") {
      // Store the selfie as the user saw it (mirrored preview).
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => blob && setPhoto({ blob, url: URL.createObjectURL(blob) }), "image/jpeg", 0.92);
  }

  const verify = useMutation({
    mutationFn: (form: FormData) =>
      api({ endpoint: "accounts/verify-bvn-selfie", method: "POST", body: form, multipart: true }),
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({
          type: "error",
          text1: "Verification Failed",
          text2: res?.message || "BVN selfie verification failed",
        });
        return;
      }
      showToast({ type: "success", text1: "Verification Successful" });
      stopCamera();
      router.replace("/sign-up/select-scheme");
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Error", text2: error.message || "Failed to verify BVN selfie" }),
  });

  function handleProceed(blob: Blob) {
    const form = new FormData();
    form.append("bvn", draft.bvn ?? "");
    form.append("selfie", blob, `selfie_${Date.now()}.jpg`);
    verify.mutate(form);
  }

  if (photo) {
    return (
      <div className="relative flex min-h-dvh flex-1 flex-col bg-black">
        {verify.isPending && <Loader message="Verifying BVN and selfie..." />}
        {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
        <img src={photo.url} alt="Your selfie" className="absolute inset-0 size-full object-cover" />
        <div className="relative mt-auto flex gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pt-16 pb-8">
          <Button size="cta" variant="white" className="flex-1" onClick={() => setPhoto(null)}>
            Retake
          </Button>
          <Button size="cta" className="flex-1 bg-brand hover:bg-brand/90" onClick={() => handleProceed(photo.blob)}>
            Proceed
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-dvh flex-1 flex-col overflow-hidden bg-black text-white">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 size-full object-cover ${facing === "user" ? "-scale-x-100" : ""}`}
      />

      {/* Oval face guide, as in the design. */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[14%]">
        <div className="aspect-[3/4] w-[80%] rounded-[50%] border-2 border-dashed border-white/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.25)]" />
      </div>

      <button
        type="button"
        onClick={() => router.replace("/sign-up/confirm-bvn")}
        aria-label="Back"
        className="absolute top-12 left-4 flex size-11 items-center justify-center rounded-full bg-black/30"
      >
        <ArrowLeft className="size-6" />
      </button>

      <div className="relative mt-auto flex flex-col items-center gap-8 pb-10">
        {cameraError ? (
          <div className="mx-4 flex flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center text-foreground">
            <p>{cameraError} Allow camera access in your browser, or upload a photo instead.</p>
            <label className="cursor-pointer text-base font-medium text-brand">
              Upload a photo
              <input
                type="file"
                accept="image/*"
                capture="user"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPhoto({ blob: file, url: URL.createObjectURL(file) });
                }}
              />
            </label>
          </div>
        ) : (
          <p className="rounded-full bg-white px-5 py-2.5 text-base text-foreground">Align your face in the oval above</p>
        )}
        <div className="flex items-center gap-10">
          <span className="size-12" />
          <button
            type="button"
            onClick={takePhoto}
            disabled={!!cameraError}
            aria-label="Take photo"
            className="flex size-20 items-center justify-center rounded-full border-4 border-white/80 disabled:opacity-40"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-white">
              <Camera className="size-7 text-brand" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setFacing((f) => (f === "user" ? "environment" : "user"))}
            aria-label="Switch camera"
            className="flex size-12 items-center justify-center rounded-full bg-black/30"
          >
            <RefreshCw className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
