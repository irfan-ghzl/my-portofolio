"use client";

import { Ban, CalendarDays, Check, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { IlustrasiTujuan } from "./Ilustrasi";
import {
  Bidang,
  JudulBagian,
  LabelContoh,
  PilStatus,
  type NadaStatus,
  kelasInput,
  kelasTombolUtama,
  rupiah,
  useIdBersih,
} from "./primitif";

/* ---------------------------------------------------------------------------
   Prototipe Pintour Travel.

   Fitur yang diperagakan terbatas pada yang tertulis di `profile.ts`:
   katalog paket wisata, detail paket, dan formulir pemesanan — di atas REST API
   Go dengan frontend TypeScript dan PostgreSQL.

   Semua paket, harga, dan identitas di bawah ini adalah data contoh fiktif.
   --------------------------------------------------------------------------- */

type Paket = {
  id: string;
  kode: string;
  nama: string;
  daerah: string;
  durasi: string;
  harga: number;
  sisaKursi: number;
  ringkas: string;
  rencana: string[];
  termasuk: string[];
};

const PAKET: Paket[] = [
  {
    id: "pkt-01",
    kode: "PKT-CONTOH-01",
    nama: "Sunrise Pegunungan",
    daerah: "Jawa Timur",
    durasi: "3 hari 2 malam",
    harga: 2450000,
    sisaKursi: 8,
    ringkas:
      "Paket contoh dengan titik pandang matahari terbit dan perjalanan darat singkat antar desa.",
    rencana: [
      "Hari 1 — penjemputan, ramah tamah, dan pengarahan singkat",
      "Hari 2 — titik pandang matahari terbit lalu jelajah dataran",
      "Hari 3 — pusat oleh-oleh dan pengantaran kembali",
    ],
    termasuk: ["Transportasi darat", "Penginapan 2 malam", "Pemandu lokal"],
  },
  {
    id: "pkt-02",
    kode: "PKT-CONTOH-02",
    nama: "Gugusan Pulau Timur",
    daerah: "Papua Barat Daya",
    durasi: "5 hari 4 malam",
    harga: 9750000,
    sisaKursi: 3,
    ringkas:
      "Paket contoh berbasis perahu dengan singgah di beberapa pulau kecil dan area snorkel dangkal.",
    rencana: [
      "Hari 1 — kedatangan dan pengarahan keselamatan",
      "Hari 2–4 — pelayaran antar pulau dan snorkel dangkal",
      "Hari 5 — pengantaran ke pelabuhan",
    ],
    termasuk: ["Perahu antar pulau", "Homestay 4 malam", "Perlengkapan snorkel"],
  },
  {
    id: "pkt-03",
    kode: "PKT-CONTOH-03",
    nama: "Susur Kota Tua",
    daerah: "DKI Jakarta",
    durasi: "1 hari",
    harga: 385000,
    sisaKursi: 24,
    ringkas:
      "Paket contoh berjalan kaki menyusuri kawasan cagar budaya beserta penjelasan sejarahnya.",
    rencana: [
      "Pagi — titik kumpul dan penjelasan rute",
      "Siang — museum dan kuliner kawasan",
      "Sore — sesi foto dan penutupan",
    ],
    termasuk: ["Pemandu", "Tiket museum", "Makan siang"],
  },
  {
    id: "pkt-04",
    kode: "PKT-CONTOH-04",
    nama: "Danau Dataran Tinggi",
    daerah: "Sumatera Utara",
    durasi: "4 hari 3 malam",
    harga: 4300000,
    sisaKursi: 0,
    ringkas:
      "Paket contoh mengelilingi danau vulkanik dengan singgah di beberapa desa kerajinan.",
    rencana: [
      "Hari 1 — perjalanan darat menuju tepi danau",
      "Hari 2–3 — penyeberangan dan desa kerajinan",
      "Hari 4 — kembali ke kota",
    ],
    termasuk: ["Transportasi darat", "Feri", "Penginapan 3 malam"],
  },
  {
    id: "pkt-05",
    kode: "PKT-CONTOH-05",
    nama: "Sawah Berundak",
    daerah: "Bali",
    durasi: "3 hari 2 malam",
    harga: 3150000,
    sisaKursi: 11,
    ringkas:
      "Paket contoh dengan berjalan santai di jalur sawah dan lokakarya kerajinan setempat.",
    rencana: [
      "Hari 1 — kedatangan dan lokakarya anyaman",
      "Hari 2 — jalur sawah dan pasar pagi",
      "Hari 3 — pengantaran ke bandara",
    ],
    termasuk: ["Antar-jemput bandara", "Penginapan 2 malam", "Lokakarya"],
  },
  {
    id: "pkt-06",
    kode: "PKT-CONTOH-06",
    nama: "Taman Nasional Selatan",
    daerah: "Nusa Tenggara Timur",
    durasi: "4 hari 3 malam",
    harga: 6800000,
    sisaKursi: 6,
    ringkas:
      "Paket contoh pengamatan satwa dengan pendamping resmi dan jalur pengamatan terbatas.",
    rencana: [
      "Hari 1 — kedatangan dan pengarahan konservasi",
      "Hari 2–3 — jalur pengamatan bersama pendamping",
      "Hari 4 — pengantaran kembali",
    ],
    termasuk: ["Kapal harian", "Pendamping resmi", "Tiket kawasan"],
  },
];

/**
 * Nada pil ketersediaan kursi.
 *
 * Amber sekarang berarti "perlu perhatian" saja, jadi kursi yang masih banyak
 * memakai hijau, kursi tinggal sedikit memakai amber, dan kuota habis memakai
 * merah — bukan lagi abu-abu redup yang justru terbaca seperti "tidak penting".
 */
function nadaKursi(sisa: number): NadaStatus {
  if (sisa === 0) return "bahaya";
  return sisa <= 5 ? "aksen" : "ok";
}

export default function PintourTravel() {
  const uid = useIdBersih();
  const [terpilih, setTerpilih] = useState(PAKET[0]!.id);
  const [peserta, setPeserta] = useState(2);
  const [terkirim, setTerkirim] = useState(false);

  const paket = PAKET.find((p) => p.id === terpilih) ?? PAKET[0]!;
  const habis = paket.sisaKursi === 0;

  /* Jumlah peserta tidak boleh melebihi kursi yang tersisa. Nilainya dijepit
     saat dipakai, bukan lewat efek, supaya berpindah ke paket dengan kursi
     lebih sedikit langsung menurunkan angkanya alih-alih menyisakan isian yang
     tidak mungkin dipesan. */
  const maksPeserta = Math.min(20, Math.max(1, paket.sisaKursi));
  const pesertaTerpakai = Math.min(Math.max(1, peserta), maksPeserta);
  const total = paket.harga * pesertaTerpakai;

  return (
    <div className="space-y-14 sm:space-y-16">
      {/* ------------------------------------------------ Katalog paket */}
      <section aria-labelledby={`${uid}-katalog`}>
        <JudulBagian
          id={`${uid}-katalog`}
          nomor="01"
          keterangan="Daftar paket yang dilayani REST API Go dan dirender frontend TypeScript. Pilih satu kartu untuk memuat detailnya."
          aksi={<LabelContoh />}
        >
          Katalog paket wisata
        </JudulBagian>

        <p className="mt-4 inline-block border border-line bg-bg-soft px-2.5 py-1 font-mono text-[11px] text-ink-3">
          GET /api/v1/paket?limit=6
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAKET.map((p, i) => {
            const ini = p.id === terpilih;
            const penuh = p.sisaKursi === 0;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTerpilih(p.id);
                    setTerkirim(false);
                  }}
                  aria-pressed={ini}
                  className={`flex h-full w-full flex-col rounded-lg border text-left transition-colors ${
                    ini
                      ? "border-accent bg-accent-soft/40"
                      : penuh
                        ? "border-line bg-bg-soft hover:border-bahaya/50"
                        : "border-line bg-bg-elev hover:border-accent/60"
                  }`}
                >
                  <IlustrasiTujuan varian={i} className="h-28 rounded-t-lg" />
                  <span className="flex flex-1 flex-col gap-3 p-4">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-[0.9375rem] leading-snug font-semibold text-ink">
                        {p.nama}
                      </span>
                      <PilStatus nada={nadaKursi(p.sisaKursi)}>
                        {p.sisaKursi === 0 ? "Penuh" : `${p.sisaKursi} kursi`}
                      </PilStatus>
                    </span>

                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-ink-3">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {p.daerah}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3 w-3" aria-hidden="true" />
                        {p.durasi}
                      </span>
                    </span>

                    {/* Catatan kuota sengaja di atas harga: kalau ditaruh di
                        bawah, baris harga kartu yang penuh naik sendiri dan
                        seluruh baris grid jadi tidak sejajar. */}
                    {penuh ? (
                      <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-bahaya-ink uppercase">
                        <Ban className="h-3 w-3 shrink-0" aria-hidden="true" />
                        Kuota habis — tidak bisa dipesan
                      </span>
                    ) : null}

                    <span className="mt-auto flex items-baseline gap-1.5 pt-1">
                      <span className="text-lg font-semibold text-ink">
                        {rupiah(p.harga)}
                      </span>
                      <span className="font-mono text-[11px] text-ink-3">
                        / orang
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ------------------------------------------------ Detail paket */}
      <section aria-labelledby={`${uid}-detail`}>
        <JudulBagian
          id={`${uid}-detail`}
          nomor="02"
          keterangan="Tampilan detail satu paket, berubah mengikuti kartu yang dipilih di katalog."
        >
          Detail paket
        </JudulBagian>

        <div
          aria-live="polite"
          className="mt-6 grid gap-6 rounded-lg border border-line bg-bg-elev p-5 sm:p-7 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
        >
          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink-3 uppercase">
              {paket.kode} · GET /api/v1/paket/{paket.id}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">
              {paket.nama}
            </h3>
            <p className="mt-3 max-w-[62ch] text-sm leading-[1.7] text-ink-2">
              {paket.ringkas}
            </p>

            <h4 className="mt-6 font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
              Rencana perjalanan
            </h4>
            <ol className="mt-3 space-y-2">
              {paket.rencana.map((r, i) => (
                <li key={r} className="flex gap-3 text-sm text-ink-2">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-mono text-[11px] text-accent-ink"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-[1.7]">{r}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="min-w-0 rounded-lg border border-line bg-bg-soft p-5">
            <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
              Sudah termasuk
            </p>
            <ul className="mt-3 space-y-2">
              {paket.termasuk.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 text-sm text-ink-2"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {t}
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink-3">Durasi</dt>
                <dd className="font-mono text-ink-2">{paket.durasi}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink-3">Harga per orang</dt>
                <dd className="font-mono text-ink">{rupiah(paket.harga)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink-3">Sisa kursi</dt>
                <dd>
                  <PilStatus nada={nadaKursi(paket.sisaKursi)}>
                    {habis ? "Penuh" : `${paket.sisaKursi} kursi`}
                  </PilStatus>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Formulir pemesanan */}
      <section aria-labelledby={`${uid}-pesan`}>
        <JudulBagian
          id={`${uid}-pesan`}
          nomor="03"
          keterangan="Formulir pemesanan. Tidak ada data yang dikirim ke mana pun — pengiriman hanya mengubah tampilan di layar ini."
        >
          Formulir pemesanan
        </JudulBagian>

        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            // Paket penuh tidak pernah boleh menghasilkan "simulasi berhasil",
            // meski formulirnya sempat dikirim lewat papan ketik.
            if (habis) return;
            setTerkirim(true);
          }}
          className="mt-6 rounded-lg border border-line bg-bg-elev p-5 sm:p-7"
        >
          <p className="font-mono text-[11px] tracking-[0.18em] text-ink-3 uppercase">
            POST /api/v1/pemesanan · paket {paket.kode}
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Bidang id={`${uid}-nama`} label="Nama lengkap">
              <input
                id={`${uid}-nama`}
                name="nama"
                type="text"
                autoComplete="off"
                placeholder="Budi Contoh"
                defaultValue="Budi Contoh"
                className={kelasInput}
              />
            </Bidang>

            <Bidang id={`${uid}-surel`} label="Surel">
              <input
                id={`${uid}-surel`}
                name="surel"
                type="email"
                autoComplete="off"
                placeholder="budi.contoh@example.com"
                defaultValue="budi.contoh@example.com"
                className={kelasInput}
              />
            </Bidang>

            <Bidang
              id={`${uid}-telepon`}
              label="Telepon"
              petunjuk="Nomor contoh, bukan nomor yang aktif."
            >
              <input
                id={`${uid}-telepon`}
                name="telepon"
                type="tel"
                autoComplete="off"
                aria-describedby={`${uid}-telepon-petunjuk`}
                placeholder="+62 800-0000-0000"
                defaultValue="+62 800-0000-0000"
                className={kelasInput}
              />
            </Bidang>

            <Bidang id={`${uid}-tanggal`} label="Tanggal berangkat">
              <input
                id={`${uid}-tanggal`}
                name="tanggal"
                type="date"
                defaultValue="2026-11-02"
                className={kelasInput}
              />
            </Bidang>

            <Bidang
              id={`${uid}-peserta`}
              label="Jumlah peserta"
              petunjuk={
                habis
                  ? "Kuota paket ini habis."
                  : `Maksimal ${maksPeserta} orang — mengikuti sisa kursi paket.`
              }
            >
              <input
                id={`${uid}-peserta`}
                name="peserta"
                type="number"
                min={habis ? 0 : 1}
                max={habis ? 0 : maksPeserta}
                value={habis ? 0 : pesertaTerpakai}
                disabled={habis}
                aria-describedby={`${uid}-peserta-petunjuk`}
                onChange={(e) => {
                  const n = Number(e.target.value) || 1;
                  setPeserta(Math.min(Math.max(1, n), maksPeserta));
                  setTerkirim(false);
                }}
                className={kelasInput}
              />
            </Bidang>

            <Bidang id={`${uid}-paket`} label="Paket dipilih">
              <select
                id={`${uid}-paket`}
                name="paket"
                value={terpilih}
                onChange={(e) => {
                  setTerpilih(e.target.value);
                  setTerkirim(false);
                }}
                className={kelasInput}
              >
                {PAKET.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                    disabled={p.sisaKursi === 0 && p.id !== terpilih}
                  >
                    {p.nama} — {p.durasi}
                    {p.sisaKursi === 0 ? " (kuota habis)" : ""}
                  </option>
                ))}
              </select>
            </Bidang>

            <Bidang
              id={`${uid}-catatan`}
              label="Catatan"
              className="sm:col-span-2"
            >
              <textarea
                id={`${uid}-catatan`}
                name="catatan"
                rows={3}
                placeholder="Contoh: butuh menu vegetarian."
                className={kelasInput}
              />
            </Bidang>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <p className="text-sm text-ink-2">
              Estimasi total{" "}
              <span className="font-mono text-base font-semibold text-ink">
                {habis ? "—" : rupiah(total)}
              </span>{" "}
              {habis ? null : (
                <span className="font-mono text-[11px] text-ink-3">
                  ({pesertaTerpakai} × {rupiah(paket.harga)})
                </span>
              )}
            </p>

            {/* Paket penuh: tombol kirim diganti catatan kuota, bukan sekadar
                diredupkan. Tidak ada jalur apa pun — klik, Enter, maupun
                pengiriman formulir — yang bisa menghasilkan "simulasi
                berhasil" untuk paket yang kursinya nol. */}
            {habis ? (
              <p className="inline-flex items-center gap-2 border border-bahaya/70 bg-bahaya-soft px-4 py-2 font-mono text-xs tracking-[0.12em] text-bahaya-ink uppercase">
                <Ban className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Kuota habis — pemesanan ditutup
              </p>
            ) : (
              <button type="submit" className={kelasTombolUtama}>
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Kirim pemesanan
              </button>
            )}
          </div>

          <p aria-live="polite" className="mt-5">
            {terkirim ? (
              <span className="block border border-accent/60 bg-accent-soft p-4 text-sm leading-[1.7] text-ink-2">
                <span className="font-mono text-[11px] tracking-[0.16em] text-accent-ink uppercase">
                  Simulasi berhasil
                </span>
                <br />
                Pemesanan contoh <strong className="text-ink">
                  PSN-CONTOH-0001
                </strong>{" "}
                untuk {paket.nama} dibuat di layar ini saja. Tidak ada
                permintaan jaringan dan tidak ada data yang disimpan.
              </span>
            ) : null}
          </p>

          <p data-tanpa-js className="mt-5 text-sm text-ink-3">
            JavaScript tidak aktif — formulir ini hanya tampilan. Seluruh isi
            katalog dan detail paket tetap terbaca di atas.
          </p>
        </form>
      </section>
    </div>
  );
}
