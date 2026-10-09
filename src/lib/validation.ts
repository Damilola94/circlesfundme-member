// Same rules as utils/lib.ts in the mobile app.

export const PASSWORD_RULE_MESSAGE =
  "Password must include uppercase, lowercase, number and special character.";

export const validatePassword = (value: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);

export const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** International format used at sign-up, e.g. 2348031234567. */
export const validatePhoneNumber = (value: string) => /^234\d{10}$/.test(value);

/** Local Nigerian mobile format used in personal info, e.g. 08031234567. */
export const validateNigerianPhone = (value: string) => /^0[789][01]\d{8}$/.test(value.replace(/\D/g, ""));
