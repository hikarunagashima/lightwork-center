import type { Metadata } from "next";
import Link from "next/link";
import VoiceCard from "@/components/media/VoiceCard";
import { getAllVoices, getProgramsWithVoices } from "@/lib/voices";

export const metadata: Metadata = {
  title: "Voices",
  description:
    "セレモニーを受けた方々の声。アダムカドモン覚醒 イニシエーションパック、その他のメディスン体験のご感想を、ご本人の許可のもと匿名で掲載しています。",
  alternates: {
    canonical: "/voices",
  },
};

export default function VoicesPage() {
  const voices = getAllVoices();
  const programs = getProgramsWithVoices(voices);

  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 max-w-[1100px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10 editorial-in">
          ⊙ &nbsp; VOICES
        </p>
        <h1 className="serif-en text-5xl sm:text-7xl font-light leading-[0.98] tracking-tight editorial-in-delay-1">
          From Those
          <br />
          Who Returned.
        </h1>
        <p className="serif-jp text-base text-muted leading-[2.1] mt-14 max-w-2xl editorial-in-delay-2">
          セレモニーを受けた方々の声を、
          ご本人の許可のもと、匿名でご紹介しています。
          掲載されている言葉はすべて、ご本人がご自身の体験として
          記述してくださったものです。
        </p>
      </section>

      {/* Program filter nav */}
      {programs.length > 0 && (
        <section className="px-6 pb-4 max-w-[1100px] mx-auto">
          <p className="serif-en text-[10px] tracking-[0.35em] text-mute-soft">
            BY PROGRAM
          </p>
          <nav
            aria-label="プログラム別に体験談を見る"
            className="mt-4 flex flex-wrap gap-x-3 gap-y-3"
          >
            {programs.map((program) => (
              <Link
                key={program.id}
                href={`/voices/program/${program.id}`}
                className="serif-jp text-xs tracking-[0.1em] text-muted border border-border-soft px-3 py-1.5 hover:text-foreground hover:border-foreground transition-colors"
              >
                {program.label}
              </Link>
            ))}
          </nav>
        </section>
      )}

      {/* Voices list */}
      <section className="py-16 px-6">
        <div className="max-w-[860px] mx-auto space-y-16">
          {voices.map((voice) => (
            <VoiceCard key={voice.slug} voice={voice} />
          ))}
        </div>
      </section>

      {/* Note about anonymity */}
      <section className="py-24 px-6 border-t border-border bg-paper-deep/30">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-sm text-muted leading-[2.1]">
            掲載に際しては、ご本人にご確認のうえ、
            年齢・職業の方向性のみを残し、
            個人を特定しうる情報は削除しています。
            <br />
            体験は一人ひとり異なり、
            掲載されている内容が誰にとっても同じように起こることを
            お約束するものではありません。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-base text-muted leading-[2.1] mb-12">
            ご自身の状況をお話しください。
            場を整え、お待ちしています。
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 justify-center items-center">
            <Link
              href="/contact"
              className="serif-en inline-block text-sm tracking-[0.25em] border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              Apply
            </Link>
            <Link
              href="/medicine-wheel"
              className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground transition-colors py-4 border-b border-mute-soft hover:border-foreground"
            >
              Medicine&nbsp;Wheel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
