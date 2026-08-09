import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pixelSans = localFont({
  src: [
    { path: "./fonts/ms-sans-serif.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ms-sans-serif-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aswad Yousaf — Portfolio",
  description:
    "Aswad Yousaf's developer portfolio: WhatsApp bots wired into real ERPs, AI agents, a Reddit moderation bot, and full-stack builds — presented as a Windows 98 desktop.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={pixelSans.variable}>
      <body>{children}</body>
    </html>
  );
}
