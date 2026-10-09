"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  ChevronRight,
  CircleHelp,
  Copy,
  CreditCard,
  LockKeyhole,
  LogOut,
  OctagonX,
  TriangleAlert,
  UserRound,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { api, isOk, logout } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { StatusDialog } from "@/components/feedback/status-dialog";
import { Avatar } from "@/components/data/avatar";

function OptionRow({
  title,
  subTitle,
  icon,
  onClick,
  danger,
}: {
  title: string;
  subTitle?: string;
  icon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-4 py-3 text-left">
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-full",
          danger ? "bg-danger-soft text-[#d01d1d]" : "bg-brand-soft text-[#00c281]"
        )}
      >
        {icon}
      </span>
      <span className={cn("flex-1 text-lg", danger && "text-[#d01d1d]")}>
        {title}
        {subTitle && <span className="ml-2 text-xs text-[#d01d1d]">{subTitle}</span>}
      </span>
      <ChevronRight className={cn("size-5", danger ? "text-[#d01d1d]" : "text-[#999]")} />
    </button>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const [modal, setModal] = useState<"logout" | "deactivate" | null>(null);

  const sendOtp = useMutation({
    mutationFn: async (navigateTo: string) => {
      const res = await api({ endpoint: "accounts/send-onboarding-otp", method: "POST", body: { email: user?.email } });
      return { res, navigateTo };
    },
    onSuccess: ({ res, navigateTo }) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "OTP Failed", text2: res?.message || "Please try again later" });
        return;
      }
      showToast({ type: "success", text1: "OTP Sent", text2: "Follow the instructions sent to your email" });
      router.push(navigateTo);
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Something went wrong", text2: error.message || "Please try again later" }),
  });

  async function signOut() {
    await logout();
    queryClient.clear();
    setModal(null);
    router.replace("/sign-in/login");
  }

  const deactivate = useMutation({
    mutationFn: () => api({ endpoint: "users/deactivate-account", method: "POST" }),
    onSuccess: async (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Deactivation Failed", text2: res?.message || "Please try again later" });
        return;
      }
      showToast({ type: "success", text1: "Account Deactivated", text2: "Your account has been successfully deactivated" });
      await signOut();
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Something went wrong", text2: error.message || "Please try again later" }),
  });

  async function copyMemberCode() {
    if (!user?.memberCode) return;
    try {
      await navigator.clipboard.writeText(user.memberCode);
      showToast({ type: "success", text1: "Copied!", text2: "Member code copied to clipboard" });
    } catch {
      showToast({ type: "error", text1: "Couldn’t copy", text2: user.memberCode });
    }
  }

  const name = user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "Guest User";
  const isDeactivate = modal === "deactivate";

  return (
    <div className="flex flex-col">
      {sendOtp.isPending && <Loader message="Sending OTP..." />}
      <h1 className="text-[32px] font-medium">Profile</h1>

      <div className="mt-4 flex flex-col items-center gap-2">
        <Avatar src={user?.profilePictureUrl} alt={name} className="size-32" />
        <p className="mt-2 text-xl font-medium">{name}</p>
        <button type="button" onClick={copyMemberCode} className="flex items-center gap-1.5 text-base text-muted-foreground">
          {user?.memberCode ? `#${user.memberCode}` : "No Member Code"}
          {user?.memberCode && <Copy className="size-3.5 text-foreground" />}
        </button>
      </div>

      <div className="mt-6 flex flex-col">
        <OptionRow
          title="Profile Settings"
          subTitle={user && user.onboardingStatus !== "Completed" ? "INCOMPLETE" : undefined}
          icon={<UserRound className="size-5" />}
          onClick={() => router.push("/profile/profile-setting")}
        />
        <OptionRow
          title="Update Password"
          icon={<LockKeyhole className="size-5" />}
          onClick={() => sendOtp.mutate("/profile/update-password-setting")}
        />
        <OptionRow
          title="Update Card Settings"
          icon={<CreditCard className="size-5" />}
          onClick={() => {
            if (!user?.isPaymentSetupComplete) {
              return showToast({
                type: "error",
                text1: "No Payment Card",
                text2: "You have not set up any payment card yet.",
              });
            }
            sendOtp.mutate("/profile/verify-card-otp");
          }}
        />
        <OptionRow title="Payment Settings" icon={<Wallet className="size-5" />} onClick={() => router.push("/profile/payment-setting")} />
        <OptionRow title="Notifications" icon={<Bell className="size-5" />} onClick={() => router.push("/profile/notification")} />
        <OptionRow title="Deactivate Account" icon={<OctagonX className="size-5" />} danger onClick={() => setModal("deactivate")} />
        <OptionRow title="Log Out" icon={<LogOut className="size-5" />} danger onClick={() => setModal("logout")} />
      </div>

      <StatusDialog
        open={!!modal}
        onOpenChange={() => setModal(null)}
        icon={
          isDeactivate ? (
            <TriangleAlert className="size-24 text-[#c60808]" strokeWidth={1.8} />
          ) : (
            <CircleHelp className="size-24 text-forest" strokeWidth={1.8} />
          )
        }
        title={isDeactivate ? "Deactivate Account?" : "Log out of your account?"}
        description={
          isDeactivate
            ? "This action will disable your account and you will no longer have access to your data."
            : "You can log back in anytime."
        }
      >
        <div className="mt-4 grid w-full grid-cols-2 gap-3">
          <Button size="cta" onClick={() => setModal(null)}>
            Cancel
          </Button>
          <Button
            size="cta"
            variant="danger"
            disabled={isDeactivate && deactivate.isPending}
            onClick={() => (isDeactivate ? deactivate.mutate() : signOut())}
          >
            {isDeactivate ? "Deactivate" : "Log Out"}
          </Button>
        </div>
      </StatusDialog>
    </div>
  );
}
