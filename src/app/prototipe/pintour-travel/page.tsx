import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KerangkaPrototipe from "@/components/prototipe/KerangkaPrototipe";
import PintourTravel from "@/components/prototipe/PintourTravel";
import { PENYANGKALAN_PROTOTIPE, prototipeUntuk } from "@/data/prototipe";

const meta = prototipeUntuk("pintour-travel");

export const metadata: Metadata = {
  title: `Prototipe UI — ${meta?.proyek ?? "Pintour Travel"}`,
  description: PENYANGKALAN_PROTOTIPE,
};

export default function Halaman() {
  if (!meta) notFound();

  return (
    <KerangkaPrototipe meta={meta}>
      <PintourTravel />
    </KerangkaPrototipe>
  );
}
