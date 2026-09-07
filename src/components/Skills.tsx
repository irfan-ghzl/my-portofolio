import { skills } from "@/data/profile";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="keahlian" title="Keahlian" index="05">
      <dl className="grid gap-px border border-line-strong bg-line-strong sm:grid-cols-2">
        {skills.map((group, i) => (
          <div
            key={group.category}
            data-reveal
            style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}
            className="bg-bg p-6 sm:p-7"
          >
            <dt className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className="font-mono text-[11px] tracking-[0.2em] text-accent-ink"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] tracking-[0.22em] text-ink-3 uppercase">
                {group.category}
              </span>
            </dt>
            <dd className="mt-5">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-bg-soft px-2.5 py-1 font-mono text-[0.8125rem] text-ink-2 transition-colors hover:border-accent/60 hover:text-accent-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
