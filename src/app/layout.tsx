import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import { CATEGORIES } from "@/lib/content";
import {
  INSTAGRAM_URL,
  NOTE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TELEGRAM_URL,
} from "@/lib/site";
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

const FOOTER_READ_LINKS = [
  { href: "/articles", label: "Articles" },
  { href: "/guide", label: "Reading Guide" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/medicine-wheel", label: "Medicine Wheel" },
  { href: "/voices", label: "Voices" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const FOOTER_FOLLOW_LINKS = [
  { href: NOTE_URL, label: "Note", external: true },
  { href: INSTAGRAM_URL, label: "Instagram", external: true },
  { href: TELEGRAM_URL, label: "Telegram", external: true },
  { href: "/feed.xml", label: "RSS", external: false },
] as const;

function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-[1320px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_0.8fr] gap-12 md:gap-10">
          <div>
            <p className="serif-en text-2xl sm:text-3xl tracking-[0.15em] font-light">
              LIGHTWORK&nbsp;CENTER
            </p>
            <p className="serif-jp text-xs tracking-[0.3em] text-muted mt-3">
              ネオシャーマニズム編集室
            </p>
            <p className="serif-jp text-xs tracking-[0.2em] text-muted mt-8 max-w-md leading-[2]">
              国際認定イボガシャーマンの一次体験と専門編集で、
              古代の祈りをAI時代の言葉へ翻訳するメディア。
            </p>
          </div>

          <nav aria-label="読む">
            <p className="serif-en text-[11px] tracking-[0.35em] text-mute-soft">READ</p>
            <ul className="mt-5 space-y-3">
              {FOOTER_READ_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="serif-en text-sm tracking-[0.18em] text-muted hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="棚から探す">
            <p className="serif-en text-[11px] tracking-[0.35em] text-mute-soft">SHELVES</p>
            <ul className="mt-5 space-y-3">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.id}`}
                    className="serif-jp text-sm tracking-[0.1em] text-muted hover:text-foreground transition-colors"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="更新を受け取る">
            <p className="serif-en text-[11px] tracking-[0.35em] text-mute-soft">FOLLOW</p>
            <ul className="mt-5 space-y-3">
              {FOOTER_FOLLOW_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="serif-en text-sm tracking-[0.18em] text-muted hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
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
