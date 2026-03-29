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

export const metadata: Metadata = {
  title: {
    default: "LIGHTWORK CENTER",
    template: "%s | LIGHTWORK CENTER",
  },
  description:
    "Write × Light — 言霊学とシャーマニズムで、あなたの本質を言葉にする",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

function MedicineWheelBanner() {
  return (
    <section className="border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-7">
            <p className="text-xs tracking-[0.3em] text-muted mb-3">
              MEDICINE WHEEL PROGRAM
            </p>
            <h3 className="text-2xl sm:text-3xl font-light leading-tight mb-4">
              メディスンホイールプログラム
            </h3>
            <p className="text-sm text-muted leading-relaxed max-w-lg">
              イボガ国際認定シャーマン・井上朝陽先生監修。世界中の神聖な植物と精霊の力を借り、共に祈ることで、人類の天才性とポテンシャルを発揮するためのプログラム。
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <Link
              href="/medicine-wheel"
              className="inline-block text-sm border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors tracking-wider"
            >
              プログラムについて
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div>
            <p className="text-sm tracking-[0.2em] font-medium">
              LIGHTWORK CENTER
            </p>
            <p className="text-sm text-muted mt-2">Write × Light</p>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <Link
                href="/services"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <Link
                href="/events"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Events
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
              <Link
                href="/contact"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Contact
              </Link>
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
        <MedicineWheelBanner />
        <Footer />
      </body>
    </html>
  );
}
