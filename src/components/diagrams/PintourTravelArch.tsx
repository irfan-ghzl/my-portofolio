import {
  DefsPanah,
  LabelAlur,
  LabelTahap,
  Panah,
  Simpul,
  warna,
} from "./primitif";

const ID = "dg-pintour";
const PUSAT = 134;

/**
 * Pintour Travel — REST API Go dan frontend TypeScript sebagai dua aplikasi
 * independen, dengan PostgreSQL sebagai penyimpanan.
 */
export default function PintourTravelArch() {
  return (
    <svg
      viewBox="0 0 760 212"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${ID}-judul ${ID}-desk`}
      className="block h-auto w-full"
    >
      <title id={`${ID}-judul`}>
        Arsitektur layanan terpisah Pintour Travel
      </title>
      <desc id={`${ID}-desk`}>
        Frontend TypeScript berjalan sebagai aplikasi independen dan memanggil
        REST API berbasis Go, yang juga berjalan sebagai aplikasi independen.
        REST API tersebut membaca dan menulis data ke PostgreSQL.
      </desc>

      <DefsPanah id={ID} />

      <g aria-hidden="true">
        <LabelTahap x={120} y={24}>
          Klien
        </LabelTahap>
        <LabelTahap x={400} y={24}>
          Layanan
        </LabelTahap>
        <LabelTahap x={660} y={24}>
          Penyimpanan
        </LabelTahap>
        <line
          x1={20}
          y1={42}
          x2={740}
          y2={42}
          stroke={warna.garisTipis}
          strokeWidth={1}
        />
      </g>

      <Simpul
        x={20}
        y={86}
        w={200}
        h={96}
        label="TypeScript"
        sub="frontend"
        sub2="aplikasi independen"
      />
      <Simpul
        x={300}
        y={86}
        w={200}
        h={96}
        label="Go"
        sub="REST API"
        sub2="aplikasi independen"
        aksen
      />
      <Simpul
        x={580}
        y={86}
        w={160}
        h={96}
        label="PostgreSQL"
        sub="basis data"
      />

      <Panah id={ID} x1={220} y1={PUSAT} x2={300} y2={PUSAT} />
      <Panah id={ID} x1={500} y1={PUSAT} x2={580} y2={PUSAT} />

      <g aria-hidden="true">
        <LabelAlur x={260} y={74}>
          permintaan REST
        </LabelAlur>
        <LabelAlur x={540} y={74}>
          kueri
        </LabelAlur>
      </g>
    </svg>
  );
}
