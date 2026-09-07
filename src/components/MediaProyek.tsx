import { asetPublik, varianTerang } from "@/lib/gambar";

type MediaProyekProps = {
  /** Path gambar sampul di `public/`. Kosong/`null` → langsung pakai cadangan. */
  image?: string | null;
  nama: string;
  /**
   * True bila gambar sampul berasal dari halaman prototipe UI, bukan dari
   * aplikasi produksi. Menampilkan lencana "PROTOTIPE" di atas gambar dan
   * mengubah teks alternatifnya supaya tidak mungkin disalahartikan sebagai
   * tangkapan layar aplikasi yang sebenarnya.
   */
  prototipe?: boolean;
  /**
   * Yang ditampilkan bila gambar sampul tidak ada: diagram arsitektur proyek,
   * atau placeholder tipografis.
   */
  cadangan: React.ReactNode;
};

/**
 * Slot media kartu proyek — dengan sampul per tema.
 *
 * Sebelumnya hanya ada satu tangkapan bertema gelap. Di mode terang, empat
 * persegi panjang hitam menganga di tengah halaman kertas: jelas bukan pilihan
 * desain, melainkan aset yang lupa dibuat. Sekarang tiap sampul punya dua
 * berkas — `<nama>.jpg` (gelap) dan `<nama>-terang.jpg` — keduanya ditangkap
 * ulang dari halaman prototipe kita sendiri oleh `skrip-tangkap.mjs`.
 *
 * Pertukarannya dilakukan CSS, lewat dua custom property yang dibaca oleh
 * `.sampul-proyek` di `globals.css`. Alasannya: tema situs ini dikendalikan
 * kelas `dark` pada <html> (bukan `prefers-color-scheme`), jadi `<picture
 * media>` tidak akan ikut berubah saat tombol tema ditekan. Memakai latar CSS
 * juga berarti peramban hanya mengunduh varian yang benar-benar tampil —
 * sepasang `<img>` yang saling disembunyikan akan mengunduh keduanya.
 *
 * Karena elemennya bukan `<img>`, aksesibilitasnya dijaga eksplisit dengan
 * `role="img"` + `aria-label` yang isinya sama persis dengan teks alternatif
 * sebelumnya.
 */
export default function MediaProyek({
  image,
  nama,
  prototipe = false,
  cadangan,
}: MediaProyekProps) {
  if (!image) return <>{cadangan}</>;

  const alt = prototipe
    ? `Tangkapan halaman prototipe UI ${nama} — rekonstruksi antarmuka untuk portofolio, bukan tangkapan layar aplikasi produksi`
    : `Tangkapan sampul proyek ${nama}`;

  return (
    <figure className="m-0">
      <div className="relative aspect-[16/9] overflow-hidden border border-line bg-bg-soft">
        <div
          role="img"
          aria-label={alt}
          className="sampul-proyek absolute inset-0"
          style={
            {
              "--sampul-gelap": `url("${asetPublik(image)}")`,
              "--sampul-terang": `url("${asetPublik(varianTerang(image))}")`,
            } as React.CSSProperties
          }
        />

        {prototipe ? (
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 bg-perhatian px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-perhatian-kontras uppercase"
          >
            Prototipe
          </span>
        ) : null}
      </div>
    </figure>
  );
}
