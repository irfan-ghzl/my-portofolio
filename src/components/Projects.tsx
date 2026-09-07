import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  FolderGit2,
} from "lucide-react";
import Link from "next/link";
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
      {/* Dua kolom di ≥1024 px. Sebelumnya satu kolom selebar halaman, dan
          konsekuensinya sampul 16:9 setinggi ±650 px per kartu: bagian Proyek
          sendirian memakan 4.600 px, hampir separuh halaman. Diagram tetap
          terbaca karena bingkainya sudah punya area gulir mendatar sendiri.

          Rongga di bawah dua proyek tanpa sampul (CRM, Fasisi) tidak ditutup
          dengan memampatkan kisi, melainkan dengan membiarkan placeholder
          tipografisnya memanjang mengisi tinggi kartu — jadi ruang itu menjadi
          bidang yang disengaja, bukan lubang. */}
      <ol className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => {
          const diagram =
            adaDiagram(project.diagram) && project.diagramCaption
              ? { kunci: project.diagram, caption: project.diagramCaption }
              : null;
          const punyaSampul = Boolean(project.image);
          // Kartu tanpa sampul DAN tanpa diagram jatuh ke placeholder; hanya
          // placeholder itu yang boleh memanjang mengisi sisa tinggi kartu.
          const pakaiPlaceholder = !punyaSampul && !diagram;

          return (
            <li
              key={project.name}
              data-reveal
              style={
                { "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties
              }
              className="min-w-0"
            >
              <article className="group relative flex h-full flex-col border border-line bg-bg-elev p-6 shadow-[var(--shadow-card)] transition duration-200 hover:border-accent/60 hover:shadow-[var(--shadow-lift)] sm:p-7">
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
                  <p className="mt-3.5 max-w-[68ch] text-[0.9375rem] leading-[1.7] text-ink-2">
                    {project.description}
                  </p>
                ) : null}

                <ul className="mt-5 flex flex-wrap gap-2">
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
                    arsitektur, kalau tidak juga placeholder tipografis.
                    Bila sampulnya ada, diagram dipindah ke <details> di bawah
                    supaya keduanya tetap tersedia tanpa memanjangkan kartu. */}
                <div className={pakaiPlaceholder ? "mt-6 flex-1" : "mt-6"}>
                  <MediaProyek
                    image={project.image}
                    nama={project.name}
                    prototipe={Boolean(project.prototype)}
                    cadangan={
                      diagram && !punyaSampul ? (
                        <Diagram
                          diagram={diagram.kunci}
                          caption={diagram.caption}
                        />
                      ) : (
                        <PlaceholderProyek nama={project.name} />
                      )
                    }
                  />
                </div>

                {diagram && punyaSampul ? (
                  <details className="group/diagram mt-4 border border-line bg-bg-soft">
                    <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 font-mono text-[11px] tracking-[0.16em] text-ink-2 uppercase transition-colors hover:text-accent-ink">
                      <ChevronRight
                        className="h-3.5 w-3.5 shrink-0 transition-transform group-open/diagram:rotate-90"
                        aria-hidden="true"
                      />
                      Diagram arsitektur
                    </summary>
                    <div className="border-t border-line p-4">
                      <Diagram
                        diagram={diagram.kunci}
                        caption={diagram.caption}
                      />
                    </div>
                  </details>
                ) : null}

                {project.prototype || (project.repos && project.repos.length > 0) ? (
                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-line pt-4">
                    {project.prototype ? (
                      <p>
                        <Link
                          href={project.prototype}
                          className="inline-flex items-center gap-2 border border-accent/60 bg-accent-soft px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-accent-ink uppercase transition-colors hover:border-accent"
                        >
                          Lihat prototipe
                          <ArrowRight
                            className="h-3.5 w-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="sr-only">
                            {" "}
                            UI {project.name} (rekonstruksi antarmuka untuk
                            portofolio, bukan aplikasi produksi)
                          </span>
                        </Link>
                      </p>
                    ) : null}

                    {/* Satu baris chip kecil, bukan tumpukan baris mono selebar
                        kartu — beberapa slug repositori yang ditumpuk terbaca
                        seperti buangan metadata, bukan tautan. */}
                    {project.repos && project.repos.length > 0 ? (
                      <ul className="flex flex-wrap items-center gap-2">
                        {project.repos.map((repo) => (
                          <li key={repo}>
                            <a
                              href={repo}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1.5 border border-line bg-bg-soft px-2.5 py-1 font-mono text-[11px] text-ink-2 transition-colors hover:border-accent/60 hover:text-accent-ink"
                            >
                              <FolderGit2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                              <span>{labelRepo(repo)}</span>
                              <ArrowUpRight
                                className="h-3 w-3 shrink-0"
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
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
