/**
 * Primitif bersama untuk diagram arsitektur.
 *
 * Seluruh diagram digambar tangan sebagai SVG inline (bukan berkas gambar)
 * supaya warnanya mengikuti token tema lewat `var(--…)` dan tetap terbaca di
 * mode gelap maupun terang.
 */

/** Warna garis/isian yang dipakai seluruh diagram. */
export const warna = {
  garis: "var(--line-strong)",
  garisTipis: "var(--line)",
  bidang: "var(--bg-elev)",
  bidangLembut: "var(--bg-soft)",
  tinta: "var(--ink)",
  tinta2: "var(--ink-2)",
  tinta3: "var(--ink-3)",
  aksen: "var(--accent)",
  aksenTinta: "var(--accent-ink)",
  aksenLembut: "var(--accent-soft)",
} as const;

/**
 * Definisi kepala panah. `id` harus unik per diagram agar marker satu diagram
 * tidak dipakai ulang oleh diagram lain di halaman yang sama.
 */
export function DefsPanah({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-panah`}
        viewBox="0 0 10 10"
        refX="9.5"
        refY="5"
        markerWidth="9"
        markerHeight="9"
        markerUnits="userSpaceOnUse"
        orient="auto-start-reverse"
      >
        <path d="M 0.5 1 L 9.5 5 L 0.5 9 Z" fill={warna.garis} />
      </marker>
      <marker
        id={`${id}-panah-aksen`}
        viewBox="0 0 10 10"
        refX="9.5"
        refY="5"
        markerWidth="9"
        markerHeight="9"
        markerUnits="userSpaceOnUse"
        orient="auto-start-reverse"
      >
        <path d="M 0.5 1 L 9.5 5 L 0.5 9 Z" fill={warna.aksen} />
      </marker>
    </defs>
  );
}

type SimpulProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Label utama (font mono). */
  label: string;
  /** Baris keterangan kecil di bawah label. */
  sub?: string;
  /** Baris keterangan kedua. */
  sub2?: string;
  /** Nomor urut kecil di pojok kiri atas, mis. "01". */
  no?: string;
  /** Menandai simpul penting — memakai garis dan isian aksen. */
  aksen?: boolean;
  /** Ukuran font label. Default 13. */
  ukuranLabel?: number;
};

/** Kotak simpul standar: persegi tajam, garis tipis, label mono di tengah. */
export function Simpul({
  x,
  y,
  w,
  h,
  label,
  sub,
  sub2,
  no,
  aksen = false,
  ukuranLabel = 13,
}: SimpulProps) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const jumlahSub = (sub ? 1 : 0) + (sub2 ? 1 : 0);
  const yLabel = cy - jumlahSub * 7.5;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill={aksen ? warna.aksenLembut : warna.bidang}
        stroke={aksen ? warna.aksen : warna.garis}
        strokeWidth={1}
      />
      {no ? (
        <text
          x={x + 9}
          y={y + 14}
          className="font-mono"
          fontSize={9}
          letterSpacing="0.16em"
          fill={aksen ? warna.aksenTinta : warna.tinta3}
        >
          {no}
        </text>
      ) : null}
      <text
        x={cx}
        y={yLabel}
        textAnchor="middle"
        dominantBaseline="central"
        className="font-mono"
        fontSize={ukuranLabel}
        fill={aksen ? warna.aksenTinta : warna.tinta}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={cx}
          y={yLabel + 16}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-mono"
          fontSize={10.5}
          fill={warna.tinta3}
        >
          {sub}
        </text>
      ) : null}
      {sub2 ? (
        <text
          x={cx}
          y={yLabel + 30}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-mono"
          fontSize={10.5}
          fill={warna.tinta3}
        >
          {sub2}
        </text>
      ) : null}
    </g>
  );
}

/** Judul kolom/tahap: mono kecil, huruf besar, jarak huruf lebar. */
export function LabelTahap({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="font-mono"
      fontSize={9.5}
      letterSpacing="0.2em"
      fill={warna.tinta3}
    >
      {children.toUpperCase()}
    </text>
  );
}

/** Panah lurus mendatar. */
export function Panah({
  id,
  x1,
  y1,
  x2,
  y2,
  aksen = false,
  putus = false,
}: {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  aksen?: boolean;
  putus?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={aksen ? warna.aksen : warna.garis}
      strokeWidth={1.25}
      strokeDasharray={putus ? "4 4" : undefined}
      markerEnd={`url(#${id}-panah${aksen ? "-aksen" : ""})`}
    />
  );
}

/** Panah melengkung (kurva Bézier) untuk pola menyebar / menyatu. */
export function PanahKurva({
  id,
  d,
  aksen = false,
}: {
  id: string;
  d: string;
  aksen?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={aksen ? warna.aksen : warna.garis}
      strokeWidth={1.25}
      markerEnd={`url(#${id}-panah${aksen ? "-aksen" : ""})`}
    />
  );
}

/** Keterangan kecil di atas/bawah sebuah panah. */
export function LabelAlur({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="font-mono"
      fontSize={10}
      fill={warna.tinta3}
    >
      {children}
    </text>
  );
}

/** Bingkai putus-putus untuk mengelompokkan simpul (mis. batas deployment). */
export function Kelompok({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={3}
        fill="none"
        stroke={warna.garisTipis}
        strokeWidth={1}
        strokeDasharray="5 5"
      />
      <text
        x={x + 12}
        y={y + 15}
        className="font-mono"
        fontSize={9}
        letterSpacing="0.18em"
        fill={warna.tinta3}
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

/** Chip kecil untuk daftar atribut (mis. modul, kontrol keamanan). */
export function Chip({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill={warna.bidangLembut}
        stroke={warna.garisTipis}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="font-mono"
        fontSize={11}
        fill={warna.tinta2}
      >
        {label}
      </text>
    </g>
  );
}
