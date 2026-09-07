import { ArrowUpRight, Code2, Mail, MapPin, Phone } from "lucide-react";
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
      Icon: ArrowUpRight,
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
      index="08"
      description="Terbuka untuk diskusi seputar backend Go, infrastruktur, dan sistem berskala besar."
    >
      <ul className="grid gap-px border border-line-strong bg-line-strong sm:grid-cols-2">
        {kontak.map(({ label, value, href, Icon, external }, i) => (
          <li
            key={label}
            data-reveal
            style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}
          >
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="group flex h-full items-start gap-5 bg-bg p-6 transition-colors hover:bg-bg-soft sm:p-7"
            >
              <Icon
                className="mt-1 h-4 w-4 shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block font-mono text-[11px] tracking-[0.22em] text-ink-3 uppercase">
                  {label}
                </span>
                <span className="mt-2 block font-mono text-sm break-all text-ink group-hover:text-accent-ink">
                  {value}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-ink-3 uppercase">
        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
        {identity.location}
      </p>
    </Section>
  );
}
