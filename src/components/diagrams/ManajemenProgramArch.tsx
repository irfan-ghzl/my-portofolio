import {
  Chip,
  DefsPanah,
  Kelompok,
  LabelAlur,
  LabelTahap,
  Panah,
  PanahKurva,
  Simpul,
  warna,
} from "./primitif";

const ID = "dg-program";

const modul = [
  { label: "Katalog", y: 118 },
  { label: "CRM leads", y: 174 },
  { label: "Invoice", y: 230 },
  { label: "Portal peserta", y: 286 },
];

const integrasi = [
  { label: "Fonnte", sub: "WhatsApp Gateway", y: 71 },
  { label: "Midtrans", sub: "payment gateway", y: 149 },
  { label: "Gemini", sub: "chatbot AI", y: 227 },
  { label: "OCR self-hosted", sub: "ekstraksi dokumen", y: 305 },
];

/**
 * Sistem Full-Stack Manajemen Program — backend Go/Echo dengan empat modul,
 * klien React/TypeScript, PostgreSQL, dan empat integrasi eksternal.
 */
export default function ManajemenProgramArch() {
  return (
    <svg
      viewBox="0 0 900 510"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${ID}-judul ${ID}-desk`}
      className="block h-auto w-full"
    >
      <title id={`${ID}-judul`}>
        Arsitektur Sistem Full-Stack Manajemen Program
      </title>
      <desc id={`${ID}-desk`}>
        Antarmuka React dan TypeScript memanggil backend Go dengan framework
        Echo. Backend tersebut menaungi modul katalog, CRM leads, invoice, dan
        portal peserta, menyimpan data di PostgreSQL, serta terhubung ke empat
        layanan eksternal: Fonnte sebagai WhatsApp Gateway, Midtrans sebagai
        payment gateway, Gemini untuk chatbot AI, dan OCR self-hosted untuk
        ekstraksi dokumen. Sistem didahului PRD dengan 51 functional requirement
        dan 9 modul.
      </desc>

      <DefsPanah id={ID} />

      <g aria-hidden="true">
        <LabelTahap x={100} y={24}>
          Klien
        </LabelTahap>
        <LabelTahap x={400} y={24}>
          Backend
        </LabelTahap>
        <LabelTahap x={740} y={24}>
          Integrasi eksternal
        </LabelTahap>
        <line
          x1={20}
          y1={40}
          x2={880}
          y2={40}
          stroke={warna.garisTipis}
          strokeWidth={1}
        />
      </g>

      {/* Klien */}
      <Simpul
        x={20}
        y={165}
        w={160}
        h={110}
        label="React"
        sub="TypeScript"
        sub2="antarmuka web"
      />
      <Panah id={ID} x1={180} y1={220} x2={250} y2={220} />
      <g aria-hidden="true">
        <LabelAlur x={215} y={208}>
          REST
        </LabelAlur>
      </g>

      {/* Backend Go/Echo dengan modul-modulnya */}
      <Kelompok x={250} y={70} w={300} h={290} label="Go / Echo" />
      <g aria-hidden="true">
        <LabelTahap x={274} y={106} anchor="start">
          Modul
        </LabelTahap>
      </g>
      {modul.map((m) => (
        <Chip key={m.label} x={274} y={m.y} w={252} h={44} label={m.label} />
      ))}

      {/* Penyimpanan */}
      <Panah id={ID} x1={400} y1={360} x2={400} y2={410} />
      <Simpul
        x={310}
        y={410}
        w={180}
        h={64}
        label="PostgreSQL"
        sub="basis data"
      />

      {/* Integrasi eksternal */}
      {integrasi.map((it) => {
        const cy = it.y + 27;
        return (
          <g key={it.label}>
            <PanahKurva
              id={ID}
              d={`M 550 215 C 585 215, 585 ${cy}, 620 ${cy}`}
            />
            <Simpul
              x={620}
              y={it.y}
              w={240}
              h={54}
              label={it.label}
              sub={it.sub}
              ukuranLabel={12}
            />
          </g>
        );
      })}

      <g aria-hidden="true">
        <LabelTahap x={20} y={492} anchor="start">
          PRD: 51 functional requirement / 9 modul
        </LabelTahap>
      </g>
    </svg>
  );
}
