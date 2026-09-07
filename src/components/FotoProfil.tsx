"use client";

import Image from "next/image";
import { useState } from "react";
import { inisial, kandidatGambar } from "@/lib/gambar";

type FotoProfilProps = {
  /** Path foto di `public/`, mis. "/profile.jpg". `null` → langsung monogram. */
  src: string | null;
  /** Nama pemilik; dipakai untuk teks alternatif dan inisial monogram. */
  nama: string;
};

/**
 * Potret pemilik situs.
 *
 * Selama berkas foto belum ada (atau gagal dimuat), komponen menampilkan
 * monogram inisial bergaya sistem desain — bukan gambar rusak atau kotak
 * kosong. Varian ekstensi lain (`.png` bila `.jpg` tidak ada) dicoba lebih
 * dulu sebelum jatuh ke monogram.
 */
export default function FotoProfil({ src, nama }: FotoProfilProps) {
  const kandidat = src ? kandidatGambar(src) : [];
  const [indeks, setIndeks] = useState(0);
  const berkas = kandidat[indeks];

  return (
    <div className="relative w-28 shrink-0 sm:w-32 lg:w-full lg:max-w-[13.5rem]">
      <div className="relative aspect-square overflow-hidden border border-line-strong bg-bg-soft">
        {berkas ? (
          <Image
            src={berkas}
            alt={`Potret ${nama}`}
            fill
            unoptimized
            priority
            sizes="(min-width: 1024px) 216px, 128px"
            className="object-cover"
            onError={() => setIndeks((n) => n + 1)}
          />
        ) : (
          /* Monogram: dekoratif — namanya sudah ada sebagai <h1> di sebelahnya. */
          <div
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          >
            <span className="font-mono text-[1.75rem] font-medium tracking-[0.08em] text-ink sm:text-[2rem] lg:text-[3.25rem]">
              {inisial(nama)}
            </span>
          </div>
        )}

        {/* Tanda sudut aksen — membuat bingkai terbaca sebagai pilihan desain. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-4 w-px bg-accent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-px w-4 bg-accent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 h-4 w-px bg-accent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 h-px w-4 bg-accent"
        />
      </div>
    </div>
  );
}
