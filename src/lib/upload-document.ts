import { api } from "@/lib/api/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB, as in the mobile app

/** Upload a KYC/collateral document and return its hosted URL (utils/uploadDocument.ts). */
export async function uploadDocument(file: File) {
  if (file.size > MAX_FILE_SIZE) throw new Error("File size must not exceed 5MB");
  const form = new FormData();
  form.append("Document", file, file.name);
  const res = await api<string>({ endpoint: "utility/upload-document", method: "POST", body: form, multipart: true });
  if (res?.isSuccess && res.data) return res.data;
  throw new Error(res?.message || "Upload failed");
}
