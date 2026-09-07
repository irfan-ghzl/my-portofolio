import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KerangkaPrototipe from "@/components/prototipe/KerangkaPrototipe";
import ManajemenProgram from "@/components/prototipe/ManajemenProgram";
import { PENYANGKALAN_PROTOTIPE, prototipeUntuk } from "@/data/prototipe";

const meta = prototipeUntuk("manajemen-program");

export const metadata: Metadata = {
  title: `Prototipe UI — ${meta?.proyek ?? "Sistem Manajemen Program"}`,
  description: PENYANGKALAN_PROTOTIPE,
};

export default function Halaman() {
  if (!meta) notFound();

  return (
    <KerangkaPrototipe meta={meta}>
      <ManajemenProgram />
    </KerangkaPrototipe>
  );
}
