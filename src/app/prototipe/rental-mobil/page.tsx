import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KerangkaPrototipe from "@/components/prototipe/KerangkaPrototipe";
import RentalMobil from "@/components/prototipe/RentalMobil";
import { PENYANGKALAN_PROTOTIPE, prototipeUntuk } from "@/data/prototipe";

const meta = prototipeUntuk("rental-mobil");

export const metadata: Metadata = {
  title: `Prototipe UI — ${meta?.proyek ?? "Aplikasi Rental Mobil"}`,
  description: PENYANGKALAN_PROTOTIPE,
};

export default function Halaman() {
  if (!meta) notFound();

  return (
    <KerangkaPrototipe meta={meta}>
      <RentalMobil />
    </KerangkaPrototipe>
  );
}
