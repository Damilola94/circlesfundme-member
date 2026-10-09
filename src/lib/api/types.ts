// Response shapes used across screens. Fields are optional because the backend omits them freely.

export type WithdrawalSetting = { id?: string; accountNumber?: string; accountName?: string; bankCode?: string };

export type UserMe = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  profilePictureUrl?: string;
  memberCode?: string;
  onboardingStatus?: string;
  isPaymentSetupComplete?: boolean;
  isCardLinked?: boolean;
  isLien?: boolean;
  /** 1 = contribution (full scheme), 2 = savings only */
  schemeMode?: number;
  contributionAmount?: number;
  income?: number;
  installmentDesc?: string;
  preInstallmentDesc?: string;
  withdrawalSetting?: WithdrawalSetting | null;
  contributionScheme?: { id?: string; name?: string; type?: string } | null;
  currentContributionScheme?: { status?: "Accumulating" | "Reserving" | "Completed" } | null;
  allowPushNotifications?: boolean;
  allowEmailNotifications?: boolean;
  dateJoined?: string;
  incomeAmount?: number | string;
  autoLoanDetail?: {
    costOfVehicle?: number;
    preLoanContributionAmount?: number;
    postLoanWeeklyContribution?: number;
    totalRepayment?: number;
  } | null;
  [key: string]: unknown;
};

export type WalletItem = {
  id?: string;
  title: string;
  balance: string;
  action?: string;
  scheme: string;
  nextTranDate?: string;
};

export type Bank = { bankCode: string; bankName: string };
