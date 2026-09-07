import { education } from "@/data/profile";
import Section from "./Section";

export default function Education() {
  return (
    <Section id="pendidikan" title="Pendidikan" index="06">
      <ul className="border-t border-line">
        {education.map((item, i) => (
          <li
            key={`${item.degree}-${item.period}`}
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            className="group grid gap-3 border-b border-line py-7 transition-colors hover:bg-bg-soft md:grid-cols-[16rem_minmax(0,1fr)] md:gap-8"
          >
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink-3 uppercase md:pt-1">
              {item.period}
            </p>
            <div>
              <h3 className="text-lg font-semibold text-ink">{item.degree}</h3>
              <p className="mt-1.5 text-sm text-ink-2">
                {item.school}
                <span aria-hidden="true" className="mx-2 text-ink-3">
                  /
                </span>
                <span className="text-ink-3">{item.location}</span>
              </p>
              {item.gpa ? (
                <p className="mt-4 inline-block border border-line bg-bg-soft px-2.5 py-1 font-mono text-xs tracking-wide text-accent-ink">
                  {item.gpa}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
