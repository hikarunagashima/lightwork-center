import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import SplashOverlay from "@/components/SplashOverlay";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lightwork-center.com";

export const metadata: Metadata = {
  title: {
    default: "LIGHTWORK CENTER",
    template: "%s | LIGHTWORK CENTER",
  },
  description:
    "言霊学・シャーマニズム・AI — 志ある者が集い、共に学ぶ現代の私塾",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "LIGHTWORK CENTER",
    description:
      "言霊学・シャーマニズム・AI — 志ある者が集い、共に学ぶ現代の私塾",
    siteName: "LIGHTWORK CENTER",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("志ある者よ、ここに集え。")}`,
        width: 1200,
        height: 630,
        alt: "LIGHTWORK CENTER",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LIGHTWORK CENTER",
    description:
      "言霊学・シャーマニズム・AI — 志ある者が集い、共に学ぶ現代の私塾",
    images: [
      `/api/og?title=${encodeURIComponent("志ある者よ、ここに集え。")}`,
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div>
            <p className="text-sm tracking-[0.2em] font-medium">
              LIGHTWORK CENTER
            </p>
            <p className="text-sm text-muted mt-2">
              言霊学・シャーマニズム・AI
            </p>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <Link
                href="/spirit"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Spirit
              </Link>
              <Link
                href="/learn"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Learn
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                About
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://t.me/shamanhikaru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} LIGHTWORK CENTER. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SplashOverlay />
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
