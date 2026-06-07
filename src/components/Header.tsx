"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/articles", label: "Articles" },
  { href: "/category/neo-shamanism", label: "Shelves" },
  { href: "/medicine-wheel", label: "Medicine Wheel" },
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
          isOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 pb-8 pt-2 gap-6 bg-background/95 backdrop-blur-sm border-t border-border-soft">
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
