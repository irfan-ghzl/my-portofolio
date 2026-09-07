import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KerangkaPrototipe from "@/components/prototipe/KerangkaPrototipe";
import Pengaduan from "@/components/prototipe/Pengaduan";
import { PENYANGKALAN_PROTOTIPE, prototipeUntuk } from "@/data/prototipe";

const meta = prototipeUntuk("pengaduan");

export const metadata: Metadata = {
  title: `Prototipe UI — ${meta?.proyek ?? "Sistem Pengaduan Masyarakat"}`,
  description: PENYANGKALAN_PROTOTIPE,
};

export default function Halaman() {
  if (!meta) notFound();

  return (
    <KerangkaPrototipe meta={meta}>
      <Pengaduan />
    </KerangkaPrototipe>
  );
}
