import { Award } from "lucide-react";
import { certifications } from "@/data/profile";
import Section from "./Section";

export default function Certifications() {
  return (
    <Section id="sertifikasi" title="Sertifikasi" index="07">
      <ul className="grid gap-6 md:grid-cols-2">
        {certifications.map((cert, i) => (
          <li
            key={cert.name}
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            className="flex flex-col border border-line bg-bg-elev p-7 shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-lift)] sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <Award className="h-5 w-5 text-accent" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.22em] text-ink-3">
                {cert.year}
              </span>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-ink">{cert.name}</h3>
            <p className="mt-2 text-sm text-ink-2">{cert.issuer}</p>

            <div className="mt-auto pt-6">
              {cert.validUntil ? (
                <p className="font-mono text-xs tracking-wide text-accent-ink">
                  {cert.validUntil}
                </p>
              ) : null}
              {cert.credentialId ? (
                <p className="mt-2 font-mono text-[11px] break-all text-ink-3">
                  Credential ID: {cert.credentialId}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
