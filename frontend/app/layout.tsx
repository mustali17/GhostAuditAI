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
  title: {
    default: "GhostAuditAI - Advanced AI Detection & Humanizer",
    template: "%s | GhostAuditAI",
  },
  description: "Detect AI-generated content with 99.9% accuracy and humanize text to bypass detectors. GhostAuditAI ensures your content is authentic, original, and undetectable.",
  keywords: ["AI detector", "AI content detector", "chatgpt detector", "humanize ai text", "bypass ai detection", "content audit", "plagiarism checker"],
  authors: [{ name: "GhostAuditAI Team" }],
  creator: "GhostAuditAI",
  publisher: "GhostAuditAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "GhostAuditAI - Scan. Verify. Trust Expected.",
    description: "The most advanced AI detection and humanization platform. Verify content authenticity and bypass AI detectors with confidence.",
    url: "https://ghostaudit.ai",
    siteName: "GhostAuditAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GhostAuditAI Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GhostAuditAI - Advanced AI Detection",
    description: "Detect and humanize AI content instantly. Join thousands of users ensuring content authenticity.",
    images: ["/og-image.png"],
    creator: "@ghostauditai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
