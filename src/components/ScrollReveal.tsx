"use client";

import { useEffect } from "react";

/**
 * Peningkatan progresif untuk animasi masuk saat scroll.
 *
 * Konten selalu terlihat secara default. Kelas `reveal-aktif` baru dipasang
 * di sini — jadi bila JavaScript gagal dimuat, tidak ada yang tersembunyi.
 * Tidak aktif sama sekali bila pengguna meminta pengurangan gerak.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const kurangiGerak = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (kurangiGerak || typeof IntersectionObserver === "undefined") return;

    const akar = document.documentElement;
    akar.classList.add("reveal-aktif");

    const pengamat = new IntersectionObserver(
      (entri) => {
        for (const e of entri) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-masuk");
            pengamat.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    const elemen = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    for (const el of elemen) pengamat.observe(el);

    return () => {
      pengamat.disconnect();
      akar.classList.remove("reveal-aktif");
    };
  }, []);

  return null;
}
