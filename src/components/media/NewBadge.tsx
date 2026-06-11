/**
 * 再訪者が「新しい回」を一目で見つけるための印（黄金律: 新着シグナル）。
 * 塗りつぶし金×白はWCAG非適合(2.15:1)のため、枠線＋金文字のチップにする（review指摘1）。
 */
export default function NewBadge() {
  return (
    <span className="serif-en text-[10px] tracking-[0.3em] text-accent border border-accent px-2 py-0.5 select-none">
      NEW
    </span>
  );
}
