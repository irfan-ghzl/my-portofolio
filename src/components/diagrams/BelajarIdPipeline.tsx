import {
  Chip,
  DefsPanah,
  LabelAlur,
  LabelTahap,
  Panah,
  Simpul,
  warna,
} from "./primitif";

const ID = "dg-belajarid";

/** Posisi vertikal ketujuh consumer jenjang. */
const consumer = Array.from({ length: 7 }, (_, i) => ({
  no: String(i + 1).padStart(2, "0"),
  y: 118 + i * 45,
}));

const PUSAT = 269; // sumbu tengah baris utama
const SPINE_KELUAR = 516; // sumbu penyebaran ke consumer
const SPINE_MASUK = 716; // sumbu penyatuan menuju Google Workspace
const ATAS = consumer[0].y + 16;
const BAWAH = consumer[6].y + 16;

/**
 * Pipeline provisioning akun belajar.id (peran di Ina Digital Edu).
 *
 * Semua label bersumber dari `profile.ts`: CDC, Pub/Sub, consumer terpisah
 * untuk 7 jenjang pendidikan, provisioning akun Google Workspace, serta
 * landasan Go/gRPC/PostgreSQL/Kubernetes dengan 20 layanan di 86 pod.
 */
export default function BelajarIdPipeline() {
  return (
    <svg
      viewBox="0 0 890 560"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${ID}-judul ${ID}-desk`}
      className="block h-auto w-full"
    >
      <title id={`${ID}-judul`}>
        Pipeline provisioning akun Google Workspace belajar.id
      </title>
      <desc id={`${ID}-desk`}>
        Perubahan data pada basis data belajar.id ditangkap oleh CDC, lalu
        dipublikasikan ke Pub/Sub. Dari Pub/Sub, tujuh consumer terpisah — satu
        untuk setiap jenjang pendidikan — memproses pesan dan melakukan
        provisioning akun Google Workspace. Seluruh alur berjalan di atas
        backend Go dengan gRPC, PostgreSQL, dan Kubernetes yang menopang 20
        layanan di 86 pod.
      </desc>

      <DefsPanah id={ID} />

      {/* ------------------------------------------------- Judul tahap */}
      <g aria-hidden="true">
        <LabelTahap x={80} y={24}>
          Sumber
        </LabelTahap>
        <LabelTahap x={252} y={24}>
          Tangkap perubahan
        </LabelTahap>
        <LabelTahap x={424} y={24}>
          Distribusi
        </LabelTahap>
        <LabelTahap x={621} y={24}>
          Consumer per jenjang
        </LabelTahap>
        <LabelTahap x={811} y={24}>
          Tujuan
        </LabelTahap>
        <line
          x1={14}
          y1={40}
          x2={876}
          y2={40}
          stroke={warna.garisTipis}
          strokeWidth={1}
        />
      </g>

      {/* ------------------------------------------------- Baris utama */}
      <Simpul
        x={14}
        y={231}
        w={132}
        h={76}
        label="PostgreSQL"
        sub="basis data"
        sub2="belajar.id"
      />
      <Simpul
        x={186}
        y={231}
        w={132}
        h={76}
        label="CDC"
        sub="change data"
        sub2="capture"
      />
      <Simpul
        x={358}
        y={231}
        w={132}
        h={76}
        label="Pub/Sub"
        sub="topik"
        sub2="provisioning"
        aksen
      />
      <Simpul
        x={746}
        y={231}
        w={130}
        h={76}
        label="Google Workspace"
        sub="provisioning akun"
        ukuranLabel={11}
      />

      <Panah id={ID} x1={146} y1={PUSAT} x2={186} y2={PUSAT} />
      <Panah id={ID} x1={318} y1={PUSAT} x2={358} y2={PUSAT} />
      <g aria-hidden="true">
        <LabelAlur x={166} y={218}>
          perubahan data
        </LabelAlur>
        <LabelAlur x={338} y={218}>
          publikasi event
        </LabelAlur>
      </g>

      {/* ------------------------------------- Penyebaran ke 7 consumer */}
      <line
        x1={490}
        y1={PUSAT}
        x2={SPINE_KELUAR}
        y2={PUSAT}
        stroke={warna.aksen}
        strokeWidth={1.25}
      />
      <line
        x1={SPINE_KELUAR}
        y1={ATAS}
        x2={SPINE_KELUAR}
        y2={BAWAH}
        stroke={warna.aksen}
        strokeWidth={1.25}
      />
      <text
        x={621}
        y={100}
        textAnchor="middle"
        className="font-mono"
        fontSize={10}
        fill={warna.aksenTinta}
        aria-hidden="true"
      >
        7 consumer terpisah
      </text>

      {consumer.map((c) => (
        <g key={c.no}>
          <Panah
            id={ID}
            x1={SPINE_KELUAR}
            y1={c.y + 16}
            x2={546}
            y2={c.y + 16}
            aksen
          />
          <Simpul
            x={546}
            y={c.y}
            w={150}
            h={32}
            label={`Consumer jenjang ${c.no}`}
            ukuranLabel={11}
          />
          {/* Penyatuan menuju Google Workspace */}
          <line
            x1={696}
            y1={c.y + 16}
            x2={SPINE_MASUK}
            y2={c.y + 16}
            stroke={warna.garis}
            strokeWidth={1.25}
          />
        </g>
      ))}

      <line
        x1={SPINE_MASUK}
        y1={ATAS}
        x2={SPINE_MASUK}
        y2={BAWAH}
        stroke={warna.garis}
        strokeWidth={1.25}
      />
      <Panah id={ID} x1={SPINE_MASUK} y1={PUSAT} x2={746} y2={PUSAT} />

      {/* ------------------------------------------------ Pita landasan */}
      <g>
        <rect
          x={14}
          y={470}
          width={862}
          height={70}
          rx={2}
          fill={warna.bidangLembut}
          stroke={warna.garisTipis}
          strokeWidth={1}
        />
        <LabelTahap x={32} y={494} anchor="start">
          Landasan runtime
        </LabelTahap>
        <Chip x={32} y={504} w={56} h={26} label="Go" />
        <Chip x={98} y={504} w={70} h={26} label="gRPC" />
        <Chip x={178} y={504} w={100} h={26} label="PostgreSQL" />
        <Chip x={288} y={504} w={100} h={26} label="Kubernetes" />

        <rect
          x={592}
          y={482}
          width={128}
          height={46}
          rx={2}
          fill={warna.bidang}
          stroke={warna.garis}
          strokeWidth={1}
        />
        <text
          x={656}
          y={499}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-mono"
          fontSize={19}
          fill={warna.aksenTinta}
        >
          20
        </text>
        <text
          x={656}
          y={517}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-mono"
          fontSize={9}
          letterSpacing="0.18em"
          fill={warna.tinta3}
        >
          LAYANAN
        </text>

        <rect
          x={736}
          y={482}
          width={124}
          height={46}
          rx={2}
          fill={warna.bidang}
          stroke={warna.garis}
          strokeWidth={1}
        />
        <text
          x={798}
          y={499}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-mono"
          fontSize={19}
          fill={warna.aksenTinta}
        >
          86
        </text>
        <text
          x={798}
          y={517}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-mono"
          fontSize={9}
          letterSpacing="0.18em"
          fill={warna.tinta3}
        >
          POD
        </text>
      </g>
    </svg>
  );
}
