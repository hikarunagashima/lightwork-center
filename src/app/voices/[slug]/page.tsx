import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VoiceCard from "@/components/media/VoiceCard";
import { jsonLdString } from "@/lib/jsonld";
import { getProgramLabel } from "@/lib/programs";
import { getAllVoices } from "@/lib/voices";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type VoicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllVoices().map((voice) => ({
    slug: voice.slug,
  }));
}

export async function generateMetadata({
  params,
}: VoicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const voice = getAllVoices().find((item) => item.slug === slug);

  if (!voice) {
    return {};
  }

  const ogImage = `/api/og?title=${encodeURIComponent(voice.title)}`;

  return {
    title: voice.title,
    description: voice.excerpt,
    alternates: {
      canonical: `/voices/${voice.slug}`,
    },
    openGraph: {
      title: voice.title,
      description: voice.excerpt,
      url: absoluteUrl(`/voices/${voice.slug}`),
      type: "article",
      publishedTime: voice.publishedAt,
      modifiedTime: voice.updatedAt,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: voice.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: voice.title,
      description: voice.excerpt,
      images: [ogImage],
    },
  };
}

export default async function VoicePage({ params }: VoicePageProps) {
  const { slug } = await params;
  const voices = getAllVoices();
  const voice = voices.find((item) => item.slug === slug);

  if (!voice) {
    notFound();
  }

  const others = voices.filter((item) => item.slug !== voice.slug);
  const voiceUrl = absoluteUrl(`/voices/${voice.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: voice.title,
    description: voice.excerpt,
    datePublished: voice.publishedAt,
    dateModified: voice.updatedAt,
    mainEntityOfPage: voiceUrl,
    inLanguage: "ja-JP",
    author: {
      "@type": "Person",
      name: `体験者 ${voice.initial}（匿名）`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Voices",
        item: absoluteUrl("/voices"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: voice.title,
        item: voiceUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd) }}
      />

      <article>
        <header className="px-6 pt-24 pb-16 border-b border-border">
          <div className="max-w-[980px] mx-auto">
            <nav className="serif-en text-xs tracking-[0.25em] text-muted flex flex-wrap gap-3">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/voices"
                className="hover:text-foreground transition-colors"
              >
                Voices
              </Link>
            </nav>
            <p className="serif-en text-xs tracking-[0.42em] text-accent mt-14">
              VOICE / {voice.initial}
            </p>
            <h1 className="serif-jp text-3xl sm:text-5xl font-light leading-[1.5] mt-8">
              {voice.title}
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted">
              <span className="serif-en tracking-[0.24em]">
                {voice.age} · {voice.profession}
              </span>
              <span className="text-accent" aria-hidden>⊙</span>
              <span className="serif-jp tracking-[0.1em]">
                {voice.readingMinutes}分で読む
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {voice.programs.map((id) => (
                <Link
                  key={id}
                  href={`/voices/program/${id}`}
                  className="serif-jp text-xs tracking-[0.1em] text-muted border border-border-soft px-3 py-1.5 hover:text-foreground hover:border-foreground transition-colors"
                >
                  {getProgramLabel(id)}
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Body — ご本人の記述をそのまま掲載（編集しない） */}
        <div className="px-6 py-16 sm:py-24">
          <div className="max-w-[760px] mx-auto">
            <div className="serif-jp text-base leading-[2.1] space-y-12">
              {voice.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-6">
                  {section.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                  {sIdx < voice.sections.length - 1 && (
                    <div className="pt-6 flex justify-center" aria-hidden>
                      <span className="text-accent text-sm tracking-[0.5em]">
                        ⊙
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <aside className="mt-20 border border-border p-6 sm:p-8 bg-paper-deep">
              <p className="serif-en text-xs tracking-[0.35em] text-muted">
                ABOUT THIS VOICE
              </p>
              <p className="serif-jp text-sm leading-[2] text-muted mt-5">
                この体験談は、ご本人がご自身の体験として記述してくださったものを、
                許可のもと匿名で掲載しています。掲載に際しては、年齢・職業の方向性のみを残し、
                個人を特定しうる情報は削除しています。体験は一人ひとり異なり、
                掲載されている内容が誰にとっても同じように起こることをお約束するものではありません。
              </p>
            </aside>

            <aside className="mt-8 border border-border p-6 sm:p-8 bg-paper-deep">
              <p className="serif-en text-xs tracking-[0.35em] text-muted">
                MEDICAL NOTICE
              </p>
              <p className="serif-jp text-sm leading-[2] text-muted mt-5">
                このページはシャーマニズムの伝統的実践と個人の体験を扱う読み物であり、
                医療行為ではありません。診断・治療・処方は行いません。既往症のある方、
                服薬中の方、心身に不安がある方は、必ず医師など専門家に相談してください。
              </p>
            </aside>

            <aside className="mt-12 border-y border-border py-10">
              <p className="serif-en text-xs tracking-[0.35em] text-accent">
                NEXT STEP
              </p>
              <h2 className="serif-jp text-2xl sm:text-3xl font-light leading-[1.6] mt-5">
                ご自身の状況をお話しください。
              </h2>
              <p className="serif-jp text-sm leading-[2] text-muted mt-5">
                メディスンホイールは、個別の意図と状態に合わせて受け取るための
                中核プログラムです。効果を約束するものではなく、
                事前の対話と安全確認を前提に進めます。
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 items-center">
                <Link
                  href="/medicine-wheel"
                  className="serif-en inline-block text-xs tracking-[0.25em] border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
                >
                  Medicine Wheel
                </Link>
                <Link
                  href="/contact"
                  className="serif-en text-xs tracking-[0.25em] text-muted hover:text-foreground transition-colors border-b border-mute-soft hover:border-foreground pb-1"
                >
                  Apply
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="px-6 py-20 border-t border-border">
          <div className="max-w-[860px] mx-auto">
            <p className="serif-en text-xs tracking-[0.45em] text-muted">
              ⊙ &nbsp; OTHER VOICES
            </p>
            <div className="mt-12 space-y-16">
              {others.slice(0, 3).map((item) => (
                <VoiceCard key={item.slug} voice={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
