import { about } from "@/data/profile";
import Section from "./Section";

export default function About() {
  return (
    <Section id="tentang" title="Tentang" index="02">
      <div className="max-w-[68ch] space-y-6">
        {about.map((paragraf, i) => (
          <p
            key={paragraf.slice(0, 40)}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className={
              i === 0
                ? "text-lead text-ink"
                : "text-base leading-[1.75] text-ink-2"
            }
          >
            {paragraf}
          </p>
        ))}
      </div>
    </Section>
  );
}
