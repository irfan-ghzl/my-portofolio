import { education } from "@/data/profile";
import Section from "./Section";

export default function Education() {
  return (
    <Section id="pendidikan" title="Pendidikan">
      <ul className="space-y-6">
        {education.map((item) => (
          <li
            key={`${item.degree}-${item.period}`}
            className="rounded-lg border border-slate-200 p-6 dark:border-slate-800"
          >
            <p className="font-mono text-xs tracking-wide text-slate-500 dark:text-slate-400">
              {item.period}
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
              {item.degree}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {item.school} · {item.location}
            </p>
            {item.gpa ? (
              <p className="mt-3 inline-block rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                {item.gpa}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
