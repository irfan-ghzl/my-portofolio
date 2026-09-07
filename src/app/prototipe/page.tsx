import { ArrowLeft, ArrowRight, TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PENYANGKALAN_PROTOTIPE, daftarPrototipe } from "@/data/prototipe";

export const metadata: Metadata = {
  title: "Prototipe UI proyek",
  description: PENYANGKALAN_PROTOTIPE,
};

/** Halaman daftar agar `/prototipe/` tidak menjadi jalur buntu. */
export default function Halaman() {
  return (
    <>
      <div
        role="note"
        aria-label="Penyangkalan prototipe"
        className="sticky top-0 z-50 bg-accent text-[#0a0a0b] shadow-[0_1px_0_rgba(10,10,11,0.25)]"
      >
        <p className="mx-auto flex max-w-6xl items-start gap-2.5 px-5 py-2.5 text-[0.8125rem] leading-snug font-medium sm:px-8">
          <TriangleAlert
            className="mt-[3px] h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <span>
            <strong className="font-mono text-[0.75rem] font-bold tracking-[0.14em] uppercase">
              Prototipe UI
            </strong>{" "}
            — rekonstruksi antarmuka untuk keperluan portofolio,{" "}
            <strong className="font-semibold">
              bukan tangkapan layar aplikasi produksi
            </strong>
            .
          </span>
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="border-b border-line py-8 sm:py-10">
          <Link
            href="/#proyek"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-ink-3 uppercase transition-colors hover:text-accent-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Kembali ke portofolio
          </Link>
          <h1 className="mt-6 text-3xl font-semibold text-ink sm:text-4xl">
            Prototipe UI proyek
          </h1>
          <p className="mt-4 max-w-[70ch] text-[0.9375rem] leading-[1.7] text-ink-2">
            Empat rekonstruksi antarmuka yang dibuat khusus untuk portofolio ini.
            Fitur yang diperagakan dibatasi pada yang tertulis di deskripsi
            proyek, dan seluruh datanya adalah data contoh fiktif.
          </p>
        </header>

        <main id="konten" className="py-10 sm:py-14">
          <ul className="grid gap-4 sm:grid-cols-2">
            {daftarPrototipe.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/prototipe/${p.slug}/`}
                  className="flex h-full flex-col border border-line bg-bg-elev p-5 transition-colors hover:border-accent/60 sm:p-6"
                >
                  <span className="font-mono text-[10px] tracking-[0.24em] text-accent-ink uppercase">
                    {p.kategori}
                  </span>
                  <span className="mt-2 text-lg font-semibold text-ink">
                    {p.proyek}
                  </span>
                  <span className="mt-3 text-sm leading-[1.7] text-ink-2">
                    {p.ringkas}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-xs tracking-[0.12em] text-accent-ink uppercase">
                    Buka prototipe
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </main>

        <footer className="border-t border-line py-10">
          <p className="max-w-[70ch] text-[0.8125rem] leading-[1.7] text-ink-3">
            {PENYANGKALAN_PROTOTIPE}
          </p>
        </footer>
      </div>
    </>
  );
}
