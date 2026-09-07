import { Code2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { identity } from "@/data/profile";
import Section from "./Section";

/** "(+62) 87789509545" -> "+6287789509545" untuk tautan tel: */
function tautanTelepon(phone: string): string {
  const digit = phone.replace(/[^\d]/g, "");
  return `tel:+${digit}`;
}

export default function Contact() {
  const kontak = [
    {
      label: "Surel",
      value: identity.email,
      href: `mailto:${identity.email}`,
      Icon: Mail,
      external: false,
    },
    {
      label: "Telepon",
      value: identity.phone,
      href: tautanTelepon(identity.phone),
      Icon: Phone,
      external: false,
    },
    {
      label: "LinkedIn",
      value: identity.linkedin.replace("https://www.", ""),
      href: identity.linkedin,
      Icon: ExternalLink,
      external: true,
    },
    {
      label: "GitHub",
      value: identity.github.replace("https://", ""),
      href: identity.github,
      Icon: Code2,
      external: true,
    },
  ];

  return (
    <Section
      id="kontak"
      title="Kontak"
      description="Terbuka untuk diskusi seputar backend Go, infrastruktur, dan sistem berskala besar."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {kontak.map(({ label, value, href, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="flex items-start gap-4 rounded-lg border border-slate-200 p-5 transition-colors hover:border-emerald-500/60 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-emerald-500/50 dark:hover:bg-slate-900/60"
            >
              <Icon
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              <span>
                <span className="block font-mono text-xs tracking-widest text-slate-500 uppercase dark:text-slate-400">
                  {label}
                </span>
                <span className="mt-1 block text-sm break-all text-slate-800 dark:text-slate-200">
                  {value}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        {identity.location}
      </p>
    </Section>
  );
}
