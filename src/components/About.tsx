import { about } from "@/data/profile";
import Section from "./Section";

export default function About() {
  return (
    <Section id="tentang" title="Tentang">
      <div className="max-w-3xl space-y-5">
        {about.map((paragraf) => (
          <p
            key={paragraf.slice(0, 40)}
            className="text-base leading-relaxed text-slate-600 dark:text-slate-400"
          >
            {paragraf}
          </p>
        ))}
      </div>
    </Section>
  );
}
