import { inisial } from "@/lib/gambar";

/**
 * Slot media untuk proyek yang belum punya gambar sampul maupun diagram.
 *
 * Sebelumnya bentuknya kotak berkisi setinggi 128–144 px dengan satu huruf
 * raksasa di tengah. Bersebelahan dengan empat kartu bergambar, bentuk itu
 * terbaca sebagai gambar yang gagal dimuat.
 *
 * Sekarang bentuknya sengaja **berbeda jenis**, bukan versi gagal dari yang
 * sama: pita rendah selebar kartu, rata kiri, tanpa tekstur sama sekali —
 * monogram bertata huruf mono, rusuk aksen, dan irama tiga kotak geometris di
 * kanan. Tingginya setengah dari slot gambar supaya proporsi kartunya tetap
 * masuk akal tanpa gambar.
 */
export default function PlaceholderProyek({ nama }: { nama: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-20 items-stretch border border-line bg-bg-soft sm:h-24"
    >
      <span className="w-[3px] shrink-0 bg-accent" />

      <span className="flex min-w-0 flex-1 items-center gap-4 px-4 sm:gap-6 sm:px-5">
        <span className="flex shrink-0 flex-col gap-2">
          <span className="font-mono text-xl leading-none font-medium tracking-[0.34em] text-ink-2 sm:text-2xl">
            {inisial(nama)}
          </span>
          <span className="h-px w-12 bg-line-strong sm:w-16" />
        </span>

        {/* Rusuk tipis yang menjahit monogram ke irama kotak, supaya bidang di
            tengah tidak menganga kosong pada kartu selebar penuh. */}
        <span className="h-px min-w-0 flex-1 bg-line" />

        {/* Irama tiga kotak — geometris, bukan tekstur. */}
        <span className="flex shrink-0 items-center gap-2">
          <span className="h-6 w-6 border border-line-strong sm:h-7 sm:w-7" />
          <span className="h-6 w-6 border border-line sm:h-7 sm:w-7" />
          <span className="h-6 w-6 border border-line/60 sm:h-7 sm:w-7" />
        </span>
      </span>
    </div>
  );
}
