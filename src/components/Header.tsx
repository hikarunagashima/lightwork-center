"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-6 py-5 max-w-[1400px] mx-auto">
        <Link
          href="/"
          className="text-sm tracking-[0.2em] font-medium"
          onClick={() => setIsOpen(false)}
        >
          LIGHTWORK CENTER
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          <Link
            href="/services"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="/events"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            Contact
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
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 pb-8 pt-2 gap-6 bg-background/95 backdrop-blur-sm border-t border-border">
          <Link
            href="/services"
            className="text-sm text-muted hover:text-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/events"
            className="text-sm text-muted hover:text-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted hover:text-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors inline-block w-fit"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
