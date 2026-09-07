import {
  Chip,
  DefsPanah,
  Kelompok,
  LabelTahap,
  Panah,
  PanahKurva,
  Simpul,
  warna,
} from "./primitif";

const ID = "dg-pengaduan";

const alur = [
  { no: "01", label: "Pelaporan", sub: "oleh masyarakat", x: 20 },
  { no: "02", label: "Disposisi", sub: "ke petugas", x: 251 },
  { no: "03", label: "Tanggapan", sub: "oleh petugas", x: 482 },
  { no: "04", label: "Notifikasi", sub: "ke pelapor", x: 713 },
];

const keamanan = [
  { label: "JWT", x: 140 },
  { label: "bcrypt", x: 336 },
  { label: "rate limiting", x: 532 },
  { label: "validasi input", x: 728 },
];

/**
 * Sistem Pengaduan Masyarakat — alur pengaduan end-to-end di atas React,
 * Node.js/Express, dan PostgreSQL yang dijalankan lewat Docker Compose.
 */
export default function PengaduanArch() {
  return (
    <svg
      viewBox="0 0 940 520"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${ID}-judul ${ID}-desk`}
      className="block h-auto w-full"
    >
      <title id={`${ID}-judul`}>Arsitektur Sistem Pengaduan Masyarakat</title>
      <desc id={`${ID}-desk`}>
        Alur pengaduan berjalan empat tahap: pelaporan oleh masyarakat,
        disposisi ke petugas, tanggapan oleh petugas, lalu notifikasi ke
        pelapor. Di bawahnya, antarmuka React dipakai dua peran — masyarakat dan
        petugas — dan memanggil REST API multi-peran Node.js/Express yang
        menyimpan data pada PostgreSQL dengan 8 tabel. Ketiga komponen itu
        dijalankan lewat Docker Compose. Kontrol keamanan mencakup JWT, bcrypt,
        rate limiting, dan validasi input.
      </desc>

      <DefsPanah id={ID} />

      {/* ------------------------------------------------ Alur pengaduan */}
      <g aria-hidden="true">
        <LabelTahap x={20} y={30} anchor="start">
          Alur pengaduan
        </LabelTahap>
      </g>

      {alur.map((a, i) => (
        <g key={a.no}>
          <Simpul
            x={a.x}
            y={54}
            w={207}
            h={66}
            no={a.no}
            label={a.label}
            sub={a.sub}
            aksen={i === 0}
            ukuranLabel={13}
          />
          {i < alur.length - 1 ? (
            <Panah id={ID} x1={a.x + 207} y1={87} x2={a.x + 231} y2={87} />
          ) : null}
        </g>
      ))}

      <line
        x1={20}
        y1={160}
        x2={920}
        y2={160}
        stroke={warna.garisTipis}
        strokeWidth={1}
        aria-hidden="true"
      />

      {/* --------------------------------------------------- Arsitektur */}
      <g aria-hidden="true">
        <LabelTahap x={20} y={196} anchor="start">
          Arsitektur
        </LabelTahap>
        <LabelTahap x={100} y={234} anchor="middle">
          Peran
        </LabelTahap>
      </g>

      <Simpul
        x={20}
        y={250}
        w={160}
        h={52}
        label="Masyarakat"
        ukuranLabel={12}
      />
      <Simpul x={20} y={318} w={160} h={52} label="Petugas" ukuranLabel={12} />

      <Kelompok x={230} y={214} w={690} h={196} label="Docker Compose" />

      <PanahKurva id={ID} d="M 180 276 C 215 276, 215 290, 254 290" />
      <PanahKurva id={ID} d="M 180 344 C 215 344, 215 330, 254 330" />

      <Simpul
        x={254}
        y={254}
        w={180}
        h={112}
        label="React"
        sub="antarmuka web"
      />
      <Panah id={ID} x1={434} y1={310} x2={474} y2={310} />
      <Simpul
        x={474}
        y={254}
        w={200}
        h={112}
        label="Node.js"
        sub="Express"
        sub2="REST API multi-peran"
        aksen
      />
      <Panah id={ID} x1={674} y1={310} x2={714} y2={310} />
      <Simpul
        x={714}
        y={254}
        w={182}
        h={112}
        label="PostgreSQL"
        sub="8 tabel"
      />

      {/* ----------------------------------------------------- Keamanan */}
      <rect
        x={20}
        y={440}
        width={900}
        height={56}
        rx={2}
        fill={warna.bidangLembut}
        stroke={warna.garisTipis}
        strokeWidth={1}
      />
      <g aria-hidden="true">
        <LabelTahap x={36} y={472} anchor="start">
          Keamanan
        </LabelTahap>
      </g>
      {keamanan.map((k) => (
        <Chip key={k.label} x={k.x} y={456} w={174} h={32} label={k.label} />
      ))}
    </svg>
  );
}
