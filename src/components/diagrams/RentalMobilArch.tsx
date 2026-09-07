import {
  DefsPanah,
  Kelompok,
  LabelAlur,
  LabelTahap,
  Panah,
  PanahKurva,
  Simpul,
  warna,
} from "./primitif";

const ID = "dg-rental";

const alur = [
  { no: "01", label: "Katalog", sub: "status ketersediaan", x: 20 },
  { no: "02", label: "Pemesanan", x: 207 },
  { no: "03", label: "Unggah bukti", sub: "pembayaran", x: 394 },
  { no: "04", label: "Konfirmasi", sub: "oleh admin", x: 581 },
  { no: "05", label: "Pengembalian", sub: "unit", x: 768 },
];

/**
 * Aplikasi Rental Mobil — struktur MVC CodeIgniter 3 dengan MySQL, dua hak
 * akses, dan alur transaksi lima tahap.
 */
export default function RentalMobilArch() {
  return (
    <svg
      viewBox="0 0 940 470"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${ID}-judul ${ID}-desk`}
      className="block h-auto w-full"
    >
      <title id={`${ID}-judul`}>Arsitektur Aplikasi Rental Mobil</title>
      <desc id={`${ID}-desk`}>
        Aplikasi disusun dengan pola MVC di atas CodeIgniter 3 dan PHP. Penyewa
        dan admin mengakses Controller, yang meneruskan tampilan ke View
        berbasis Bootstrap dan data ke Model, sedangkan Model berkomunikasi
        dengan basis data MySQL. Alur transaksi berjalan lima tahap: katalog
        mobil dengan status ketersediaan, pemesanan, unggah bukti pembayaran,
        konfirmasi oleh admin, lalu pengembalian unit.
      </desc>

      <DefsPanah id={ID} />

      {/* --------------------------------------------------------- MVC */}
      <g aria-hidden="true">
        <LabelTahap x={20} y={30} anchor="start">
          Struktur MVC
        </LabelTahap>
        <LabelTahap x={100} y={78} anchor="middle">
          Hak akses
        </LabelTahap>
        <LabelTahap x={815} y={178} anchor="middle">
          Penyimpanan
        </LabelTahap>
      </g>

      <Simpul x={20} y={96} w={160} h={48} label="Penyewa" ukuranLabel={12} />
      <Simpul x={20} y={164} w={160} h={48} label="Admin" ukuranLabel={12} />

      <Kelompok x={240} y={56} w={420} h={228} label="CodeIgniter 3 (PHP)" />

      <PanahKurva id={ID} d="M 180 120 C 255 120, 285 110, 350 110" />
      <PanahKurva id={ID} d="M 180 188 C 255 188, 285 132, 350 132" />

      <Simpul x={350} y={92} w={190} h={58} label="Controller" aksen />
      <Simpul x={264} y={196} w={170} h={58} label="View" sub="Bootstrap" />
      <Simpul x={466} y={196} w={170} h={58} label="Model" />

      <PanahKurva id={ID} d="M 400 150 C 400 176, 349 172, 349 196" />
      <PanahKurva id={ID} d="M 490 150 C 490 176, 551 172, 551 196" />

      <Panah id={ID} x1={636} y1={225} x2={730} y2={225} />
      <g aria-hidden="true">
        <LabelAlur x={695} y={214}>
          kueri
        </LabelAlur>
      </g>
      <Simpul x={730} y={196} w={170} h={58} label="MySQL" ukuranLabel={12} />

      <line
        x1={20}
        y1={310}
        x2={920}
        y2={310}
        stroke={warna.garisTipis}
        strokeWidth={1}
        aria-hidden="true"
      />

      {/* --------------------------------------------- Alur transaksi */}
      <g aria-hidden="true">
        <LabelTahap x={20} y={344} anchor="start">
          Alur transaksi
        </LabelTahap>
      </g>

      {alur.map((a, i) => (
        <g key={a.no}>
          <Simpul
            x={a.x}
            y={368}
            w={150}
            h={68}
            no={a.no}
            label={a.label}
            sub={a.sub}
            ukuranLabel={12}
          />
          {i < alur.length - 1 ? (
            <Panah id={ID} x1={a.x + 150} y1={402} x2={a.x + 187} y2={402} />
          ) : null}
        </g>
      ))}
    </svg>
  );
}
