import { Code2, ExternalLink, Mail, MapPin } from "lucide-react";
import { identity } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="beranda"
      aria-labelledby="beranda-judul"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(45rem_20rem_at_50%_0%,rgba(16,185,129,0.14),transparent)]"
      />
      <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
        <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
          />
          Terbuka untuk kolaborasi
        </p>

        <h1
          id="beranda-judul"
          className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50"
        >
          {identity.name}
        </h1>

        <p className="mt-4 text-lg font-medium text-emerald-700 sm:text-xl dark:text-emerald-400">
          {identity.headline}
        </p>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          {identity.tagline}
        </p>

        <p className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {identity.location}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${identity.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Hubungi saya
          </a>
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <Code2 className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
