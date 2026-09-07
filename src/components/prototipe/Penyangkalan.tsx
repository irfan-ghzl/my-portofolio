import { TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Dua bentuk penyangkalan prototipe, dipakai bersama oleh `/prototipe/` dan
 * setiap halaman `/prototipe/<slug>/`.
 *
 * Sebelumnya penyangkalan berupa pita `sticky` beraksen penuh setinggi ±46 px.
 * Pita itu memotong judul saat halaman digulir dan, di ponsel, memakan
 * sepersepuluh layar selamanya. Sekarang tugasnya dipecah dua: pita tipis yang
 * tetap melekat, dan blok tegas yang duduk di kepala halaman.
 */

/**
 * Pita tipis (±24 px) yang melekat di puncak layar. `aria-hidden` karena
 * isinya diulang persis oleh `BlokPenyangkalan`, yang punya `role="note"`.
 */
export function PitaTipis() {
  return (
    <div aria-hidden="true" className="pita-tipis sticky top-0 z-50">
      <p className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-[3px] font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-accent-ink uppercase sm:px-8">
        <TriangleAlert className="h-3 w-3 shrink-0" aria-hidden="true" />
        Prototipe UI — bukan aplikasi produksi
      </p>
    </div>
  );
}

/**
 * Blok penyangkalan di kepala halaman: tidak melekat, kontras tinggi, dan
 * selalu ikut terlihat pada tangkapan layar dari puncak halaman.
 */
export function BlokPenyangkalan({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      aria-label="Penyangkalan prototipe"
      className={`max-w-[70ch] border border-accent/60 border-l-4 border-l-accent bg-accent-soft px-4 py-3 sm:px-5 ${className}`}
    >
      <p className="flex items-start gap-3 text-[0.875rem] leading-[1.6] text-ink">
        <TriangleAlert
          className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink"
          aria-hidden="true"
        />
        <span>
          <strong className="font-mono text-[0.75rem] font-bold tracking-[0.14em] text-accent-ink uppercase">
            Prototipe UI
          </strong>{" "}
          — rekonstruksi antarmuka untuk keperluan portofolio,{" "}
          <strong className="font-semibold">
            bukan tangkapan layar aplikasi produksi
          </strong>
          .{children ? <> {children}</> : null}
        </span>
      </p>
    </div>
  );
}
