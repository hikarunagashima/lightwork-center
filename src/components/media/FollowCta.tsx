import { NOTE_URL, INSTAGRAM_URL } from "@/lib/site";

const CHANNELS = [
  {
    href: NOTE_URL,
    label: "Note",
    description: "連載の本拠地。フォローで新しい回が届きます",
    external: true,
  },
  {
    href: INSTAGRAM_URL,
    label: "Instagram",
    description: "日々の実践と現場の気配",
    external: true,
  },
  {
    href: "/feed.xml",
    label: "RSS",
    description: "お使いのリーダーで静かに購読",
    external: false,
  },
] as const;

/**
 * 再訪導線（黄金律 C-1: 読了直後の登録枠）。
 * 読み終えた余韻の中に置く。煽らない。命令しない。
 */
export default function FollowCta() {
  return (
    <aside aria-label="更新を受け取る" className="border-y border-border py-10">
      <p className="serif-en text-xs tracking-[0.35em] text-accent">FOLLOW</p>
      <h2 className="serif-jp text-2xl font-light leading-[1.7] mt-5">
        続きは、静かに届きます。
      </h2>
      <p className="serif-jp text-sm leading-[2] text-muted mt-4 max-w-xl">
        連載は急がず、確かな足どりで更新されます。
        お好きな場所で受け取ってください。
      </p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {CHANNELS.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            {...(channel.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group block"
          >
            <span className="serif-en text-sm tracking-[0.25em] border-b border-mute-soft pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
              {channel.label}
            </span>
            <p className="serif-jp text-xs leading-[1.9] text-muted mt-3">
              {channel.description}
            </p>
          </a>
        ))}
      </div>
    </aside>
  );
}
