import { stats } from "@/data/profile";
import CountUp from "./CountUp";

/**
 * Pita statistik — bukti paling meyakinkan di halaman ini, jadi ia mendapat
 * bidangnya sendiri tepat setelah hero, bukan strip tipis yang terlewat saat
 * digulir: angka setinggi ±100 px, ruang napas besar, label jelas, dan satu
 * baris konteks pendukung (potongan langsung dari butir pengalaman).
 *
 * Perilaku hitung-naik dan jaminan nilai persisnya tidak berubah — `CountUp`
 * hanya menganimasikan bila hasil uraiannya identik dengan string di
 * `profile.ts`, dan server tetap merender nilai aslinya.
 */
export default function StatsBand() {
  return (
    <section
      aria-labelledby="angka-judul"
      className="relative isolate overflow-hidden border-y border-line bg-bg-soft"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="flex items-baseline gap-4" data-reveal>
          <span
            aria-hidden="true"
            className="font-mono text-xs tracking-[0.28em] text-accent-ink"
          >
            01
          </span>
          <h2
            id="angka-judul"
            className="font-mono text-xs tracking-[0.28em] text-ink-3 uppercase"
          >
            Dalam angka
          </h2>
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-line-strong sm:block"
          />
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              /* `flex-col-reverse`: di DOM `dt` mendahului `dd` (syarat HTML
                 untuk `div` di dalam `dl`), tapi yang terlihat lebih dulu
                 adalah angkanya. */
              className="flex flex-col-reverse justify-end"
            >
              <dt className="mt-5 border-t border-line pt-4">
                <span className="block font-mono text-[11px] leading-relaxed tracking-[0.18em] text-ink-2 uppercase">
                  {stat.label}
                </span>
                {stat.context ? (
                  <span className="mt-2.5 block max-w-[34ch] text-[0.8125rem] leading-[1.6] text-ink-3">
                    {stat.context}
                  </span>
                ) : null}
              </dt>

              <dd className="text-angka font-semibold text-ink tabular-nums">
                {/* Rusuk sian pendek di atas tiap angka — penanda identitas,
                    pengganti kisi garis yang dulu mengurung tiap sel. */}
                <span
                  aria-hidden="true"
                  className="mb-6 block h-[3px] w-10 bg-accent"
                />
                {/* Dua angka terpanjang ("30,7 juta") membungkus jadi dua
                    baris, dua lainnya tidak. `min-h` sebesar dua baris membuat
                    keempat label tetap sebaris di layar lebar. */}
                <span className="block sm:min-h-[1.72em]">
                  <CountUp value={stat.value} />
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
