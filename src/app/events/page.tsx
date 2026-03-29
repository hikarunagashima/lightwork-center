import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description: "ライトワークセンターのリトリート・セレモニー情報",
};

const events = [
  {
    date: "2026.04.02–04",
    title: "熊谷リトリート",
    location: "埼玉県熊谷市",
    status: "upcoming" as const,
    description:
      "2泊3日のリトリート。言霊を通じたライトワークセッション、カンボなどシャーマニズムのセッションを提供します。仲間の拠点にて開催。",
    details: [
      "言霊ライトワークセッション",
      "カンボ等シャーマニズムセッション",
      "宿泊：1泊5,000円",
      "セッション：すべてドネーション制",
    ],
  },
];

export default function EventsPage() {
  return (
    <div>
      <section className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto">
        <p className="text-sm tracking-[0.3em] text-muted mb-6 animate-in">
          EVENTS
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight animate-in-delay-1">
          リトリート・
          <br />
          セレモニー情報
        </h1>
        <p className="text-muted mt-8 max-w-xl leading-relaxed animate-in-delay-2">
          国内外で定期的に開催するリトリート、セレモニー、
          異言開通ツアーの最新情報。参加はTelegramからお申し込みください。
        </p>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-[1400px] mx-auto">
          {events.length > 0 ? (
            <div className="space-y-px">
              {events.map((event, i) => (
                <div
                  key={i}
                  className="border-t border-border py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16"
                >
                  <div className="md:col-span-2">
                    <p className="text-sm font-mono text-muted">{event.date}</p>
                  </div>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-light">{event.title}</h2>
                    <p className="text-sm text-muted mt-2">{event.location}</p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-muted leading-relaxed">
                      {event.description}
                    </p>
                    {"details" in event && event.details && (
                      <ul className="mt-6 space-y-2">
                        {(event.details as string[]).map((detail) => (
                          <li
                            key={detail}
                            className="text-sm text-muted flex items-center gap-3"
                          >
                            <span className="w-1 h-1 bg-muted rounded-full shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-6">
                      <a
                        href="https://t.me/shamanhikaru"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors tracking-wider"
                      >
                        参加を申し込む
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-t border-border py-24 text-center">
              <p className="text-muted">
                現在予定されているイベントはありません。
              </p>
            </div>
          )}

          {/* Telegram CTA */}
          <div className="border-t border-border pt-16 mt-16">
            <div className="max-w-xl">
              <h3 className="text-xl font-light mb-4">
                最新情報をTelegramで受け取る
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-8">
                リトリートやセレモニーの情報は、Telegramで最速で配信しています。
                参加申し込みもTelegramから行えます。
              </p>
              <a
                href="https://t.me/shamanhikaru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors tracking-wider"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegramでつながる
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
