import type { ComponentType } from "react";
import type { DiagramKey } from "@/data/profile";
import BelajarIdPipeline from "./BelajarIdPipeline";
import ManajemenProgramArch from "./ManajemenProgramArch";
import PengaduanArch from "./PengaduanArch";
import PintourTravelArch from "./PintourTravelArch";
import RangkaDiagram from "./RangkaDiagram";
import RentalMobilArch from "./RentalMobilArch";

type EntriDiagram = {
  Komponen: ComponentType;
  /** Lebar minimum sebelum bingkai beralih ke gulir mendatar. */
  minWidth: number;
};

/** Pemetaan `DiagramKey` di `profile.ts` → komponen SVG-nya. */
const daftarDiagram: Record<DiagramKey, EntriDiagram> = {
  "belajar-id-pipeline": { Komponen: BelajarIdPipeline, minWidth: 700 },
  "pintour-travel": { Komponen: PintourTravelArch, minWidth: 560 },
  "manajemen-program": { Komponen: ManajemenProgramArch, minWidth: 760 },
  pengaduan: { Komponen: PengaduanArch, minWidth: 780 },
  "rental-mobil": { Komponen: RentalMobilArch, minWidth: 780 },
};

/** True bila kunci diagram punya komponen terdaftar. */
export function adaDiagram(kunci?: DiagramKey): kunci is DiagramKey {
  return Boolean(kunci && kunci in daftarDiagram);
}

/** Diagram lengkap dengan bingkai, area gulir, dan keterangan. */
export default function Diagram({
  diagram,
  caption,
  label,
}: {
  diagram: DiagramKey;
  caption: string;
  label?: string;
}) {
  const entri = daftarDiagram[diagram];
  if (!entri) return null;

  const { Komponen, minWidth } = entri;

  return (
    <RangkaDiagram caption={caption} minWidth={minWidth} label={label}>
      <Komponen />
    </RangkaDiagram>
  );
}
