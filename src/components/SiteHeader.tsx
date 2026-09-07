"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { identity, navigation } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";

/** Inisial nama untuk lambang kecil di kiri header saat tampilan mengecil. */
function inisial(nama: string): string {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((k) => k[0])
    .join("");
}

export default function SiteHeader() {
  const [terbuka, setTerbuka] = useState(false);
  const [mengecil, setMengecil] = useState(false);
  const [aktif, setAktif] = useState<string>("");
  const terlihatRef = useRef<Set<string>>(new Set());

  // Header memadat setelah halaman digulir sedikit.
  useEffect(() => {
    const saatGulir = () => setMengecil(window.scrollY > 24);
    saatGulir();
    window.addEventListener("scroll", saatGulir, { passive: true });
    return () => window.removeEventListener("scroll", saatGulir);
  }, []);

  // Menandai tautan navigasi untuk bagian yang sedang terlihat.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const bagian = navigation
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);

    if (bagian.length === 0) return;

    const urutan = navigation.map((n) => n.id);

    const pengamat = new IntersectionObserver(
      (entri) => {
        const set = terlihatRef.current;
        for (const e of entri) {
          if (e.isIntersecting) set.add(e.target.id);
          else set.delete(e.target.id);
        }
        // Bagian teratas yang sedang terlihat; kosong bila belum ada satu pun
        // (mis. saat masih di hero) agar tidak ada tautan yang salah tersorot.
        const berikut = urutan.find((id) => set.has(id)) ?? "";
        setAktif(berikut);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    for (const el of bagian) pengamat.observe(el);
    return () => pengamat.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        mengecil
          ? "border-line bg-bg/92 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 transition-[height] duration-300 sm:px-8 ${
          mengecil ? "h-14" : "h-20"
        }`}
      >
        <a
          href="#beranda"
          className="flex min-w-0 items-center gap-2.5 font-mono text-sm font-medium tracking-tight text-ink"
        >
          <span
            aria-hidden="true"
            className="grid h-7 w-7 shrink-0 place-items-center border border-accent/60 text-[10px] tracking-tight text-accent-ink"
          >
            {inisial(identity.name)}
          </span>
          <span className={mengecil ? "hidden sm:inline" : "truncate"}>
            {identity.name}
          </span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const ini = aktif === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={ini ? "true" : undefined}
                    className={`relative block px-3 py-2 font-mono text-xs tracking-[0.12em] uppercase transition-colors ${
                      ini
                        ? "text-accent-ink"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ${
                        ini ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
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
            className="inline-flex h-9 w-9 items-center justify-center border border-line-strong text-ink-2 transition-colors hover:border-accent hover:text-accent-ink lg:hidden"
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
          className="border-t border-line bg-bg px-5 py-3 sm:px-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {navigation.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setTerbuka(false)}
                  aria-current={aktif === item.id ? "true" : undefined}
                  className={`flex items-baseline gap-3 border-b border-line py-3 font-mono text-sm tracking-wide ${
                    aktif === item.id ? "text-accent-ink" : "text-ink-2"
                  }`}
                >
                  <span aria-hidden="true" className="text-[10px] text-ink-3">
                    {String(i + 2).padStart(2, "0")}
                  </span>
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
