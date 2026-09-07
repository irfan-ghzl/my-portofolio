import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/profile";
import Section from "./Section";

/** Mengambil bagian "owner/repo" dari URL GitHub sebagai label tautan. */
function labelRepo(url: string): string {
  const bagian = url.replace(/\/+$/, "").split("/");
  return bagian.slice(-2).join("/");
}

export default function Projects() {
  return (
    <Section id="proyek" title="Proyek" index="04">
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <li
            key={project.name}
            data-reveal
            style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
            className="group relative flex flex-col border border-line bg-bg-elev p-7 shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[var(--shadow-lift)] sm:p-8"
          >
            {/* Aksen tipis di tepi atas, muncul saat hover. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
            />

            <span
              aria-hidden="true"
              className="font-mono text-[11px] tracking-[0.24em] text-ink-3"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-4 text-lg font-semibold text-ink sm:text-xl">
              {project.name}
            </h3>

            {project.description ? (
              <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-[1.7] text-ink-2">
                {project.description}
              </p>
            ) : null}

            {/* Chip teknologi selalu menempel ke dasar kartu, sehingga kartu
                tanpa deskripsi tidak menyisakan rongga kosong. */}
            <ul className="mt-auto flex flex-wrap gap-2 pt-8">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="border border-line bg-bg-soft px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-2"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {project.repos && project.repos.length > 0 ? (
              <ul className="mt-6 space-y-1.5 border-t border-line pt-5">
                {project.repos.map((repo) => (
                  <li key={repo}>
                    <a
                      href={repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 font-mono text-xs text-accent-ink underline-offset-4 hover:underline"
                    >
                      <span>{labelRepo(repo)}</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only">
                        (repositori {project.name} di GitHub)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
