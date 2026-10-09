"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { OnboardingScreen } from "@/components/layout/onboarding-screen";
import faceId from "../../../../public/images/onboarding/face-id.png";

export default function TakeSelfiePage() {
  const router = useRouter();
  return (
    <OnboardingScreen
      step={5}
      title="Take a Selfie"
      description="Enhance your security and speed up future verifications."
      primaryLabel="Take Selfie"
      onPrimary={() => router.replace("/sign-up/take-a-selfie-camera")}
    >
      <div className="flex flex-col items-center gap-8 pt-8 text-center">
        <span className="flex size-[164px] items-center justify-center rounded-full bg-[#e9e9e9]">
          <Image src={faceId} alt="" width={96} height={96} />
        </span>
        <p className="text-lg leading-relaxed">
          Ensure you are in a well-lit environment
          <br />
          looking directly at the camera
        </p>
      </div>
    </OnboardingScreen>
  );
}
