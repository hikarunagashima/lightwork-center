import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lightworkcenter.com";

export const metadata: Metadata = {
  title: {
    default: "LIGHTWORK CENTER — ライトワークセンター",
    template: "%s | LIGHTWORK CENTER",
  },
  description:
    "国際認定イボガシャーマンによる、伝統と量子意識のセレモニー。ガボン共和国ブウィティの系譜と現代の神経科学的知見を統合した、魂のためのメディスン。",
  manifest: "/manifest.json",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "LIGHTWORK CENTER — ライトワークセンター",
    description:
      "国際認定イボガシャーマンによる、伝統と量子意識のセレモニー。",
    siteName: "LIGHTWORK CENTER",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("LIGHTWORK CENTER")}`,
        width: 1200,
        height: 630,
        alt: "LIGHTWORK CENTER — ライトワークセンター",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LIGHTWORK CENTER — ライトワークセンター",
    description:
      "国際認定イボガシャーマンによる、伝統と量子意識のセレモニー。",
    images: [`/api/og?title=${encodeURIComponent("LIGHTWORK CENTER")}`],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="serif-en text-2xl sm:text-3xl tracking-[0.15em] font-light">
              LIGHTWORK&nbsp;CENTER
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              ライトワークセンター
            </p>
            <p className="serif-jp text-xs tracking-[0.2em] text-muted mt-8">
              国際認定 イボガ シャーマン
            </p>
            <p className="serif-en text-[10px] tracking-[0.35em] text-muted mt-2">
              2025&nbsp;OSAKA-KANSAI&nbsp;EXPO &nbsp;·&nbsp; SPEAKER
            </p>
            <div className="mt-10 flex gap-8">
              <a
                href="https://www.instagram.com/hikaru_asobi/"
                target="_blank"
                rel="noopener noreferrer"
                className="serif-en text-xs tracking-[0.3em] text-muted hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://note.com/hikaruuaa"
                target="_blank"
                rel="noopener noreferrer"
                className="serif-en text-xs tracking-[0.3em] text-muted hover:text-foreground transition-colors"
              >
                Note
              </a>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-12 gap-y-4 md:justify-end content-start">
            <Link href="/about" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">About</Link>
            <Link href="/voices" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">Voices</Link>
            <Link href="/sessions" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">Sessions</Link>
            <Link href="/medicines" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">Medicines</Link>
            <Link href="/shamanism" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">Shamanism</Link>
            <Link href="/first-visit" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">First Visit</Link>
            <Link href="/contact" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">Contact</Link>
          </nav>
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row sm:justify-between gap-3 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Lightwork Center. All rights reserved.</p>
          <p className="serif-en tracking-[0.3em]">Edition 01 — MMXXVI</p>
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
      className={`${cormorant.variable} ${notoSerifJp.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
