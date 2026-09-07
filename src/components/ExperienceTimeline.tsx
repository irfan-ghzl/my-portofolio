import { experiences } from "@/data/profile";
import Section from "./Section";

export default function ExperienceTimeline() {
  return (
    <Section id="pengalaman" title="Pengalaman">
      <ol className="relative space-y-12 border-l border-slate-200 pl-8 sm:pl-10 dark:border-slate-800">
        {experiences.map((exp) => (
          <li key={`${exp.company}-${exp.period}`} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-1.5 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full sm:-left-[calc(2.5rem+5px)] ${
                exp.current
                  ? "bg-emerald-500 ring-4 ring-emerald-500/20"
                  : "bg-slate-300 dark:bg-slate-700"
              }`}
            />

            <p className="font-mono text-xs tracking-wide text-slate-500 dark:text-slate-400">
              {exp.period}
              {exp.current ? (
                <span className="ml-2 rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-700 dark:text-emerald-400">
                  Aktif
                </span>
              ) : null}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {exp.role}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {exp.company} · {exp.location}
            </p>

            <ul className="mt-4 space-y-3">
              {exp.bullets.map((bullet) => (
                <li
                  key={bullet.slice(0, 48)}
                  className="relative pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 left-0 h-1 w-1 rounded-full bg-emerald-600/70 dark:bg-emerald-400/70"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
