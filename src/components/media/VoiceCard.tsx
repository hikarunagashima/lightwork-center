import Link from "next/link";
import type { Voice } from "@/lib/voices";
import { getProgramLabel } from "@/lib/programs";

type VoiceCardProps = {
  voice: Voice;
};

export default function VoiceCard({ voice }: VoiceCardProps) {
  return (
    <article className="group border-t border-border pt-10">
      <Link href={`/voices/${voice.slug}`} className="block">
        <div className="flex items-baseline justify-between gap-6">
          <p className="serif-en text-2xl tracking-[0.2em] text-accent">
            {voice.initial}
          </p>
          <p className="serif-en text-[11px] tracking-[0.3em] text-muted">
            {voice.age}{voice.profession ? ` · ${voice.profession}` : ""}
          </p>
        </div>
        <p className="serif-en text-[11px] tracking-[0.35em] text-accent mt-6">
          {voice.programs.map((id) => getProgramLabel(id)).join(" / ")}
        </p>
        <h2 className="serif-jp text-xl sm:text-2xl leading-[1.7] font-light mt-4 group-hover:text-accent transition-colors">
          {voice.title}
        </h2>
        <p className="serif-jp text-sm leading-[2] text-muted mt-5">
          {voice.excerpt}
        </p>
        <div className="mt-7 flex items-center justify-between gap-6">
          <span className="serif-en text-[11px] tracking-[0.25em] text-muted">
            {voice.readingMinutes} MIN READ
          </span>
          <span className="serif-en text-xs tracking-[0.25em] border-b border-foreground pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
            Read Voice
          </span>
        </div>
      </Link>
    </article>
  );
}
