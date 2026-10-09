"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CircleCheck, Info, Loader2, UserPlus, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { api } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { FormScreen } from "@/components/layout/screen";
import { SelectField, TextField } from "@/components/forms/field";
import { Input } from "@/components/ui/input";

type Step = "name" | "members" | "leaders" | "success";
type Member = { memberCode: string; fullName: string; isYou?: boolean };

const REQUIREMENTS = [
  "4–5 registered, verified members",
  "One designated cluster leader",
  "One designated assistant leader",
  "All members must personally know each other",
];

function MemberList({
  members,
  onRemove,
  leader,
  assistantLeader,
  showRoles,
}: {
  members: Member[];
  onRemove?: (code: string) => void;
  leader?: string;
  assistantLeader?: string;
  showRoles?: boolean;
}) {
  return (
    <div className="rounded-3xl bg-white p-4">
      <p className="text-base font-medium">{showRoles ? `Members (${members.length})` : "Your Cluster"}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {members.map((m) => (
          <li key={m.memberCode} className="flex items-center justify-between rounded-xl bg-[#f5f5f5] px-4 py-2.5 text-sm">
            <div>
              {m.fullName}
              {m.isYou && " (You)"}
              {showRoles && m.memberCode === leader && <span className="block text-[10px] text-brand">Leader</span>}
              {showRoles && m.memberCode === assistantLeader && (
                <span className="block text-[10px] text-brand">Assistant Leader</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">#{m.memberCode}</span>
              {!m.isYou && onRemove && (
                <button type="button" onClick={() => onRemove(m.memberCode)} aria-label={`Remove ${m.fullName}`}>
                  <X className="size-3.5 text-[#999]" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CreateClusterPage() {
  const router = useRouter();
  const { data: user } = useUser();
  const [step, setStep] = useState<Step>("name");
  const [clusterName, setClusterName] = useState("");
  const [clusterId, setClusterId] = useState("");
  const [memberCode, setMemberCode] = useState("");
  const [found, setFound] = useState<Member | null>(null);
  const [added, setAdded] = useState<Member[]>([]);
  const [leader, setLeader] = useState("");
  const [assistantLeader, setAssistantLeader] = useState("");

  const me: Member = {
    memberCode: user?.memberCode ?? "",
    fullName: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
    isYou: true,
  };
  const members = [me, ...added];
  const alreadyAdded = !!found && members.some((m) => m.memberCode === found.memberCode);
  const others = added.map((m) => m.fullName);
  const nameOf = (code: string) => members.find((m) => m.memberCode === code)?.fullName ?? "";
  const codeOf = (name: string) => members.find((m) => m.fullName === name)?.memberCode ?? "";

  const create = useMutation({
    mutationFn: () => api<{ id: string }>({ endpoint: "clusters", method: "POST", body: { name: clusterName } }),
    onSuccess: (res) => {
      if (!res?.isSuccess) return showToast({ type: "error", text1: res?.message || "Failed to create cluster" });
      setClusterId(res.data.id);
      setStep("members");
    },
    onError: (err: Error) => showToast({ type: "error", text1: err.message || "Something went wrong" }),
  });

  const lookup = useMutation({
    mutationFn: () => api<{ memberCode: string; fullName: string }>({ endpoint: `clusters/lookup/${encodeURIComponent(memberCode.trim())}` }),
    onSuccess: (res) => {
      if (!res?.isSuccess || !res.data) {
        setFound(null);
        return showToast({ type: "error", text1: "Member not found" });
      }
      setFound({ memberCode: res.data.memberCode, fullName: res.data.fullName });
    },
    onError: (err: Error) => {
      setFound(null);
      showToast({ type: "error", text1: err.message || "Lookup failed" });
    },
  });

  const invite = useMutation({
    mutationFn: (payload: { memberCode: string; role: string }) =>
      api({ endpoint: "clusters/invite", method: "POST", body: { clusterId, ...payload } }),
    onSuccess: (res) => {
      if (!res?.isSuccess) return showToast({ type: "error", text1: res?.message || "Failed to add member" });
      if (found) {
        setAdded((prev) => [...prev, found]);
        setFound(null);
        setMemberCode("");
      }
    },
    onError: (err: Error) => showToast({ type: "error", text1: err.message || "Failed to add member" }),
  });

  const activate = useMutation({
    mutationFn: async () => {
      await api({ endpoint: "clusters/invite", method: "POST", body: { clusterId, memberCode: leader, role: "Leader" } });
      await api({ endpoint: "clusters/invite", method: "POST", body: { clusterId, memberCode: assistantLeader, role: "AssistantLeader" } });
      const res = await api({ endpoint: `clusters/${clusterId}/activate`, method: "POST" });
      if (!res?.isSuccess) throw new Error(res?.message || "Activation failed");
    },
    onSuccess: () => setStep("success"),
    onError: (err: Error) => showToast({ type: "error", text1: err.message || "Activation failed" }),
  });

  if (step === "success") {
    return (
      <div className="flex flex-1 flex-col justify-center px-4 pb-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <CircleCheck className="size-[172px] text-brand" strokeWidth={2.2} aria-hidden />
          <h1 className="mt-6 text-[28px] font-medium">Cluster Activated</h1>
          <p className="text-base text-muted-foreground">Now Let’s Set You Up.</p>
        </div>
        <Button size="cta" className="mt-20" onClick={() => router.replace(`/loan/loan-setup/loan-application?clusterId=${clusterId}`)}>
          Submit Loan
        </Button>
      </div>
    );
  }

  if (step === "name") {
    return (
      <FormScreen
        title="Create Cluster"
        footer={
          <Button size="cta" disabled={!clusterName.trim() || create.isPending} onClick={() => create.mutate()}>
            Proceed
          </Button>
        }
      >
        {create.isPending && <Loader message="Creating Cluster..." />}
        <TextField label="Cluster Name" placeholder="e.g Sunrise Collective" value={clusterName} onValueChange={setClusterName} />
        <div className="rounded-3xl bg-white p-4">
          <p className="text-base font-medium">Requirements</p>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm">
            {REQUIREMENTS.map((r) => (
              <li key={r} className="flex items-center gap-2.5">
                <CircleCheck className="size-4 shrink-0 text-brand" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </FormScreen>
    );
  }

  if (step === "members") {
    return (
      <FormScreen
        title="Create Cluster"
        footer={
          <Button size="cta" disabled={members.length < 4} onClick={() => setStep("leaders")}>
            Proceed
          </Button>
        }
      >
        <div className="flex flex-col gap-2.5">
          <label htmlFor="member-code" className="text-base">
            Member Code
          </label>
          <div className="relative">
            <Input
              id="member-code"
              placeholder="e.g MBR-AF120"
              value={memberCode}
              onChange={(e) => {
                setMemberCode(e.target.value);
                setFound(null);
              }}
              onKeyDown={(e) => e.key === "Enter" && memberCode.trim() && lookup.mutate()}
              className="pr-28"
            />
            <button
              type="button"
              disabled={!memberCode.trim() || lookup.isPending}
              onClick={() => lookup.mutate()}
              className={cn(
                "absolute top-1.5 right-1.5 flex h-11 min-w-[88px] items-center justify-center rounded-full px-4 text-sm",
                memberCode.trim() ? "bg-foreground text-white" : "bg-[#d9d9d9] text-[#7a7a7a]"
              )}
            >
              {lookup.isPending ? <Loader2 className="size-4 animate-spin" /> : "Look Up"}
            </button>
          </div>
        </div>

        {found && !alreadyAdded && (
          <div className="flex items-center justify-between rounded-2xl border border-brand/40 bg-brand-soft p-4">
            <div>
              <p className="text-sm font-medium">{found.fullName}</p>
              <p className="text-[10px] text-muted-foreground">#{found.memberCode}</p>
            </div>
            <button
              type="button"
              disabled={invite.isPending}
              onClick={() => invite.mutate({ memberCode: found.memberCode, role: "Member" })}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs text-brand"
            >
              {invite.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <UserPlus className="size-3.5" />}
              Add to cluster
            </button>
          </div>
        )}
        {found && alreadyAdded && (
          <div className="flex items-center gap-2 rounded-2xl border border-sun bg-sun-soft p-4 text-sm">
            <Info className="size-4 shrink-0 text-[#b8860b]" />
            {found.fullName} is already added to your cluster
          </div>
        )}

        <MemberList members={members} onRemove={(code) => setAdded((prev) => prev.filter((m) => m.memberCode !== code))} />
      </FormScreen>
    );
  }

  return (
    <FormScreen
      title="Create Cluster"
      footer={
        <Button size="cta" disabled={!leader || !assistantLeader || activate.isPending} onClick={() => activate.mutate()}>
          Activate Cluster
        </Button>
      }
    >
      {activate.isPending && <Loader message="Activating cluster..." />}
      <div className="rounded-3xl bg-white p-4">
        <p className="text-xs text-muted-foreground">Cluster Name</p>
        <p className="mt-1 text-base">{clusterName}</p>
      </div>
      <MemberList members={members} leader={leader} assistantLeader={assistantLeader} showRoles />
      <div className="grid grid-cols-2 gap-3">
        <SelectField
          label="Select Leader"
          size="sm"
          placeholder="Select"
          options={others}
          value={nameOf(leader)}
          onSelect={(name) => setLeader(codeOf(name))}
        />
        <SelectField
          label="Select Assistant Leader"
          size="sm"
          placeholder="Select"
          options={others.filter((n) => n !== nameOf(leader))}
          value={nameOf(assistantLeader)}
          onSelect={(name) => setAssistantLeader(codeOf(name))}
        />
      </div>
    </FormScreen>
  );
}
