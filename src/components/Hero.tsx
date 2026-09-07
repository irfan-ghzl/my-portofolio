import { ArrowUpRight, Code2, Mail } from "lucide-react";
import { identity } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="beranda"
      aria-labelledby="beranda-judul"
      className="tekstur-kisi relative isolate -mt-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="cahaya-aksen pointer-events-none absolute inset-0 -z-10"
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-40 pb-16 sm:px-8 sm:pt-48 sm:pb-24 lg:pt-56 lg:pb-32">
        {/* Baris meta atas — mono, seperti header dokumen teknis. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.22em] text-ink-3 uppercase">
          <span className="inline-flex items-center gap-2 text-accent-ink">
            <span
              aria-hidden="true"
              className="denyut inline-block h-1.5 w-1.5 rounded-full bg-accent"
            />
            Terbuka untuk kolaborasi
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px w-8 bg-line-strong sm:block"
          />
          <span>{identity.location}</span>
        </div>

        <h1
          id="beranda-judul"
          className="mt-10 text-display font-semibold text-ink text-balance"
        >
          {identity.name}
        </h1>

        <div className="mt-8 grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <p className="border-l-2 border-accent pl-5 text-lead font-medium text-ink">
            {identity.headline}
          </p>
          <p className="max-w-[62ch] text-base leading-relaxed text-ink-3 sm:text-lg">
            {identity.tagline}
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${identity.email}`}
            className="group inline-flex items-center gap-2 rounded-none bg-accent px-5 py-3 font-mono text-xs tracking-[0.14em] text-[#0a0a0b] uppercase transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Hubungi saya
          </a>
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 border border-line-strong px-5 py-3 font-mono text-xs tracking-[0.14em] text-ink uppercase transition-colors duration-200 hover:border-accent hover:text-accent-ink"
          >
            <Code2 className="h-4 w-4" aria-hidden="true" />
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 border border-line-strong px-5 py-3 font-mono text-xs tracking-[0.14em] text-ink uppercase transition-colors duration-200 hover:border-accent hover:text-accent-ink"
          >
            LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
