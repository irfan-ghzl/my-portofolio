"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { kandidatGambar } from "@/lib/gambar";

type MediaProyekProps = {
  /** Path gambar sampul di `public/`. Kosong/`null` → langsung pakai cadangan. */
  image?: string | null;
  nama: string;
  /**
   * True bila gambar sampul berasal dari halaman prototipe UI, bukan dari
   * aplikasi produksi. Menampilkan lencana "PROTOTIPE" di atas gambar dan
   * mengubah teks alternatifnya supaya tidak mungkin disalahartikan sebagai
   * tangkapan layar aplikasi yang sebenarnya.
   */
  prototipe?: boolean;
  /**
   * Yang ditampilkan bila gambar sampul tidak ada atau gagal dimuat:
   * diagram arsitektur proyek, atau placeholder tipografis.
   */
  cadangan: ReactNode;
};

/**
 * Slot media kartu proyek.
 *
 * Urutan: gambar sampul → (varian ekstensi lain) → cadangan. Tidak pernah
 * menyisakan gambar rusak atau kotak kosong.
 */
export default function MediaProyek({
  image,
  nama,
  prototipe = false,
  cadangan,
}: MediaProyekProps) {
  const kandidat = image ? kandidatGambar(image) : [];
  const [indeks, setIndeks] = useState(0);
  const berkas = kandidat[indeks];

  if (!berkas) return <>{cadangan}</>;

  const alt = prototipe
    ? `Tangkapan halaman prototipe UI ${nama} — rekonstruksi antarmuka untuk portofolio, bukan tangkapan layar aplikasi produksi`
    : `Tangkapan sampul proyek ${nama}`;

  return (
    <figure className="m-0">
      <div className="relative aspect-[16/9] overflow-hidden border border-line bg-bg-soft">
        <Image
          src={berkas}
          alt={alt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
          onError={() => setIndeks((n) => n + 1)}
        />

        {prototipe ? (
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 bg-accent px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-[#0a0a0b] uppercase"
          >
            Prototipe
          </span>
        ) : null}
      </div>

      {prototipe ? (
        <figcaption className="mt-2 font-mono text-[10px] leading-[1.6] tracking-[0.12em] text-ink-3 uppercase">
          Tangkapan halaman prototipe UI — bukan aplikasi produksi
        </figcaption>
      ) : null}
    </figure>
  );
}
