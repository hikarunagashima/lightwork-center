import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VoiceCard from "@/components/media/VoiceCard";
import { getProgramById } from "@/lib/programs";
import { getProgramsWithVoices, getVoicesByProgram } from "@/lib/voices";
import { absoluteUrl } from "@/lib/site";

type ProgramVoicesPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// 体験談が1件以上あるプログラムのみ静的生成（空ページを量産しない）
export function generateStaticParams() {
  return getProgramsWithVoices().map((program) => ({
    id: program.id,
  }));
}

export async function generateMetadata({
  params,
}: ProgramVoicesPageProps): Promise<Metadata> {
  const { id } = await params;
  const program = getProgramById(id);

  if (!program) {
    return {};
  }

  const description = `${program.label}を受けた方の体験談。ご本人の許可のもと匿名で掲載しています。`;

  return {
    title: `${program.label}の体験談`,
    description,
    alternates: {
      canonical: `/voices/program/${program.id}`,
    },
    openGraph: {
      title: `${program.label}の体験談 | LIGHTWORK CENTER`,
      description,
      url: absoluteUrl(`/voices/program/${program.id}`),
      type: "website",
    },
  };
}

export default async function ProgramVoicesPage({
  params,
}: ProgramVoicesPageProps) {
  const { id } = await params;
  const program = getProgramById(id);

  if (!program) {
    notFound();
  }

  const voices = getVoicesByProgram(program.id);

  return (
    <div>
      <section className="px-6 pt-28 pb-20 border-b border-border">
        <div className="max-w-[1100px] mx-auto">
          <nav className="serif-en text-xs tracking-[0.25em] text-muted flex gap-3">
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
            <span>/</span>
            <span>{program.en}</span>
          </nav>
          <p className="serif-en text-xs tracking-[0.45em] text-accent mt-14">
            VOICES BY PROGRAM
          </p>
          <h1 className="serif-jp text-4xl sm:text-6xl font-light leading-[1.3] mt-8">
            {program.label}
          </h1>
          <p className="serif-jp text-base leading-[2.15] text-muted max-w-2xl mt-10">
            {program.description}
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-[860px] mx-auto">
          {voices.length > 0 ? (
            <div className="space-y-16">
              {voices.map((voice) => (
                <VoiceCard key={voice.slug} voice={voice} />
              ))}
            </div>
          ) : (
            <div className="border border-border-soft p-8 sm:p-12">
              <p className="serif-jp text-muted leading-[2]">
                このプログラムの体験談は、まだ掲載準備中です。
              </p>
              <Link
                href="/voices"
                className="serif-en inline-block text-xs tracking-[0.25em] border-b border-foreground mt-8 pb-1 hover:text-accent hover:border-accent transition-colors"
              >
                Back to Voices
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-6 border-t border-border bg-paper-deep/30">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-sm text-muted leading-[2.1]">
            体験は一人ひとり異なり、
            掲載されている内容が誰にとっても同じように起こることを
            お約束するものではありません。
          </p>
          <div className="mt-12">
            <Link
              href="/medicine-wheel"
              className="serif-en inline-block text-xs tracking-[0.25em] border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              Medicine Wheel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
