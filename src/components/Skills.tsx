import { skills } from "@/data/profile";
import { beriBobot, type Tingkat } from "@/lib/keahlian";
import Section from "./Section";

/**
 * Tiga berat visual, bukan 41 pil kembar.
 *
 * "inti" mendapat pil bertepi sian dan huruf lebih besar, "pendukung" pil
 * netral seukuran biasa, "lainnya" hanya teks mono teredam tanpa kotak. Semua
 * tetap terbaca sebagai daftar yang sama; yang berubah hanya berat.
 */
const kelasTingkat: Record<Tingkat, string> = {
  inti: "border border-accent/50 bg-accent-soft px-3 py-1.5 text-[0.9375rem] font-medium text-accent-ink",
  pendukung:
    "border border-line bg-bg-soft px-2.5 py-1 text-[0.8125rem] text-ink-2",
  lainnya: "px-1.5 py-1 text-[0.75rem] text-ink-3",
};

export default function Skills() {
  const kelompok = skills.map(beriBobot);

  return (
    <Section
      id="keahlian"
      title="Keahlian"
      index="05"
      description="Berat visualnya diturunkan dari halaman ini sendiri: yang disebut di butir pengalaman peran sekarang dan di tumpukan proyek tampil paling tebal. Bukan penilaian diri, hanya hitungan pemakaian."
    >
      {/* Kolom CSS, bukan kisi: kelompok yang isinya pendek tidak lagi menyisakan
          sel kosong setinggi kelompok terpanjang di barisnya. */}
      <dl className="columns-1 gap-x-10 sm:columns-2 lg:columns-3">
        {kelompok.map((group, i) => (
          <div
            key={group.category}
            data-reveal
            style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
            className="mb-8 break-inside-avoid"
          >
            <dt className="flex items-baseline gap-3 border-b border-line pb-2.5">
              <span
                aria-hidden="true"
                className="font-mono text-[11px] tracking-[0.2em] text-accent-ink"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] tracking-[0.22em] text-ink-3 uppercase">
                {group.category}
              </span>
            </dt>
            <dd className="mt-3.5">
              <ul className="flex flex-wrap items-center gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item.nama}
                    className={`font-mono leading-none transition-colors ${kelasTingkat[item.tingkat]}`}
                  >
                    {item.nama}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
