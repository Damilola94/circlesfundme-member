import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function WelcomeOnboardingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 pb-10 text-center">
      <video
        src="/videos/onboarding.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="aspect-square w-full max-w-[340px] rounded-3xl object-cover"
        aria-hidden
      />
      <h1 className="mt-8 text-[28px] font-medium">Welcome to CirclesFundMe</h1>
      <div className="mt-3 space-y-1 text-base text-muted-foreground">
        <p>You’re almost there!</p>
        <p>Your onboarding isn’t completed yet.</p>
        <p>Complete it to unlock all features.</p>
      </div>
      <Link href="/sign-up/personal-info" replace className={buttonVariants({ size: "cta", className: "mt-12" })}>
        Complete Onboarding
      </Link>
    </div>
  );
}
