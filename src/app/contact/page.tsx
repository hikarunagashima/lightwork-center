import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "ライトワークセンターへの面談申し込み",
};

export default function ContactPage() {
  return (
    <div>
      <section className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto">
        <p className="text-sm tracking-[0.3em] text-muted mb-6 animate-in">
          CONTACT
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight animate-in-delay-1">
          面談を申し込む。
        </h1>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl">
            {/* Telegram Notice */}
            <div className="border border-border p-8 sm:p-12 mb-16 animate-in-delay-2">
              <p className="text-sm tracking-[0.2em] text-muted mb-4">
                TELEGRAM について
              </p>
              <p className="leading-relaxed">
                ライトワークセンターでは、会員コミュニティ・情報発信・セッション予約のすべてを
                <strong>Telegram</strong>
                で構成しています。
              </p>
              <p className="leading-relaxed mt-4">
                面談のお申し込みもTelegramから行っていただきます。
                まだアカウントをお持ちでない方は、事前にインストールをお願いします。
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://apps.apple.com/app/telegram-messenger/id686449807"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1"
                >
                  App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=org.telegram.messenger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1"
                >
                  Google Play
                </a>
                <a
                  href="https://desktop.telegram.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-colors border-b border-muted hover:border-foreground pb-1"
                >
                  Desktop
                </a>
              </div>
            </div>

            {/* Flow */}
            <div className="mb-16 animate-in-delay-3">
              <p className="text-sm tracking-[0.2em] text-muted mb-8">
                面談までの流れ
              </p>
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Telegramで連絡",
                    description:
                      "下のボタンからTelegramで直接メッセージを送ってください。",
                  },
                  {
                    step: "02",
                    title: "日程調整",
                    description:
                      "あなたの都合に合わせて、面談の日時を決めます。",
                  },
                  {
                    step: "03",
                    title: "面談（約1時間）",
                    description:
                      "オンラインまたは対面で、あなたの話を聞かせてください。目的と状態に合わせて、進め方を一緒に決めます。",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <p className="text-sm text-muted font-mono shrink-0 pt-1">
                      {item.step}
                    </p>
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="animate-in-delay-4">
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
                Telegramで面談を申し込む
              </a>
              <p className="text-xs text-muted mt-4">
                @shamanhikaru にメッセージが届きます
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
