import { GitBranch } from "lucide-react";
import { projects } from "@/data/profile";
import Section from "./Section";

/** Mengambil bagian "owner/repo" dari URL GitHub sebagai label tautan. */
function labelRepo(url: string): string {
  const bagian = url.replace(/\/+$/, "").split("/");
  return bagian.slice(-2).join("/");
}

export default function Projects() {
  return (
    <Section id="proyek" title="Proyek">
      <ul className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.name}
            className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {project.name}
            </h3>

            {project.description ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {project.description}
              </p>
            ) : null}

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {project.repos && project.repos.length > 0 ? (
              <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                {project.repos.map((repo) => (
                  <li key={repo}>
                    <a
                      href={repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 font-mono text-xs text-emerald-700 hover:underline dark:text-emerald-400"
                    >
                      <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{labelRepo(repo)}</span>
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
