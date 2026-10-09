"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleCheck } from "lucide-react";

import { api, isOk } from "@/lib/api/client";
import { showToast } from "@/lib/toast";
import { formatAmount } from "@/lib/format";
import { useUser, useWallets } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/feedback/loader";
import { StatusDialog } from "@/components/feedback/status-dialog";
import { FormScreen } from "@/components/layout/screen";
import { DateField, SelectField, TextField } from "@/components/forms/field";
import { Avatar } from "@/components/data/avatar";
import { SetupNotice } from "@/components/dashboard/cards";
import { WithdrawContributionSheet } from "@/components/profile/withdraw-contribution-sheet";

const ASSET_FINANCE_SCHEMES = ["Auto Financing Contribution Scheme", "Tricycle Financing"];
const isoDate = (v?: string) => (v ? new Date(v).toISOString().slice(0, 10) : "");

export default function ProfileSettingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputId = useId();
  const { data: user } = useUser();
  const { data: wallets = [] } = useWallets();

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState<{ file: File; url: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  // Seed the form once the profile has loaded (state adjusted during render, not in an effect).
  const [seeded, setSeeded] = useState(false);
  if (user && !seeded) {
    setSeeded(true);
    setFullName(`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());
    setDob(isoDate(user.dateOfBirth));
    setGender(user.gender === "NotSet" ? "Not Specified" : (user.gender ?? ""));
  }

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo.url);
  }, [photo]);

  const { data: schemesRes } = useQuery({
    queryKey: ["contribution-schemes"],
    queryFn: () => api<{ id: string; name: string }[]>({ endpoint: "contributionschemes/mini" }),
  });
  const schemeName = user?.contributionScheme?.name ?? "";
  const schemeId = schemesRes?.data?.find((s) => s.name.toLowerCase().includes(schemeName.toLowerCase()))?.id;
  const isAssetFinance = ASSET_FINANCE_SCHEMES.includes(schemeName);
  const period = schemeName.includes("Weekly") ? "Weekly" : schemeName.includes("Daily") ? "Daily" : "Monthly";

  const contributionBalance = parseFloat(
    String(wallets.find((w) => w.title === "Your contribution")?.balance ?? "0").replace(/[^0-9.-]/g, "")
  );

  const upload = useMutation({
    mutationFn: (file: File) => {
      const form = new FormData();
      form.append("profilePicture", file, file.name || "profile.jpg");
      return api({ endpoint: "users/change-profile-picture", method: "POST", body: form, multipart: true });
    },
    onSuccess: (res) => {
      if (!isOk(res)) {
        showToast({ type: "error", text1: "Update Failed", text2: res?.message || "Something went wrong" });
        return;
      }
      showToast({ type: "success", text1: "Profile Picture Updated" });
      queryClient.invalidateQueries({ queryKey: ["users-me"] });
      setPhoto(null);
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Upload Error", text2: error.message || "Something went wrong" }),
  });

  const update = useMutation({
    mutationFn: () => {
      const [firstName, ...rest] = fullName.trim().split(" ");
      return api({
        endpoint: "users/update",
        method: "PUT",
        body: {
          firstName,
          lastName: rest.join(" "),
          phoneNumber: user?.phoneNumber,
          dateOfBirth: dob,
          gender: gender === "Not Specified" ? "NotSet" : gender,
          allowPushNotifications: user?.allowPushNotifications,
          allowEmailNotifications: user?.allowEmailNotifications,
          ...(user?.schemeMode !== 2 && {
            contributionAmount: user?.contributionAmount,
            incomeAmount: user?.incomeAmount,
            contributionSchemeId: schemeId,
          }),
        },
      });
    },
    onSuccess: () => {
      showToast({ type: "success", text1: "Profile updated" });
      queryClient.invalidateQueries({ queryKey: ["users-me"] });
      setSaved(true);
    },
    onError: (error: Error) =>
      showToast({ type: "error", text1: "Update failed", text2: error.message || "Something went wrong" }),
  });

  function editScheme() {
    if (contributionBalance > 0) setShowWithdraw(true);
    else router.push("/profile/edit-profile-scheme");
  }

  return (
    <FormScreen title="Profile Settings">
      {(update.isPending || upload.isPending) && <Loader />}

      <div className="flex flex-col items-center gap-3">
        <label htmlFor={fileInputId} className="cursor-pointer rounded-full focus-within:ring-3 focus-within:ring-ring/40">
          <Avatar src={photo?.url ?? user?.profilePictureUrl} alt="Profile picture" className="size-32" />
          <input
            id={fileInputId}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPhoto({ file, url: URL.createObjectURL(file) });
              e.target.value = "";
            }}
          />
        </label>
        {photo ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Selected image ready to upload</p>
            <Button size="pill" onClick={() => upload.mutate(photo.file)} disabled={upload.isPending}>
              {upload.isPending ? "Uploading..." : "Update"}
            </Button>
          </div>
        ) : (
          <p className="text-base">Tap to change profile picture</p>
        )}
      </div>

      {user && user.onboardingStatus !== "Completed" && (
        <SetupNotice
          title="You haven’t complete profile yet"
          buttonText="Complete Profile"
          onPress={() => router.push("/incomplete-kyc/verify-identity-kyc")}
        />
      )}

      <section className="flex flex-col gap-5 rounded-[28px] bg-white p-5">
        <h2 className="text-sm tracking-wide text-muted-foreground uppercase">Profile Details</h2>
        <TextField label="Full Name" placeholder="Enter Your Full name" value={fullName} onValueChange={setFullName} className="border-[#e6e6e6]" />
        <TextField label="Email" value={user?.email ?? ""} readOnly />
        <TextField label="Phone Number" value={user?.phoneNumber ?? ""} readOnly />
        <TextField
          label="Date Joined"
          value={user?.dateJoined ? new Date(user.dateJoined).toLocaleDateString("en-GB") : ""}
          readOnly
        />
        <DateField label="Date of Birth" value={dob} onValueChange={setDob} max={new Date().toISOString().slice(0, 10)} />
        <SelectField label="Gender" placeholder="Select Gender" options={["Male", "Female", "Not Specified"]} value={gender} onSelect={setGender} />
        <Button size="cta" onClick={() => update.mutate()} disabled={!user || update.isPending}>
          Save
        </Button>
      </section>

      {user && user.schemeMode !== 2 && (
        <section className="flex flex-col gap-5 rounded-[28px] bg-white p-5">
          <h2 className="text-sm tracking-wide text-muted-foreground uppercase">Contribution Details</h2>
          <TextField label="Contribution Scheme" value={schemeName} readOnly />
          {isAssetFinance ? (
            <>
              <TextField label="Cost of the vehicle?" value={formatAmount(user.autoLoanDetail?.costOfVehicle ?? 0)} readOnly />
              <TextField
                label="Your 10% Equity Contribution"
                value={formatAmount(user.autoLoanDetail?.preLoanContributionAmount ?? 0)}
                readOnly
                info={{
                  title: "Your 10% Equity Contribution",
                  content: "Your daily/weekly/monthly contribution plus the pre-loan service charge.",
                }}
              />
              <TextField
                label="Post-Loan Weekly Repayment over 4 years"
                value={formatAmount(user.autoLoanDetail?.postLoanWeeklyContribution ?? 0)}
                readOnly
                info={{
                  title: "Post-Loan Weekly Repayment over 4 years",
                  content:
                    "Total Fees = Eligible Loan + Loan Management Fee. Post-Loan Charge (0.05%) = 0.05% of Total Fees. Total to Repay Over 4 Years = Total Fees + Post-Loan Charges. Weekly Repayment = Total Repayment ÷ 208 weeks",
                }}
              />
              <TextField
                label="Total Repayment"
                value={formatAmount(user.autoLoanDetail?.totalRepayment ?? 0)}
                readOnly
                info={{
                  title: "Total Repayment",
                  content:
                    "Total Fees = Eligible Loan + Loan Management Fee. Post-Loan Charge (0.05%) = 0.05% of Total Fees × 48. Total repayment = Total Fees + Post-Loan Charges.",
                }}
              />
            </>
          ) : (
            <>
              <TextField
                label={period === "Monthly" ? "Monthly income (NGN)?" : `${period} Revenue (NGN)?`}
                value={formatAmount(user.incomeAmount ?? 0)}
                readOnly
              />
              <TextField label={`${period} Contribution (NGN)?`} value={formatAmount(user.contributionAmount ?? 0)} readOnly />
            </>
          )}
          <button type="button" onClick={editScheme} className="py-2 text-sm font-medium tracking-wide text-destructive uppercase">
            Edit Scheme
          </button>
        </section>
      )}

      <StatusDialog
        open={saved}
        onOpenChange={(open) => {
          if (!open) {
            setSaved(false);
            router.back();
          }
        }}
        icon={<CircleCheck className="size-24 text-brand" strokeWidth={2} />}
        title="Update Successful"
        description="You have successfully updated your profile."
      />
      <WithdrawContributionSheet
        open={showWithdraw}
        onOpenChange={setShowWithdraw}
        onSuccess={() => {
          setShowWithdraw(false);
          router.push("/profile/edit-profile-scheme");
        }}
      />
    </FormScreen>
  );
}
