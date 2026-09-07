"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Pengalih tema. Tema aktif dibaca langsung dari class `dark` pada <html>
 * (disetel sebelum paint oleh skrip di layout), dan ikon/label ditentukan lewat
 * CSS — sehingga tidak ada state React yang bisa tidak sinkron saat hidrasi.
 */
export default function ThemeToggle() {
  function ganti() {
    const gelapSekarang = document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", !gelapSekarang);
    try {
      localStorage.setItem("tema", gelapSekarang ? "terang" : "gelap");
    } catch {
      /* localStorage tidak tersedia — abaikan */
    }
  }

  return (
    <button
      type="button"
      onClick={ganti}
      className="inline-flex h-9 w-9 items-center justify-center border border-line-strong text-ink-2 transition-colors hover:border-accent hover:text-accent-ink"
    >
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
      <Moon className="block h-4 w-4 dark:hidden" aria-hidden="true" />
      <span className="sr-only dark:hidden">Aktifkan mode gelap</span>
      <span className="sr-only hidden dark:inline">Aktifkan mode terang</span>
    </button>
  );
}
