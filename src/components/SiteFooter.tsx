import { identity } from "@/data/profile";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:text-slate-400">
        <p>
          © {new Date().getFullYear()} {identity.name}
        </p>
        <p className="font-mono text-xs">
          Dibangun dengan Next.js, TypeScript, dan Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
