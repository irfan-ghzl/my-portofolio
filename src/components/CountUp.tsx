"use client";

import { useEffect, useRef, useState } from "react";

type Terurai = {
  target: number;
  desimal: number;
  pakaiPemisahRibuan: boolean;
  akhiran: string;
};

/**
 * Mengurai angka Indonesia di awal string, mis. "30,7 juta" atau "1.200".
 * Mengembalikan null bila polanya tidak dikenali — pemanggil lalu menampilkan
 * nilai apa adanya tanpa animasi.
 */
function urai(nilai: string): Terurai | null {
  const cocok = nilai.match(/^(\d[\d.]*)(?:,(\d+))?(.*)$/);
  if (!cocok) return null;

  const bagianBulat = cocok[1];
  const bagianDesimal = cocok[2] ?? "";
  const akhiran = cocok[3] ?? "";
  const pakaiPemisahRibuan = bagianBulat.includes(".");
  const bulat = Number(bagianBulat.replace(/\./g, ""));
  if (!Number.isFinite(bulat)) return null;

  const target = Number(`${bulat}.${bagianDesimal || "0"}`);
  return {
    target,
    desimal: bagianDesimal.length,
    pakaiPemisahRibuan,
    akhiran,
  };
}

function format(n: number, u: Terurai): string {
  const tetap = n.toFixed(u.desimal);
  const [bulat, desimal] = tetap.split(".");
  const bulatTampil = u.pakaiPemisahRibuan
    ? bulat.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : bulat;
  return desimal ? `${bulatTampil},${desimal}${u.akhiran}` : `${bulatTampil}${u.akhiran}`;
}

/**
 * Menghitung naik menuju angka aslinya saat elemen masuk viewport.
 *
 * Nilai final selalu persis sama dengan string di `profile.ts`: bila format
 * hasil urai tidak identik dengan aslinya, animasi dilewati sepenuhnya.
 * Server merender nilai asli, jadi tanpa JS pun angkanya sudah benar.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [tampil, setTampil] = useState(value);

  useEffect(() => {
    const u = urai(value);
    if (!u || format(u.target, u) !== value) return;

    const kurangiGerak = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (kurangiGerak || typeof IntersectionObserver === "undefined") return;

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let mulai = 0;
    const durasi = 1400;

    const langkah = (waktu: number) => {
      if (!mulai) mulai = waktu;
      const p = Math.min((waktu - mulai) / durasi, 1);
      // easeOutExpo — cepat di awal, mendarat halus.
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -9 * p);
      setTampil(p === 1 ? value : format(u.target * eased, u));
      if (p < 1) frame = requestAnimationFrame(langkah);
    };

    const pengamat = new IntersectionObserver(
      (entri) => {
        for (const e of entri) {
          if (!e.isIntersecting) continue;
          pengamat.unobserve(e.target);
          setTampil(format(0, u));
          frame = requestAnimationFrame(langkah);
        }
      },
      { threshold: 0.4 },
    );

    pengamat.observe(el);

    return () => {
      pengamat.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {tampil}
    </span>
  );
}
