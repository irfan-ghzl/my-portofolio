"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { kandidatGambar } from "@/lib/gambar";

type MediaProyekProps = {
  /** Path gambar sampul di `public/`. Kosong/`null` → langsung pakai cadangan. */
  image?: string | null;
  nama: string;
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
  cadangan,
}: MediaProyekProps) {
  const kandidat = image ? kandidatGambar(image) : [];
  const [indeks, setIndeks] = useState(0);
  const berkas = kandidat[indeks];

  if (!berkas) return <>{cadangan}</>;

  return (
    <div className="relative aspect-[16/9] overflow-hidden border border-line bg-bg-soft">
      <Image
        src={berkas}
        alt={`Tangkapan sampul proyek ${nama}`}
        fill
        unoptimized
        sizes="(min-width: 1024px) 900px, 100vw"
        className="object-cover"
        onError={() => setIndeks((n) => n + 1)}
      />
    </div>
  );
}
