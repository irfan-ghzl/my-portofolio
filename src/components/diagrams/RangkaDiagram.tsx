import type { ReactNode } from "react";

type RangkaDiagramProps = {
  /** Label kecil di kepala bingkai. Default: "Diagram arsitektur". */
  label?: string;
  /** Keterangan berbahasa Indonesia di bawah diagram. */
  caption: string;
  /**
   * Lebar minimum diagram dalam piksel. Bila ruang yang tersedia lebih sempit,
   * bingkai digulir mendatar alih-alih memampatkan diagram sampai tak terbaca.
   */
  minWidth: number;
  children: ReactNode;
};

/**
 * Bingkai bersama untuk semua diagram: kepala bertanda, area gulir mendatar
 * yang bisa difokuskan lewat papan ketik, dan keterangan di bawahnya.
 */
export default function RangkaDiagram({
  label = "Diagram arsitektur",
  caption,
  minWidth,
  children,
}: RangkaDiagramProps) {
  return (
    <figure className="border border-line bg-bg-soft">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 sm:px-5">
        <span className="font-mono text-[10px] tracking-[0.22em] text-ink-3 uppercase">
          {label}
        </span>
        {/* Petunjuk gulir — hanya relevan saat diagram lebih lebar dari layar. */}
        <span
          aria-hidden="true"
          className="font-mono text-[10px] tracking-[0.18em] text-ink-3 uppercase lg:hidden"
        >
          Geser &rarr;
        </span>
      </div>

      {/* Area gulir: `tabIndex` agar bisa digulir dengan papan ketik saat
          diagram lebih lebar dari layar (mis. di ponsel). */}
      <div
        tabIndex={0}
        role="group"
        aria-label="Area diagram — dapat digulir mendatar"
        className="overflow-x-auto px-4 py-6 sm:px-5 sm:py-7"
      >
        <div style={{ minWidth }}>{children}</div>
      </div>

      <figcaption className="border-t border-line px-4 py-4 text-[0.8125rem] leading-[1.7] text-ink-3 sm:px-5">
        {caption}
      </figcaption>
    </figure>
  );
}
