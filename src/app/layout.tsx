import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vannie - Your Beauty Inventory Bestie",
  description: "Track your makeup collection, get expiry alerts, and never lose sight of your beauty products. Join the waitlist for early access!",
  keywords: ["makeup", "beauty", "inventory", "tracking", "cosmetics", "skincare"],
  openGraph: {
    title: "Vannie - Your Beauty Inventory Bestie",
    description: "Track your makeup collection, get expiry alerts, and never lose sight of your beauty products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
