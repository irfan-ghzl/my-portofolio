"use client";

import {
  Check,
  Circle,
  Clock,
  FlaskConical,
  MoveHorizontal,
  X,
} from "lucide-react";
import type { KeyboardEvent, ReactNode } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   Potongan UI kecil yang dipakai ulang oleh keempat prototipe.
   Semuanya memakai token desain yang sudah ada (aksen sian sebagai identitas,
   amber `--perhatian` untuk "sedang berjalan", plus tiga token semantik lain di
   `globals.css`, Inter, JetBrains Mono, tema gelap/terang) supaya prototipe
   terasa satu keluarga dengan portofolionya.
   --------------------------------------------------------------------------- */

/**
 * Penanda bahwa isi di sekitarnya adalah data contoh yang dibuat fiktif.
 *
 * Sengaja dipakai **satu kali per halaman** saja. Penyangkalan utamanya sudah
 * ada di kepala halaman dan di catatan kaki; mengulanginya di tiap widget
 * membuat halaman terbaca seperti berteriak.
 */
export function LabelContoh({ children }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-perhatian/50 bg-perhatian-soft px-2 py-0.5 font-mono text-[10px] tracking-[0.16em] text-perhatian-ink uppercase">
      <FlaskConical className="h-3 w-3" aria-hidden="true" />
      {children ?? "Data contoh"}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Nada status.

   Empat nada semantik, bukan gradasi terang-gelap. Amber sekarang punya arti
   yang sempit — "sedang berjalan / perlu perhatian" — dan tidak lagi dipakai
   untuk status yang sudah selesai.

   Warna tidak pernah menjadi satu-satunya pembeda: tiap nada punya ikon
   sendiri di samping labelnya, jadi statusnya tetap terbaca pada layar
   monokrom maupun bagi pengguna dengan buta warna.
   --------------------------------------------------------------------------- */

export type NadaStatus = "perhatian" | "ok" | "bahaya" | "netral";

const kelasStatus: Record<NadaStatus, string> = {
  perhatian: "border-perhatian/60 bg-perhatian-soft text-perhatian-ink",
  ok: "border-ok/55 bg-ok-soft text-ok-ink",
  bahaya: "border-bahaya/55 bg-bahaya-soft text-bahaya-ink",
  netral: "border-netral/55 bg-netral-soft text-netral-ink",
};

const ikonStatus: Record<NadaStatus, typeof Check> = {
  perhatian: Clock,
  ok: Check,
  bahaya: X,
  netral: Circle,
};

/**
 * Pil status. Label teks + ikon khas per nada, jadi statusnya tetap bisa
 * dibedakan tanpa mengandalkan warna saja.
 */
export function PilStatus({
  nada = "netral",
  children,
}: {
  nada?: NadaStatus;
  children: ReactNode;
}) {
  const Ikon = ikonStatus[nada];
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] whitespace-nowrap uppercase ${kelasStatus[nada]}`}
    >
      <Ikon
        aria-hidden="true"
        className="h-2.5 w-2.5 shrink-0"
        strokeWidth={nada === "netral" ? 4 : 3}
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
    /* `max-w-4xl` menahan lencana `aksi` agar tetap dekat dengan judulnya —
       tanpa itu, di layar 1440 px ke atas lencananya terdampar sendirian di
       tepi kanan, jauh dari teks yang diterangkannya. */
    <div className="flex max-w-4xl flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {nomor ? (
          <span
            aria-hidden="true"
            className="font-mono text-[10px] tracking-[0.28em] text-accent-ink uppercase"
          >
            {nomor}
          </span>
        ) : null}
        <h2 id={id} className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
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
  "w-full border border-line-strong bg-bg-elev px-3 py-2 text-sm text-ink placeholder:text-ink-3 transition-colors hover:border-accent/60 disabled:cursor-not-allowed disabled:border-line disabled:bg-bg-soft disabled:text-ink-3";

/** Tombol utama (aksi berwarna aksen). */
export const kelasTombolUtama =
  "inline-flex items-center justify-center gap-2 border border-accent bg-accent px-4 py-2 font-mono text-xs tracking-[0.12em] uppercase text-accent-kontras transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:border-line-strong disabled:bg-transparent disabled:text-ink-3 disabled:opacity-100";

/** Tombol sekunder (garis tepi netral). */
export const kelasTombolSekunder =
  "inline-flex items-center justify-center gap-2 border border-line-strong bg-transparent px-3 py-1.5 font-mono text-xs tracking-[0.12em] uppercase text-ink-2 transition-colors hover:border-accent hover:text-accent-ink disabled:cursor-not-allowed disabled:border-line disabled:text-ink-3/60 disabled:hover:border-line disabled:hover:text-ink-3/60";

/**
 * Tombol aksi negatif (garis tepi merah). Dipakai untuk "Tolak" dan sejenisnya
 * supaya tidak lagi terlihat identik dengan tombol persetujuan di sebelahnya.
 */
export const kelasTombolBahaya =
  "inline-flex items-center justify-center gap-2 border border-bahaya/70 bg-bahaya-soft px-3 py-1.5 font-mono text-xs tracking-[0.12em] uppercase text-bahaya-ink transition-colors hover:border-bahaya hover:bg-bahaya/15 disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-ink-3/60 disabled:hover:border-line disabled:hover:bg-transparent";

/**
 * Keadaan kosong yang terlihat disengaja: ikon teredam di tengah, satu baris
 * tebal, satu baris sekunder. Menggantikan teks abu-abu yang menempel di sudut
 * kotak putus-putus.
 */
export function KeadaanKosong({
  ikon,
  judul,
  keterangan,
  className = "",
}: {
  ikon: ReactNode;
  judul: string;
  keterangan: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-40 flex-col items-center justify-center gap-3 px-6 py-8 text-center ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid h-11 w-11 place-items-center rounded-full border border-line bg-bg-elev text-ink-3"
      >
        {ikon}
      </span>
      <span className="max-w-[34ch] text-sm font-semibold text-ink-2">
        {judul}
      </span>
      <span className="max-w-[42ch] text-xs leading-[1.7] text-ink-3">
        {keterangan}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Wadah gulir mendatar.

   Tabel lebar dipotong begitu saja di layar sempit dan tidak ada tanda bahwa
   ada isi lain di sebelah kanan. Wadah ini menambahkan dua hal: gradien tipis
   di tepi yang masih bisa digulir, dan petunjuk "geser" yang terlihat.

   Petunjuknya hanya muncul bila isinya memang meluap — dihitung ulang saat
   ukuran berubah. Tanpa JavaScript, petunjuk statis `data-tanpa-js` yang
   dipakai sebagai gantinya.
   --------------------------------------------------------------------------- */

export function WadahGulir({
  label,
  children,
  className = "",
  petunjuk = "geser untuk melihat seluruh kolom",
  latar = "bg",
}: {
  label: string;
  children: ReactNode;
  className?: string;
  petunjuk?: string;
  /** Permukaan tempat wadah ini duduk — menentukan warna topeng gradiennya. */
  latar?: "bg" | "bg-elev";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [meluap, setMeluap] = useState(false);
  const [sisaKanan, setSisaKanan] = useState(false);
  const [sisaKiri, setSisaKiri] = useState(false);

  const ukur = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const lebih = el.scrollWidth - el.clientWidth;
    setMeluap(lebih > 2);
    setSisaKiri(el.scrollLeft > 2);
    setSisaKanan(el.scrollLeft < lebih - 2);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ukur();
    el.addEventListener("scroll", ukur, { passive: true });
    const pengamat =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(ukur);
    pengamat?.observe(el);
    window.addEventListener("resize", ukur);
    return () => {
      el.removeEventListener("scroll", ukur);
      pengamat?.disconnect();
      window.removeEventListener("resize", ukur);
    };
  }, [ukur]);

  return (
    <div className={className}>
      <div className="relative">
        <div
          ref={ref}
          tabIndex={0}
          role="group"
          aria-label={`${label} — dapat digulir mendatar`}
          className="overflow-x-auto border border-line"
        >
          {children}
        </div>

        {/* Topeng gradien di tepi yang masih menyimpan isi. Warnanya harus
            warna permukaan di baliknya, kalau tidak gradiennya justru terbaca
            sebagai bidang yang menyala, bukan sebagai isi yang memudar. */}
        <span
          aria-hidden="true"
          hidden={!sisaKiri}
          className={`pointer-events-none absolute inset-y-px left-px w-10 bg-gradient-to-r to-transparent ${
            latar === "bg" ? "from-bg" : "from-bg-elev"
          }`}
        />
        <span
          aria-hidden="true"
          hidden={!sisaKanan}
          className={`pointer-events-none absolute inset-y-px right-px w-12 bg-gradient-to-l to-transparent ${
            latar === "bg" ? "from-bg" : "from-bg-elev"
          }`}
        />
      </div>

      <p
        hidden={!meluap}
        className="mt-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-accent-ink uppercase"
      >
        <MoveHorizontal className="h-3 w-3 shrink-0" aria-hidden="true" />
        {petunjuk}
      </p>

      {/* Tanpa JavaScript, lebar luapan tidak bisa diukur — petunjuknya
          ditampilkan apa adanya. Sengaja tanpa ikon karena aturan no-JS di
          `globals.css` memaksa `display: block`. */}
      <p
        data-tanpa-js
        className="mt-2 font-mono text-[10px] tracking-[0.16em] text-accent-ink uppercase"
      >
        ↔ {petunjuk}
      </p>
    </div>
  );
}

/**
 * Daftar definisi bertumpuk — bentuk tabel di layar sempit.
 *
 * Dipakai berdampingan dengan tabel sungguhan: tabelnya disembunyikan di bawah
 * `sm`, daftar ini yang muncul, jadi tidak ada kolom yang terpotong sama
 * sekali di ponsel.
 */
export function KartuBaris({
  judul,
  atas,
  isi,
  kaki,
}: {
  judul: ReactNode;
  atas?: ReactNode;
  isi: { label: string; nilai: ReactNode }[];
  kaki?: ReactNode;
}) {
  return (
    <div className="border border-line bg-bg-elev p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{judul}</p>
        {atas}
      </div>
      <dl className="mt-3 space-y-1.5 border-t border-line pt-3 text-sm">
        {isi.map((r) => (
          <div
            key={r.label}
            className="flex items-baseline justify-between gap-3"
          >
            <dt className="font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
              {r.label}
            </dt>
            <dd className="min-w-0 text-right text-ink-2">{r.nilai}</dd>
          </div>
        ))}
      </dl>
      {kaki ? <div className="mt-3">{kaki}</div> : null}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Tab yang dapat dioperasikan dari papan ketik.

   Satu gaya untuk semua prototipe: pengalih tersegmentasi berlatar aksen.
   Bilah tab bergaris bawah 11px yang lama nyaris tak terlihat, jadi dibuang.

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
}: {
  tabs: Tab[];
  aktif: string;
  onGanti: (id: string) => void;
  idPrefix: string;
  label: string;
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

  return (
    <div
      ref={wadah}
      role="tablist"
      aria-label={label}
      className="inline-flex flex-wrap gap-1 border border-line bg-bg-soft p-1"
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
            className={`px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors sm:px-4 ${
              ini
                ? "bg-accent text-accent-kontras"
                : "text-ink-3 hover:bg-accent-soft hover:text-accent-ink"
            }`}
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

/** Id stabil dan aman untuk selector CSS/`querySelector`. */
export function useIdBersih(): string {
  return useId().replace(/:/g, "");
}

/** Format angka rupiah tanpa desimal, mis. 2450000 → "Rp2.450.000". */
export function rupiah(nilai: number): string {
  return `Rp${nilai.toLocaleString("id-ID")}`;
}
