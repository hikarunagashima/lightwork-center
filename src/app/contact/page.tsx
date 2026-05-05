import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "セレモニーへの参加は、事前のお話合いから始まります。お問い合わせ後、ご状況をお伺いしたうえでご案内します。",
};

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 max-w-[860px] mx-auto">
        <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10 editorial-in">
          ⊙ &nbsp; INQUIRE
        </p>
        <h1 className="serif-en text-5xl sm:text-7xl font-light leading-[0.98] tracking-tight editorial-in-delay-1">
          Get&nbsp;in
          <br />
          Touch.
        </h1>
        <p className="serif-jp text-base text-muted leading-[2.1] mt-14 max-w-xl editorial-in-delay-2">
          セレモニーへの参加は、事前のお話合いから始まります。
          お一人おひとりの状況に合わせた準備が必要なため、
          一度ご状況を伺ったうえでご案内しています。
        </p>
      </section>

      {/* Process */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[860px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-muted mb-12">
            ⊙ &nbsp; THE PROCESS
          </p>
          <ol className="space-y-12">
            {[
              {
                num: "01",
                title: "Inquiry",
                jp: "お問い合わせ",
                desc: "下記のTelegramより、ご状況とご希望をお知らせください。",
              },
              {
                num: "02",
                title: "Conversation",
                jp: "事前のお話合い",
                desc: "ZOOMによるオンライン面談にて、状況・動機・健康状態・過去のスピリチュアル体験などをお伺いします。",
              },
              {
                num: "03",
                title: "Programme",
                jp: "プログラムの提案",
                desc: "お話合いの内容を踏まえ、最適なプログラムと日程をご一緒に決めていきます。",
              },
              {
                num: "04",
                title: "Ceremony",
                jp: "セレモニー",
                desc: "場を整え、メディスンを編み、儀式を行います。前後の対話・統合のサポートも含まれます。",
              },
            ].map((step) => (
              <li
                key={step.num}
                className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 md:gap-12"
              >
                <div>
                  <p className="serif-en text-sm tracking-[0.35em] text-accent">
                    {step.num}
                  </p>
                </div>
                <div>
                  <h3 className="serif-en text-2xl font-light">{step.title}</h3>
                  <p className="serif-jp text-xs tracking-[0.25em] text-muted mt-1 mb-4">
                    {step.jp}
                  </p>
                  <p className="serif-jp text-base text-muted leading-[2]">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Apply via Telegram */}
      <section className="py-32 px-6 border-t border-border bg-paper-deep/30">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-en text-xs tracking-[0.45em] text-muted mb-10">
            ⊙ &nbsp; APPLY
          </p>
          <p className="serif-jp text-base text-muted leading-[2] mb-10 max-w-md mx-auto">
            お申し込み・ご相談は Telegram にて承ります。
          </p>
          <a
            href="https://t.me/shamanhikaru"
            target="_blank"
            rel="noopener noreferrer"
            className="serif-en inline-block text-sm tracking-[0.25em] border border-foreground px-12 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            Apply&nbsp;via&nbsp;Telegram
          </a>
          <p className="serif-en text-xs tracking-[0.3em] text-muted mt-6">
            @shamanhikaru
          </p>

          <p className="serif-jp text-xs text-muted mt-10 leading-[2]">
            Telegram は、世界中で使われている
            セキュアなメッセージングアプリです。
            <br className="hidden sm:block" />
            まだお持ちでない方は{" "}
            <a
              href="https://telegram.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="serif-en text-foreground border-b border-mute-soft hover:border-foreground transition-colors pb-0.5"
            >
              telegram.org
            </a>
            {" "}から無料でダウンロードいただけます（iOS / Android / PC）。
          </p>

          <p className="serif-jp text-xs text-muted mt-16 leading-relaxed">
            お申し込みの際は、ご希望のプログラム、現在のご状況、
            <br className="hidden sm:block" />
            ご希望の連絡方法・時間帯などを併せてお知らせください。
            <br className="hidden sm:block" />
            お話合いの後に、メディスンホイール プログラム表をお送りいたします。
          </p>
        </div>
      </section>

      {/* First visit link */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="serif-jp text-base text-muted leading-[2.1] mb-10">
            初めての方は、こちらもご一読ください。
          </p>
          <Link
            href="/first-visit"
            className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground transition-colors py-4 border-b border-mute-soft hover:border-foreground"
          >
            First&nbsp;Visit&nbsp;→
          </Link>
        </div>
      </section>
    </div>
  );
}
