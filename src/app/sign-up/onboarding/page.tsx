"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { updateSession } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";
import background from "../../../../public/images/onboarding/onboarding.png";

export default function OnboardingIntroPage() {
  const router = useRouter();

  async function go(path: string) {
    await updateSession({ seenOnboarding: true });
    router.replace(path);
  }

  return (
    <div className="relative flex min-h-dvh flex-1 flex-col overflow-hidden bg-black text-white">
      <Image
        src={background}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="430px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/90" />

      {/* <LogoMark color="#f5f5f5" className="absolute top-9 right-4 opacity-80" /> */}
      <Image
        src="/images/logo-icon.png"
        alt=""
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="relative mt-auto flex flex-col px-4 pb-8">
        <h1 className="text-[34px] leading-[1.25] font-medium">
          Fund your future,
          <br />
          one circle at a time
        </h1>
        <p className="mt-6 max-w-[340px] text-base leading-relaxed text-white/80">
          Build your credit, access funding, and achieve your goals.
        </p>
        <Button
          size="cta"
          onClick={() => go("/sign-up/create-account")}
          className={cn("mt-16 bg-sun text-foreground hover:bg-sun/90")}
        >
          Create Account
        </Button>
        <button
          type="button"
          onClick={() => go("/sign-in/login")}
          className="mt-6 self-center py-2 text-base font-medium text-sun"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
