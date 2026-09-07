import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BlokPenyangkalan,
  PitaTipis,
} from "@/components/prototipe/Penyangkalan";
import { PENYANGKALAN_PROTOTIPE, daftarPrototipe } from "@/data/prototipe";

export const metadata: Metadata = {
  title: "Prototipe UI proyek",
  description: PENYANGKALAN_PROTOTIPE,
};

/** Halaman daftar agar `/prototipe/` tidak menjadi jalur buntu. */
export default function Halaman() {
  return (
    <div className="laman-prototipe">
      <PitaTipis />

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
            proyek.
          </p>

          <BlokPenyangkalan className="mt-6">
            Seluruh datanya adalah data contoh fiktif.
          </BlokPenyangkalan>
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
    </div>
  );
}
