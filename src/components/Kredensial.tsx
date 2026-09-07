import { Award } from "lucide-react";
import { certifications, education } from "@/data/profile";

/**
 * Pendidikan dan Sertifikasi dalam satu pita berdampingan.
 *
 * Keduanya dulu berdiri sebagai bagian selebar halaman sendiri-sendiri: dua
 * baris isi di atas bidang setinggi ±700 px masing-masing. Isinya tidak
 * berubah sedikit pun; yang berubah hanya kepadatannya — dua kolom di ≥1024 px,
 * kartu yang lebih rapat, dan satu batas atas untuk keduanya.
 *
 * Tiap sisi tetap `<section>` dengan `id` dan `<h2>`-nya sendiri, jadi tautan
 * navigasi `#pendidikan` dan `#sertifikasi` serta urutan heading tetap utuh.
 */

function Kepala({ id, nomor, judul }: { id: string; nomor: string; judul: string }) {
  return (
    <div data-reveal className="flex items-baseline gap-4">
      <span
        aria-hidden="true"
        className="font-mono text-xs tracking-[0.28em] text-accent-ink"
      >
        {nomor}
      </span>
      <h2
        id={`${id}-judul`}
        className="text-h2 font-semibold text-ink text-balance"
      >
        {judul}
      </h2>
      <span
        aria-hidden="true"
        className="hidden h-px flex-1 bg-line-strong sm:block"
      />
    </div>
  );
}

export default function Kredensial() {
  return (
    <div className="border-t border-line py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
          <section
            id="pendidikan"
            aria-labelledby="pendidikan-judul"
            className="scroll-mt-24"
          >
            <Kepala id="pendidikan" nomor="06" judul="Pendidikan" />

            <ul className="mt-7 border-t border-line">
              {education.map((item, i) => (
                <li
                  key={`${item.degree}-${item.period}`}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 80}ms` } as React.CSSProperties
                  }
                  className="border-b border-line py-4 transition-colors hover:bg-bg-soft"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-semibold text-ink">
                      {item.degree}
                    </h3>
                    {item.gpa ? (
                      <p className="font-mono text-[11px] tracking-wide text-accent-ink">
                        {item.gpa}
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-ink-2">
                    {item.school}
                    <span aria-hidden="true" className="mx-2 text-ink-3">
                      /
                    </span>
                    <span className="text-ink-3">{item.location}</span>
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] tracking-[0.18em] text-ink-3 uppercase">
                    {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="sertifikasi"
            aria-labelledby="sertifikasi-judul"
            className="scroll-mt-24"
          >
            <Kepala id="sertifikasi" nomor="07" judul="Sertifikasi" />

            <ul className="mt-7 space-y-4">
              {certifications.map((cert, i) => (
                <li
                  key={cert.name}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 80}ms` } as React.CSSProperties
                  }
                  className="border border-line bg-bg-elev p-5 shadow-[var(--shadow-card)] transition duration-200 hover:border-line-strong hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="flex items-start gap-4">
                    <Award
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-base font-semibold text-ink">
                          {cert.name}
                        </h3>
                        <span className="font-mono text-[11px] tracking-[0.22em] text-ink-3">
                          {cert.year}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ink-2">{cert.issuer}</p>

                      {cert.validUntil || cert.credentialId ? (
                        <p className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px]">
                          {cert.validUntil ? (
                            <span className="tracking-wide text-accent-ink">
                              {cert.validUntil}
                            </span>
                          ) : null}
                          {cert.credentialId ? (
                            <span className="break-all text-ink-3">
                              Credential ID: {cert.credentialId}
                            </span>
                          ) : null}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
