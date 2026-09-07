"use client";

import { FlaskConical } from "lucide-react";
import type { KeyboardEvent, ReactNode } from "react";
import { useRef } from "react";

/* ---------------------------------------------------------------------------
   Potongan UI kecil yang dipakai ulang oleh keempat prototipe.
   Semuanya memakai token desain yang sudah ada (aksen amber, Inter,
   JetBrains Mono, tema gelap/terang) supaya prototipe terasa satu keluarga
   dengan portofolionya.
   --------------------------------------------------------------------------- */

/** Penanda bahwa isi di sekitarnya adalah data contoh yang dibuat fiktif. */
export function LabelContoh({ children }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-accent/50 bg-accent-soft px-2 py-0.5 font-mono text-[10px] tracking-[0.16em] text-accent-ink uppercase">
      <FlaskConical className="h-3 w-3" aria-hidden="true" />
      {children ?? "Data contoh"}
    </span>
  );
}

export type NadaStatus = "aksen" | "garis" | "redup" | "isi";

const kelasStatus: Record<NadaStatus, string> = {
  // Tahap berjalan / perlu perhatian.
  aksen: "border-accent/60 bg-accent-soft text-accent-ink",
  // Tahap netral / menunggu.
  garis: "border-line-strong bg-transparent text-ink-2",
  // Tahap belum tersentuh.
  redup: "border-line bg-bg-soft text-ink-3",
  // Tahap selesai.
  isi: "border-ink-3/50 bg-ink-3/15 text-ink",
};

const bentukTitik: Record<NadaStatus, string> = {
  aksen: "bg-accent",
  garis: "bg-transparent ring-1 ring-inset ring-ink-3",
  redup: "bg-ink-3/40",
  isi: "bg-ink",
};

/**
 * Pil status. Bentuk titik ikut berubah mengikuti nada, jadi statusnya tetap
 * bisa dibedakan tanpa mengandalkan warna saja.
 */
export function PilStatus({
  nada = "garis",
  children,
}: {
  nada?: NadaStatus;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] whitespace-nowrap uppercase ${kelasStatus[nada]}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${bentukTitik[nada]}`}
      />
      {children}
    </span>
  );
}

/** Judul bagian di dalam prototipe (level 2) beserta keterangan opsional. */
export function JudulBagian({
  id,
  nomor,
  children,
  keterangan,
  aksi,
}: {
  id: string;
  nomor?: string;
  children: ReactNode;
  keterangan?: string;
  aksi?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {nomor ? (
          <span
            aria-hidden="true"
            className="font-mono text-[10px] tracking-[0.28em] text-accent-ink uppercase"
          >
            {nomor}
          </span>
        ) : null}
        <h2
          id={id}
          className="mt-1 text-xl font-semibold text-ink sm:text-2xl"
        >
          {children}
        </h2>
        {keterangan ? (
          <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-ink-3">
            {keterangan}
          </p>
        ) : null}
      </div>
      {aksi ? <div className="shrink-0">{aksi}</div> : null}
    </div>
  );
}

/** Bidang formulir: label terkait secara eksplisit + petunjuk opsional. */
export function Bidang({
  id,
  label,
  petunjuk,
  children,
  className = "",
}: {
  id: string;
  label: string;
  petunjuk?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {petunjuk ? (
        <p id={`${id}-petunjuk`} className="mt-1.5 text-xs text-ink-3">
          {petunjuk}
        </p>
      ) : null}
    </div>
  );
}

/** Kelas dasar untuk input/select/textarea agar seragam di semua prototipe. */
export const kelasInput =
  "w-full border border-line-strong bg-bg-elev px-3 py-2 text-sm text-ink placeholder:text-ink-3/70 transition-colors hover:border-accent/60";

/** Tombol utama (aksi berwarna aksen). */
export const kelasTombolUtama =
  "inline-flex items-center justify-center gap-2 border border-accent bg-accent px-4 py-2 font-mono text-xs tracking-[0.12em] uppercase text-[#0a0a0b] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40";

/** Tombol sekunder (garis tepi). */
export const kelasTombolSekunder =
  "inline-flex items-center justify-center gap-2 border border-line-strong bg-transparent px-3 py-1.5 font-mono text-xs tracking-[0.12em] uppercase text-ink-2 transition-colors hover:border-accent hover:text-accent-ink disabled:cursor-not-allowed disabled:opacity-40";

/* ---------------------------------------------------------------------------
   Tab yang dapat dioperasikan dari papan ketik.

   Semua panel selalu ada di DOM; yang tidak aktif diberi atribut `hidden`.
   Tanpa JavaScript, aturan di `globals.css` menampilkan seluruh panel sekaligus
   sehingga isinya tetap terbaca.
   --------------------------------------------------------------------------- */

export type Tab = { id: string; label: string; catatan?: string };

export function DaftarTab({
  tabs,
  aktif,
  onGanti,
  idPrefix,
  label,
  gaya = "kotak",
  vertikal = false,
}: {
  tabs: Tab[];
  aktif: string;
  onGanti: (id: string) => void;
  idPrefix: string;
  label: string;
  /** "kotak" = tab dasbor bersudut tajam, "segmen" = pengalih tersegmentasi. */
  gaya?: "kotak" | "segmen";
  vertikal?: boolean;
}) {
  const wadah = useRef<HTMLDivElement>(null);

  function saatTombol(e: KeyboardEvent<HTMLButtonElement>) {
    const arah =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;

    let indeks = -1;
    const sekarang = tabs.findIndex((t) => t.id === aktif);

    if (arah !== 0) {
      indeks = (sekarang + arah + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      indeks = 0;
    } else if (e.key === "End") {
      indeks = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const berikut = tabs[indeks];
    if (!berikut) return;
    onGanti(berikut.id);
    wadah.current
      ?.querySelector<HTMLButtonElement>(`#${idPrefix}-tab-${berikut.id}`)
      ?.focus();
  }

  const segmen = gaya === "segmen";

  return (
    <div
      ref={wadah}
      role="tablist"
      aria-label={label}
      aria-orientation={vertikal ? "vertical" : "horizontal"}
      className={
        vertikal
          ? "flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible"
          : segmen
            ? "inline-flex flex-wrap gap-1 border border-line bg-bg-soft p-1"
            : "flex flex-wrap gap-1 border-b border-line"
      }
    >
      {tabs.map((t) => {
        const ini = t.id === aktif;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${t.id}`}
            aria-selected={ini}
            aria-controls={`${idPrefix}-panel-${t.id}`}
            tabIndex={ini ? 0 : -1}
            onClick={() => onGanti(t.id)}
            onKeyDown={saatTombol}
            className={
              segmen
                ? `px-4 py-2 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${
                    ini
                      ? "bg-accent text-[#0a0a0b]"
                      : "text-ink-3 hover:text-ink"
                  }`
                : vertikal
                  ? `flex shrink-0 items-center gap-2 border px-3 py-2.5 text-left font-mono text-[11px] tracking-[0.12em] whitespace-nowrap uppercase transition-colors lg:w-full ${
                      ini
                        ? "border-accent/60 bg-accent-soft text-accent-ink"
                        : "border-transparent text-ink-3 hover:border-line hover:text-ink"
                    }`
                  : `-mb-px shrink-0 border-b-2 px-3 py-2.5 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap uppercase transition-colors ${
                      ini
                        ? "border-accent text-accent-ink"
                        : "border-transparent text-ink-3 hover:text-ink"
                    }`
            }
          >
            {t.label}
            {t.catatan ? (
              <span
                aria-hidden="true"
                className="ml-2 font-mono text-[10px] text-ink-3"
              >
                {t.catatan}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function PanelTab({
  idPrefix,
  id,
  aktif,
  children,
  className = "",
}: {
  idPrefix: string;
  id: string;
  aktif: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${id}`}
      aria-labelledby={`${idPrefix}-tab-${id}`}
      hidden={aktif !== id}
      data-panel-prototipe
      className={className}
    >
      {children}
    </div>
  );
}

/** Format angka rupiah tanpa desimal, mis. 2450000 → "Rp2.450.000". */
export function rupiah(nilai: number): string {
  return `Rp${nilai.toLocaleString("id-ID")}`;
}
