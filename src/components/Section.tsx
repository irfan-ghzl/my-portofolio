import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export default function Section({
  id,
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-judul`}
      className="border-t border-slate-200 py-16 sm:py-20 dark:border-slate-800/70"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2
          id={`${id}-judul`}
          className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
