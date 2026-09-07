import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  /** Nomor editorial dua digit, mis. "02". Murni dekoratif. */
  index: string;
  description?: string;
  children: ReactNode;
};

export default function Section({
  id,
  title,
  index,
  description,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-judul`}
      className="scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-6 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10">
          <div data-reveal className="md:pt-3">
            <span
              aria-hidden="true"
              className="font-mono text-xs tracking-[0.28em] text-accent-ink"
            >
              {index}
            </span>
            <span
              aria-hidden="true"
              className="mt-3 hidden h-px w-12 bg-line-strong md:block"
            />
          </div>

          {/* `min-w-0` menahan konten lebar (mis. area gulir diagram) agar tidak
              memaksa kolom grid melebar dan membuat halaman menggulir mendatar. */}
          <div className="min-w-0">
            <div data-reveal>
              <h2
                id={`${id}-judul`}
                className="text-h2 font-semibold text-ink text-balance"
              >
                {title}
              </h2>
              {description ? (
                <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-ink-3">
                  {description}
                </p>
              ) : null}
            </div>
            <div className="mt-10 sm:mt-14">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
