import { identity } from "@/data/profile";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-soft py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {identity.name}
        </p>
        <p>Dibangun dengan Next.js, TypeScript, dan Tailwind CSS</p>
      </div>
    </footer>
  );
}
