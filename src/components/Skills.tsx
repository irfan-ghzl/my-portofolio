import { skills } from "@/data/profile";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="keahlian" title="Keahlian">
      <dl className="grid gap-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <dt className="font-mono text-xs tracking-widest text-slate-500 uppercase dark:text-slate-400">
              {group.category}
            </dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
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
