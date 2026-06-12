"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

const NAV_ITEMS = [
  { href: "/articles", label: "Articles" },
  { href: "/guide", label: "Guide" },
  { href: "/medicine-wheel", label: "Medicine Wheel" },
  { href: "/voices", label: "Voices" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border-soft">
      <nav className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-xl text-accent select-none" aria-hidden>⊙</span>
          <span className="serif-en text-sm tracking-[0.2em] font-light">
            LIGHTWORK&nbsp;CENTER
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="serif-en text-xs tracking-[0.25em] text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/medicine-wheel"
            className="serif-en text-xs tracking-[0.25em] border border-foreground px-5 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            Apply
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-[1px] bg-foreground transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1px] bg-foreground transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 pb-8 pt-2 gap-6 bg-background/95 backdrop-blur-sm border-t border-border-soft max-h-[calc(100dvh-64px)] overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* 棚への直通（黄金律 D-1: カテゴリ導線をナビに置く） */}
          <div className="border-t border-border-soft pt-5">
            <p className="serif-en text-[10px] tracking-[0.35em] text-mute-soft">
              SHELVES
            </p>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-3">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="serif-jp text-xs tracking-[0.1em] text-muted border border-border-soft px-3 py-1.5 hover:text-foreground hover:border-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/medicine-wheel"
            className="serif-en text-sm tracking-[0.25em] border border-foreground px-5 py-2 hover:bg-foreground hover:text-background transition-colors inline-block w-fit"
            onClick={() => setIsOpen(false)}
          >
            Apply
          </Link>
        </div>
      </div>
    </header>
  );
}
