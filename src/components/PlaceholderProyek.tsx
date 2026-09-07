import { inisial } from "@/lib/gambar";

/**
 * Pengganti visual untuk proyek yang belum punya gambar sampul maupun diagram.
 *
 * Sengaja tipografis dan geometris — kisi halus plus monogram nama proyek —
 * supaya terbaca sebagai pilihan desain, bukan gambar yang gagal dimuat.
 */
export default function PlaceholderProyek({ nama }: { nama: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-32 overflow-hidden border border-line bg-bg-soft sm:h-36"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <span className="absolute top-0 left-0 h-5 w-px bg-accent" />
      <span className="absolute top-0 left-0 h-px w-5 bg-accent" />
      <span className="absolute right-0 bottom-0 h-5 w-px bg-accent" />
      <span className="absolute right-0 bottom-0 h-px w-5 bg-accent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="font-mono text-3xl font-medium tracking-[0.12em] text-ink-2 sm:text-4xl">
          {inisial(nama)}
        </span>
        <span className="h-px w-10 bg-accent" />
      </div>
    </div>
  );
}
