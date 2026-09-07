/* ---------------------------------------------------------------------------
   Ilustrasi bikinan sendiri untuk slot gambar di dalam prototipe.

   Sebelumnya slot-slot ini berupa persegi berkisi bertuliskan "ILUSTRASI".
   Di tema terang bentuk itu terbaca persis seperti gambar yang gagal dimuat.
   Penggantinya adalah vektor datar yang punya isi: lanskap berlapis yang
   berbeda per tujuan wisata, dan siluet kendaraan per jenis bodi.

   Keduanya dwiwarna dan memakai token yang sudah ada — `--netral` untuk lapisan
   jauh, `--accent` untuk lapisan dekat — jadi tetap satu keluarga dengan
   halaman lainnya di kedua tema. Semuanya `aria-hidden`: gambarnya dekoratif,
   informasinya sudah ada sebagai teks di sebelahnya.
   --------------------------------------------------------------------------- */

/** Lapisan jauh (kabut) → lapisan dekat (siluet). */
const JAUH = "var(--netral)";
const DEKAT = "var(--accent)";

/* --------------------------------------------------------------- Tujuan wisata */

/**
 * Enam lanskap datar, satu per paket contoh. Bentuknya sengaja abstrak — bukan
 * usaha menggambar tempat yang sebenarnya, hanya penanda visual supaya keenam
 * kartu tidak terlihat kembar.
 */
function Lanskap({ varian }: { varian: number }) {
  switch (varian % 6) {
    // Pegunungan + matahari terbit.
    case 0:
      return (
        <>
          <circle cx="126" cy="13" r="8" fill={DEKAT} opacity="0.85" />
          <path
            d="M0 50 V36 L24 16 L46 34 L64 20 L96 50 Z"
            fill={JAUH}
            opacity="0.34"
          />
          <path
            d="M0 50 V42 L20 22 L42 40 L60 26 L90 50 Z"
            fill={JAUH}
            opacity="0.55"
          />
          <path d="M64 50 L104 18 L160 50 Z" fill={DEKAT} opacity="0.42" />
          <path d="M0 50 L38 22 L78 50 Z" fill={DEKAT} opacity="0.66" />
        </>
      );

    // Gugusan pulau + gelombang.
    case 1:
      return (
        <>
          <circle cx="28" cy="12" r="7" fill={DEKAT} opacity="0.82" />
          <path d="M52 32 Q66 13 80 32 Z" fill={JAUH} opacity="0.52" />
          <path d="M90 32 Q101 19 112 32 Z" fill={JAUH} opacity="0.4" />
          <rect x="0" y="32" width="160" height="18" fill={JAUH} opacity="0.26" />
          <path
            d="M0 38 Q14 33 28 38 T56 38 T84 38 T112 38 T140 38 T168 38"
            stroke={DEKAT}
            strokeWidth="2.2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M-8 45 Q6 40 20 45 T48 45 T76 45 T104 45 T132 45 T160 45"
            stroke={DEKAT}
            strokeWidth="2.2"
            fill="none"
            opacity="0.4"
          />
        </>
      );

    // Kaki langit kota tua.
    case 2:
      return (
        <>
          <rect x="10" y="26" width="24" height="24" fill={JAUH} opacity="0.42" />
          <rect x="40" y="18" width="16" height="32" fill={JAUH} opacity="0.42" />
          <rect
            x="112"
            y="22"
            width="26"
            height="28"
            fill={JAUH}
            opacity="0.42"
          />
          {/* Balai kota: badan lebar, atap trapesium, menara jam. */}
          <path d="M60 50 V32 H100 V50 Z" fill={DEKAT} opacity="0.6" />
          <path d="M56 32 L68 22 H92 L104 32 Z" fill={DEKAT} opacity="0.74" />
          <rect x="76" y="8" width="8" height="15" fill={DEKAT} opacity="0.85" />
          <rect x="73" y="5" width="14" height="3" fill={DEKAT} opacity="0.85" />
          <rect x="0" y="44" width="160" height="6" fill={DEKAT} opacity="0.32" />
        </>
      );

    // Danau dataran tinggi: punggungan + pantulannya di permukaan air.
    case 3:
      return (
        <>
          <circle cx="134" cy="11" r="6" fill={DEKAT} opacity="0.8" />
          <path
            d="M0 34 V28 Q28 7 58 32 Q90 9 124 32 L160 23 V34 Z"
            fill={JAUH}
            opacity="0.5"
          />
          <rect x="0" y="34" width="160" height="16" fill={JAUH} opacity="0.22" />
          <path
            d="M0 34 V40 Q28 61 58 36 Q90 59 124 36 L160 45 V34 Z"
            fill={JAUH}
            opacity="0.3"
          />
          <ellipse cx="134" cy="41" rx="5" ry="1.6" fill={DEKAT} opacity="0.6" />
          <path
            d="M6 46 H62 M78 46 H154"
            stroke={DEKAT}
            strokeWidth="1.6"
            opacity="0.42"
          />
        </>
      );

    // Sawah berundak.
    case 4:
      return (
        <>
          <path d="M0 18 Q80 6 160 18 V26 H0 Z" fill={JAUH} opacity="0.34" />
          <path d="M0 26 Q80 14 160 26 V34 H0 Z" fill={JAUH} opacity="0.52" />
          <path d="M0 34 Q80 22 160 34 V42 H0 Z" fill={DEKAT} opacity="0.45" />
          <path d="M0 42 Q80 30 160 42 V50 H0 Z" fill={DEKAT} opacity="0.66" />
        </>
      );

    // Kanopi taman nasional.
    default:
      return (
        <>
          <path
            d="M0 40 Q40 24 80 40 T160 40 V50 H0 Z"
            fill={JAUH}
            opacity="0.42"
          />
          <path d="M24 46 L38 15 L52 46 Z" fill={DEKAT} opacity="0.48" />
          <path d="M58 46 L80 7 L102 46 Z" fill={DEKAT} opacity="0.68" />
          <path d="M106 46 L122 19 L138 46 Z" fill={DEKAT} opacity="0.48" />
          <rect x="0" y="46" width="160" height="4" fill={DEKAT} opacity="0.55" />
        </>
      );
  }
}

/**
 * Bidang ilustrasi kartu paket wisata. Dekoratif sepenuhnya — nama dan daerah
 * tujuannya ada sebagai teks tepat di bawahnya.
 */
export function IlustrasiTujuan({
  varian,
  className = "",
}: {
  varian: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-b border-line bg-bg-soft ${className}`}
    >
      <svg
        viewBox="0 0 160 50"
        preserveAspectRatio="xMidYMid slice"
        className="block h-full w-full"
        role="presentation"
      >
        <Lanskap varian={varian} />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------ Siluet kendaraan */

export type JenisBodi =
  | "hatchback"
  | "sedan"
  | "mpv"
  | "suv"
  | "pikap"
  | "minibus";

type Rangka = {
  /** Garis kap depan dan dek belakang (semakin kecil semakin tinggi). */
  kap: number;
  dek: number;
  /** Atap: batas kiri, batas kanan, ketinggian. */
  atap: [number, number, number];
  /** Pangkal tiang A dan tiang C di badan. */
  pilar: [number, number];
  /** Alas badan dan pusat roda. */
  alas: number;
  roda: [number, number];
  jariRoda: number;
};

const RANGKA: Record<JenisBodi, Rangka> = {
  hatchback: {
    kap: 27,
    dek: 25,
    atap: [44, 82, 12],
    pilar: [32, 96],
    alas: 40,
    roda: [30, 92],
    jariRoda: 7,
  },
  sedan: {
    kap: 27,
    dek: 25,
    atap: [48, 76, 13],
    pilar: [34, 92],
    alas: 40,
    roda: [30, 92],
    jariRoda: 7,
  },
  mpv: {
    kap: 25,
    dek: 22,
    atap: [34, 100, 9],
    pilar: [22, 108],
    alas: 40,
    roda: [30, 94],
    jariRoda: 7,
  },
  suv: {
    kap: 24,
    dek: 21,
    atap: [42, 94, 9],
    pilar: [31, 103],
    alas: 38,
    roda: [31, 93],
    jariRoda: 8.5,
  },
  pikap: {
    kap: 27,
    dek: 24,
    atap: [38, 64, 11],
    pilar: [27, 70],
    alas: 40,
    roda: [29, 94],
    jariRoda: 7,
  },
  minibus: {
    kap: 23,
    dek: 19,
    atap: [26, 108, 7],
    pilar: [16, 114],
    alas: 40,
    roda: [30, 96],
    jariRoda: 7,
  },
};

const X0 = 4;
const X1 = 116;

/** Menyusun jalur siluet dari rangka, supaya keenam bentuk tetap sekeluarga. */
function jalurBadan(r: Rangka): string {
  const [atapKiri, atapKanan, atapY] = r.atap;
  const [pilarDepan, pilarBelakang] = r.pilar;
  return [
    `M${X0} ${r.alas}`,
    `V${r.kap + 2}`,
    `Q${X0} ${r.kap} ${X0 + 4} ${r.kap - 1}`,
    `L${pilarDepan} ${r.kap - 3}`,
    `L${atapKiri} ${atapY}`,
    `Q${atapKiri + 3} ${atapY - 2} ${atapKiri + 7} ${atapY - 2}`,
    `L${atapKanan - 4} ${atapY - 2}`,
    `Q${atapKanan} ${atapY - 2} ${atapKanan + 2} ${atapY + 1}`,
    `L${pilarBelakang} ${r.dek}`,
    `L${X1 - 3} ${r.dek}`,
    `Q${X1} ${r.dek} ${X1} ${r.dek + 3}`,
    `V${r.alas}`,
    "Z",
  ].join(" ");
}

/**
 * Siluet kendaraan tampak samping, satu bentuk per jenis bodi. Menggantikan
 * ikon mobil generik 28 px di atas kotak berkisi: sekarang ±3,5× lebih besar
 * dan berbeda antar unit, jadi katalognya terbaca sebagai katalog.
 */
export function SiluetKendaraan({
  bodi,
  className = "",
}: {
  bodi: JenisBodi;
  className?: string;
}) {
  const r = RANGKA[bodi];
  const [rodaDepan, rodaBelakang] = r.roda;

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center border-b border-line bg-bg-soft ${className}`}
    >
      <svg
        viewBox="0 0 120 54"
        className="h-full w-full max-w-[15rem]"
        role="presentation"
      >
        {/* Bidang landasan tipis supaya kendaraannya tidak melayang. */}
        <rect
          x="0"
          y={r.alas + r.jariRoda - 0.5}
          width="120"
          height="1.5"
          fill={JAUH}
          opacity="0.45"
        />
        <path d={jalurBadan(r)} fill={DEKAT} opacity="0.72" />
        {/* Kaca — satu bidang, cukup untuk membedakan kabin dari badan. */}
        <path
          d={`M${r.atap[0] + 3} ${r.atap[2] + 1} L${r.atap[1] - 3} ${
            r.atap[2] + 1
          } L${r.atap[1] - 1} ${r.kap - 4} L${r.atap[0] - 2} ${r.kap - 4} Z`}
          fill="var(--bg-soft)"
          opacity="0.85"
        />
        {[rodaDepan, rodaBelakang].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={r.alas} r={r.jariRoda} fill={DEKAT} />
            <circle
              cx={cx}
              cy={r.alas}
              r={r.jariRoda * 0.42}
              fill="var(--bg-soft)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
