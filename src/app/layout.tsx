import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
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

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | LIGHTWORK CENTER",
  },
  description: SITE_DESCRIPTION,
  manifest: "/manifest.json",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("LIGHTWORK CENTER")}`,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
              LIGHTWORK&nbsp;JOURNAL
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              ネオシャーマニズム編集室
            </p>
            <p className="serif-jp text-xs tracking-[0.2em] text-muted mt-8 max-w-md leading-[2]">
              国際認定イボガシャーマンの一次体験と専門編集で、
              古代の祈りをAI時代の言葉へ翻訳するメディア。
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
            <Link href="/articles" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">Articles</Link>
            <Link href="/category/neo-shamanism" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">Shelves</Link>
            <Link href="/medicine-wheel" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">Medicine Wheel</Link>
            <Link href="/about" className="serif-en text-sm tracking-[0.2em] text-muted hover:text-foreground transition-colors">About</Link>
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
