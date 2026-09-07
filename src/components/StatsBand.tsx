import { stats } from "@/data/profile";
import CountUp from "./CountUp";

export default function StatsBand() {
  return (
    <section
      aria-labelledby="angka-judul"
      className="border-y border-line bg-bg-soft"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10">
          <div data-reveal>
            <span
              aria-hidden="true"
              className="font-mono text-xs tracking-[0.28em] text-accent-ink"
            >
              01
            </span>
          </div>

          <div>
            <h2
              id="angka-judul"
              data-reveal
              className="font-mono text-xs tracking-[0.28em] text-ink-3 uppercase"
            >
              Dalam angka
            </h2>

            <dl className="mt-10 grid grid-cols-1 gap-px border border-line-strong bg-line-strong sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 90}ms` } as React.CSSProperties
                  }
                  className="flex flex-col-reverse gap-4 bg-bg-soft p-6 sm:p-8"
                >
                  <dt className="max-w-[22ch] font-mono text-[11px] leading-relaxed tracking-[0.18em] text-ink-3 uppercase">
                    {stat.label}
                  </dt>
                  <dd className="text-stat font-semibold text-ink tabular-nums">
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
