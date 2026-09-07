import { experiences } from "@/data/profile";
import Diagram, { adaDiagram } from "./diagrams";
import Section from "./Section";

export default function ExperienceTimeline() {
  return (
    <Section id="pengalaman" title="Pengalaman" index="03">
      {/* Tulang punggung vertikal + simpul penghubung. */}
      <ol className="relative space-y-6 before:absolute before:top-3 before:bottom-3 before:left-[7px] before:w-px before:bg-line-strong sm:space-y-8">
        {experiences.map((exp, i) => (
          <li
            key={`${exp.company}-${exp.period}`}
            data-reveal
            style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
            className="relative pl-8 sm:pl-12"
          >
            <span
              aria-hidden="true"
              className={`absolute top-[1.15rem] left-0 h-[15px] w-[15px] rounded-full border-2 ${
                exp.current
                  ? "denyut border-accent bg-accent"
                  : "border-line-strong bg-bg"
              }`}
            />

            <article className="border border-line bg-bg-elev p-6 shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)] sm:p-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.18em] text-ink-3 uppercase">
                <span>{exp.period}</span>
                {exp.current ? (
                  <span className="border border-accent/50 bg-accent-soft px-2 py-0.5 text-accent-ink">
                    Aktif
                  </span>
                ) : null}
              </div>

              <h3 className="mt-4 text-xl font-semibold text-ink sm:text-2xl">
                {exp.role}
              </h3>
              <p className="mt-2 font-mono text-sm text-accent-ink">
                {exp.company}
                <span aria-hidden="true" className="mx-2 text-ink-3">
                  /
                </span>
                <span className="text-ink-3">{exp.location}</span>
              </p>

              <ul className="mt-6 max-w-[68ch] space-y-4">
                {exp.bullets.map((bullet) => (
                  <li
                    key={bullet.slice(0, 48)}
                    className="relative pl-6 text-[0.9375rem] leading-[1.75] text-ink-2"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.7em] left-0 h-px w-3 bg-accent"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Lampiran teknis untuk peran ini — dibaca sebagai bukti kerja,
                  bukan hiasan. */}
              {adaDiagram(exp.diagram) && exp.diagramCaption ? (
                <div className="mt-8">
                  <Diagram
                    diagram={exp.diagram}
                    caption={exp.diagramCaption}
                    label="Diagram arsitektur — pipeline provisioning"
                  />
                </div>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
