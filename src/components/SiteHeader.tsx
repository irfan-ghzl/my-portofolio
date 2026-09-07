"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { identity, navigation } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  const [terbuka, setTerbuka] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a
          href="#beranda"
          className="font-mono text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100"
        >
          {identity.name}
        </a>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setTerbuka((v) => !v)}
            aria-expanded={terbuka}
            aria-controls="menu-mobile"
            aria-label={terbuka ? "Tutup menu" : "Buka menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-100 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {terbuka ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {terbuka ? (
        <nav
          id="menu-mobile"
          aria-label="Navigasi seluler"
          className="border-t border-slate-200 bg-white px-5 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950"
        >
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setTerbuka(false)}
                  className="block rounded-md px-2 py-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
