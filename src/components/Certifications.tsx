import { Award } from "lucide-react";
import { certifications } from "@/data/profile";
import Section from "./Section";

export default function Certifications() {
  return (
    <Section id="sertifikasi" title="Sertifikasi">
      <ul className="grid gap-6 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li
            key={cert.name}
            className="rounded-lg border border-slate-200 p-6 dark:border-slate-800"
          >
            <Award
              className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              {cert.name}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {cert.issuer} · {cert.year}
            </p>
            {cert.validUntil ? (
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                {cert.validUntil}
              </p>
            ) : null}
            {cert.credentialId ? (
              <p className="mt-1 font-mono text-xs break-all text-slate-500 dark:text-slate-500">
                Credential ID: {cert.credentialId}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
