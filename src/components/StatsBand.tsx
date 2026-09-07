import { stats } from "@/data/profile";

export default function StatsBand() {
  return (
    <section
      aria-labelledby="angka-judul"
      className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-14">
        <h2
          id="angka-judul"
          className="font-mono text-xs tracking-widest text-slate-500 uppercase dark:text-slate-400"
        >
          Dalam angka
        </h2>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-semibold tracking-tight text-slate-900 tabular-nums sm:text-4xl dark:text-emerald-400">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
