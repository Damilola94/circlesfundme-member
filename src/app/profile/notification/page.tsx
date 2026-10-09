"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader } from "@/components/feedback/loader";
import { FormScreen } from "@/components/layout/screen";

export default function NotificationSettingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const [push, setPush] = useState<boolean | null>(null);
  const [email, setEmail] = useState<boolean | null>(null);
  const pushEnabled = push ?? !!user?.allowPushNotifications;
  const emailEnabled = email ?? !!user?.allowEmailNotifications;

  const update = useMutation({
    mutationFn: () =>
      api({
        endpoint: "users/update",
        method: "PUT",
        body: { ...user, allowPushNotifications: pushEnabled, allowEmailNotifications: emailEnabled },
      }),
    onSuccess: () => {
      showToast({ type: "success", text1: "Notification preferences updated" });
      queryClient.invalidateQueries({ queryKey: ["users-me"] });
      router.push("/profile");
    },
    onError: (err: Error) => showToast({ type: "error", text1: "Update failed", text2: err.message || "Try again later" }),
  });

  return (
    <FormScreen
      title="Notification"
      footer={
        <Button size="cta" onClick={() => update.mutate()} disabled={!user || update.isPending}>
          Save
        </Button>
      }
    >
      {update.isPending && <Loader message="Updating Notification Settings..." />}
      <div className="mt-10 flex flex-col gap-8">
        <label className="flex items-center justify-between text-base">
          Push Notification
          <Switch size="lg" checked={pushEnabled} onCheckedChange={setPush} className="data-checked:bg-brand" />
        </label>
        <label className="flex items-center justify-between text-base">
          Email
          <Switch size="lg" checked={emailEnabled} onCheckedChange={setEmail} className="data-checked:bg-brand" />
        </label>
      </div>
    </FormScreen>
  );
}
