import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/profile";
import Diagram, { adaDiagram } from "./diagrams";
import MediaProyek from "./MediaProyek";
import PlaceholderProyek from "./PlaceholderProyek";
import Section from "./Section";

/** Mengambil bagian "owner/repo" dari URL GitHub sebagai label tautan. */
function labelRepo(url: string): string {
  const bagian = url.replace(/\/+$/, "").split("/");
  return bagian.slice(-2).join("/");
}

export default function Projects() {
  return (
    <Section id="proyek" title="Proyek" index="04">
      {/* Satu kolom: diagram arsitektur butuh lebar penuh agar tetap terbaca. */}
      <ol className="space-y-8 sm:space-y-10">
        {projects.map((project, i) => (
          <li
            key={project.name}
            data-reveal
            style={
              { "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties
            }
          >
            <article className="group relative flex flex-col border border-line bg-bg-elev p-7 shadow-[var(--shadow-card)] transition duration-200 hover:border-accent/60 hover:shadow-[var(--shadow-lift)] sm:p-8">
              {/* Aksen tipis di tepi atas, muncul saat hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
              />

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] tracking-[0.24em] text-ink-3"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-ink sm:text-xl">
                  {project.name}
                </h3>
              </div>

              {project.description ? (
                <p className="mt-4 max-w-[68ch] text-[0.9375rem] leading-[1.7] text-ink-2">
                  {project.description}
                </p>
              ) : null}

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="border border-line bg-bg-soft px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-2"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {/* Slot media: gambar sampul bila ada, kalau tidak diagram
                    arsitektur, kalau tidak juga placeholder tipografis. */}
              <div className="mt-8">
                <MediaProyek
                  image={project.image}
                  nama={project.name}
                  cadangan={
                    adaDiagram(project.diagram) && project.diagramCaption ? (
                      <Diagram
                        diagram={project.diagram}
                        caption={project.diagramCaption}
                      />
                    ) : (
                      <PlaceholderProyek nama={project.name} />
                    )
                  }
                />
              </div>

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
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
