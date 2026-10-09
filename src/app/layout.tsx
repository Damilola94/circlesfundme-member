import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Circlesfundme",
  description:
    "Fund your future, one circle at a time. Build your credit, access funding, and achieve your goals.",
};

export const viewport: Viewport = {
  themeColor: "#004a41",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#e9e9e9]">
        {/* The design is a 430px-wide mobile app; keep it phone-sized on larger screens. */}
        <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background shadow-sm">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
