"use client";

import { Car, Check, KeyRound, Paperclip, X } from "lucide-react";
import { useId, useState } from "react";
import {
  Bidang,
  DaftarTab,
  JudulBagian,
  LabelContoh,
  PanelTab,
  PilStatus,
  type NadaStatus,
  type Tab,
  kelasInput,
  kelasTombolSekunder,
  kelasTombolUtama,
  rupiah,
} from "./primitif";

/* ---------------------------------------------------------------------------
   Prototipe Aplikasi Rental Mobil.

   Alur yang diperagakan persis yang tertulis di `profile.ts`: katalog mobil
   dengan status ketersediaan → pemesanan → unggah bukti pembayaran →
   konfirmasi oleh admin → pengembalian unit, dengan dua hak akses (penyewa dan
   admin).

   Unggah bukti pembayaran di sini murni tampilan: tidak ada berkas yang dibaca,
   dipilih, maupun dikirim. Seluruh nama, pelat, dan nominal adalah data contoh
   fiktif.
   --------------------------------------------------------------------------- */

type StatusUnit = "tersedia" | "disewa" | "perawatan";

type Mobil = {
  id: string;
  nama: string;
  plat: string;
  transmisi: string;
  kursi: number;
  tarif: number;
  status: StatusUnit;
};

const MOBIL_AWAL: Mobil[] = [
  {
    id: "unit-01",
    nama: "MPV Contoh 1.5",
    plat: "B 0000 CTH",
    transmisi: "Manual",
    kursi: 7,
    tarif: 350000,
    status: "tersedia",
  },
  {
    id: "unit-02",
    nama: "Hatchback Contoh 1.2",
    plat: "B 0001 CTH",
    transmisi: "Otomatis",
    kursi: 5,
    tarif: 275000,
    status: "tersedia",
  },
  {
    id: "unit-03",
    nama: "SUV Contoh 2.0",
    plat: "B 0002 CTH",
    transmisi: "Otomatis",
    kursi: 7,
    tarif: 525000,
    status: "disewa",
  },
  {
    id: "unit-04",
    nama: "Pikap Contoh 1.5",
    plat: "B 0003 CTH",
    transmisi: "Manual",
    kursi: 3,
    tarif: 300000,
    status: "perawatan",
  },
];

const labelUnit: Record<StatusUnit, string> = {
  tersedia: "Tersedia",
  disewa: "Disewa",
  perawatan: "Perawatan",
};

const nadaUnit: Record<StatusUnit, NadaStatus> = {
  tersedia: "aksen",
  disewa: "isi",
  perawatan: "redup",
};

type StatusPesan = "menunggu" | "dikonfirmasi" | "ditolak" | "selesai";

const labelPesan: Record<StatusPesan, string> = {
  menunggu: "Menunggu konfirmasi",
  dikonfirmasi: "Dikonfirmasi",
  ditolak: "Ditolak",
  selesai: "Selesai",
};

const nadaPesan: Record<StatusPesan, NadaStatus> = {
  menunggu: "aksen",
  dikonfirmasi: "garis",
  ditolak: "redup",
  selesai: "isi",
};

type Pesanan = {
  kode: string;
  penyewa: string;
  unitId: string;
  ambil: string;
  kembali: string;
  hari: number;
  total: number;
  bukti: string | null;
  status: StatusPesan;
};

const PESANAN_AWAL: Pesanan[] = [
  {
    kode: "SWA-CONTOH-0001",
    penyewa: "Citra Contoh",
    unitId: "unit-03",
    ambil: "2026-11-01",
    kembali: "2026-11-04",
    hari: 3,
    total: 1575000,
    bukti: "bukti-transfer-contoh.png",
    status: "dikonfirmasi",
  },
  {
    kode: "SWA-CONTOH-0002",
    penyewa: "Eko Contoh",
    unitId: "unit-02",
    ambil: "2026-11-06",
    kembali: "2026-11-08",
    hari: 2,
    total: 550000,
    bukti: null,
    status: "menunggu",
  },
];

const TAB: Tab[] = [
  { id: "katalog", label: "Katalog" },
  { id: "pesan", label: "Pemesanan" },
  { id: "bukti", label: "Bukti pembayaran" },
  { id: "admin", label: "Panel admin" },
  { id: "kembali", label: "Pengembalian" },
];

/** Selisih hari antara dua tanggal ISO; minimal 1. */
function selisihHari(ambil: string, kembali: string): number {
  const a = Date.parse(`${ambil}T00:00:00Z`);
  const b = Date.parse(`${kembali}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return 1;
  return Math.max(1, Math.round((b - a) / 86400000));
}

export default function RentalMobil() {
  const uid = useId().replace(/:/g, "");
  const [tab, setTab] = useState("katalog");
  const [mobil, setMobil] = useState<Mobil[]>(MOBIL_AWAL);
  const [pesanan, setPesanan] = useState<Pesanan[]>(PESANAN_AWAL);
  const [unitId, setUnitId] = useState("unit-01");
  const [penyewa, setPenyewa] = useState("Budi Contoh");
  const [ambil, setAmbil] = useState("2026-11-10");
  const [kembali, setKembali] = useState("2026-11-13");
  const [nomor, setNomor] = useState(3);
  const [pesananAktif, setPesananAktif] = useState(PESANAN_AWAL[1]!.kode);
  const [kabar, setKabar] = useState("");

  const unit = mobil.find((m) => m.id === unitId) ?? mobil[0]!;
  const hari = selisihHari(ambil, kembali);
  const total = unit.tarif * hari;
  const aktif = pesanan.find((p) => p.kode === pesananAktif) ?? pesanan[0]!;
  const namaUnit = (id: string) =>
    mobil.find((m) => m.id === id)?.nama ?? "Unit contoh";

  function setStatusUnit(id: string, status: StatusUnit) {
    setMobil((d) => d.map((m) => (m.id === id ? { ...m, status } : m)));
  }

  function buatPesanan() {
    const kode = `SWA-CONTOH-${String(nomor).padStart(4, "0")}`;
    setPesanan((d) => [
      {
        kode,
        penyewa: penyewa.trim() || "Penyewa Contoh",
        unitId,
        ambil,
        kembali,
        hari,
        total,
        bukti: null,
        status: "menunggu",
      },
      ...d,
    ]);
    setPesananAktif(kode);
    setNomor((n) => n + 1);
    setKabar(`Pemesanan contoh ${kode} dibuat. Lanjut ke tab bukti pembayaran.`);
    setTab("bukti");
  }

  function lampirkanBukti() {
    setPesanan((d) =>
      d.map((p) =>
        p.kode === aktif.kode
          ? { ...p, bukti: "bukti-transfer-contoh.png" }
          : p,
      ),
    );
    setKabar(
      `Lampiran contoh ditandai untuk ${aktif.kode}. Tidak ada berkas yang benar-benar dipilih atau dikirim.`,
    );
  }

  function konfirmasi(kode: string, setuju: boolean) {
    const p = pesanan.find((x) => x.kode === kode);
    if (!p) return;
    setPesanan((d) =>
      d.map((x) =>
        x.kode === kode
          ? { ...x, status: setuju ? "dikonfirmasi" : "ditolak" }
          : x,
      ),
    );
    if (setuju) setStatusUnit(p.unitId, "disewa");
    setKabar(
      `${kode} ${setuju ? "dikonfirmasi" : "ditolak"} oleh admin (simulasi).`,
    );
  }

  function catatPengembalian(kode: string) {
    const p = pesanan.find((x) => x.kode === kode);
    if (!p) return;
    setPesanan((d) =>
      d.map((x) => (x.kode === kode ? { ...x, status: "selesai" } : x)),
    );
    setStatusUnit(p.unitId, "tersedia");
    setKabar(`Pengembalian ${kode} dicatat; unit kembali tersedia (simulasi).`);
  }

  const sedangDisewa = pesanan.filter((p) => p.status === "dikonfirmasi");

  return (
    <section aria-labelledby={`${uid}-alur`} className="space-y-8">
      <JudulBagian
        id={`${uid}-alur`}
        nomor="01"
        keterangan="Lima tahap transaksi yang tercatat pada deskripsi proyek, dari katalog sampai pengembalian unit. Pindah tahap dengan klik atau tombol panah pada papan ketik."
        aksi={<LabelContoh />}
      >
        Alur transaksi
      </JudulBagian>

      <div className="overflow-x-auto">
        <DaftarTab
          tabs={TAB}
          aktif={tab}
          onGanti={setTab}
          idPrefix={`${uid}-alur`}
          label="Tahap transaksi rental mobil"
        />
      </div>

      <p aria-live="polite" className="min-h-5 text-sm text-accent-ink">
        {kabar}
      </p>

      {/* ---------------- Katalog ---------------- */}
      <PanelTab idPrefix={`${uid}-alur`} id="katalog" aktif={tab}>
        <h3 className="text-lg font-semibold text-ink">
          Katalog mobil &amp; ketersediaan
        </h3>
        <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-ink-3">
          Status ketersediaan berubah mengikuti konfirmasi admin dan pencatatan
          pengembalian di tab berikutnya.
        </p>

        <ul aria-live="polite" className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mobil.map((m) => (
            <li
              key={m.id}
              className="flex flex-col rounded-sm border border-line bg-bg-elev"
            >
              <div
                aria-hidden="true"
                className="flex h-20 items-center justify-center border-b border-line bg-bg-soft"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              >
                <Car className="h-7 w-7 text-ink-3" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-sm font-semibold text-ink">{m.nama}</p>
                <p className="mt-1 font-mono text-[11px] text-ink-3">
                  {m.plat} · {m.transmisi} · {m.kursi} kursi
                </p>
                <p className="mt-3">
                  <PilStatus nada={nadaUnit[m.status]}>
                    {labelUnit[m.status]}
                  </PilStatus>
                </p>
                <p className="mt-3 font-mono text-sm font-semibold text-ink">
                  {rupiah(m.tarif)}
                  <span className="text-[11px] font-normal text-ink-3">
                    {" "}
                    / hari
                  </span>
                </p>
                <button
                  type="button"
                  disabled={m.status !== "tersedia"}
                  onClick={() => {
                    setUnitId(m.id);
                    setTab("pesan");
                    setKabar(`Unit ${m.nama} dipilih untuk pemesanan contoh.`);
                  }}
                  className={`${kelasTombolSekunder} mt-4 w-full`}
                >
                  {m.status === "tersedia" ? "Sewa unit ini" : "Tidak tersedia"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </PanelTab>

      {/* ---------------- Pemesanan ---------------- */}
      <PanelTab idPrefix={`${uid}-alur`} id="pesan" aktif={tab}>
        <h3 className="text-lg font-semibold text-ink">Formulir pemesanan</h3>
        <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-ink-3">
          Total dihitung dari tarif harian unit dikali lama sewa. Tidak ada data
          yang dikirim ke mana pun.
        </p>

        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            buatPesanan();
          }}
          className="mt-5 rounded-sm border border-line bg-bg-elev p-5 sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Bidang id={`${uid}-penyewa`} label="Nama penyewa">
              <input
                id={`${uid}-penyewa`}
                type="text"
                value={penyewa}
                onChange={(e) => setPenyewa(e.target.value)}
                className={kelasInput}
              />
            </Bidang>

            <Bidang id={`${uid}-unit`} label="Unit">
              <select
                id={`${uid}-unit`}
                value={unitId}
                onChange={(e) => setUnitId(e.target.value)}
                className={kelasInput}
              >
                {mobil.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nama} — {labelUnit[m.status]}
                  </option>
                ))}
              </select>
            </Bidang>

            <Bidang id={`${uid}-ambil`} label="Tanggal ambil">
              <input
                id={`${uid}-ambil`}
                type="date"
                value={ambil}
                onChange={(e) => setAmbil(e.target.value)}
                className={kelasInput}
              />
            </Bidang>

            <Bidang id={`${uid}-kembali`} label="Tanggal kembali">
              <input
                id={`${uid}-kembali`}
                type="date"
                value={kembali}
                onChange={(e) => setKembali(e.target.value)}
                className={kelasInput}
              />
            </Bidang>
          </div>

          <dl className="mt-6 grid gap-x-6 gap-y-2 border-t border-line pt-5 text-sm sm:grid-cols-3">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-ink-3">Lama sewa</dt>
              <dd className="font-mono text-ink-2">{hari} hari</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-ink-3">Tarif harian</dt>
              <dd className="font-mono text-ink-2">{rupiah(unit.tarif)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-ink">Total</dt>
              <dd className="font-mono font-semibold text-ink">
                {rupiah(total)}
              </dd>
            </div>
          </dl>

          <button type="submit" className={`${kelasTombolUtama} mt-6`}>
            Buat pemesanan
          </button>
        </form>
      </PanelTab>

      {/* ---------------- Bukti pembayaran ---------------- */}
      <PanelTab idPrefix={`${uid}-alur`} id="bukti" aktif={tab}>
        <h3 className="text-lg font-semibold text-ink">Bukti pembayaran</h3>
        <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-ink-3">
          Bagian ini <strong className="text-ink-2">hanya tampilan</strong>.
          Tidak ada pemilih berkas, tidak ada berkas yang dibaca, dan tidak ada
          apa pun yang diunggah — tombol di bawah sekadar menandai lampiran
          contoh.
        </p>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-sm border border-line bg-bg-elev p-5">
            <Bidang id={`${uid}-pesanan`} label="Pemesanan">
              <select
                id={`${uid}-pesanan`}
                value={pesananAktif}
                onChange={(e) => setPesananAktif(e.target.value)}
                className={kelasInput}
              >
                {pesanan.map((p) => (
                  <option key={p.kode} value={p.kode}>
                    {p.kode} — {p.penyewa}
                  </option>
                ))}
              </select>
            </Bidang>

            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink-3">Unit</dt>
                <dd className="text-ink-2">{namaUnit(aktif.unitId)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink-3">Periode</dt>
                <dd className="font-mono text-[12px] text-ink-2">
                  {aktif.ambil} → {aktif.kembali}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink">Total tagihan</dt>
                <dd className="font-mono font-semibold text-ink">
                  {rupiah(aktif.total)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={lampirkanBukti}
              className={`${kelasTombolUtama} mt-6`}
            >
              <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
              Tandai lampiran contoh
            </button>
          </div>

          <div
            aria-live="polite"
            className="rounded-sm border border-dashed border-line-strong bg-bg-soft p-5"
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
              Pratinjau lampiran
            </p>
            {aktif.bukti ? (
              <>
                <div
                  aria-hidden="true"
                  className="mt-4 flex h-36 items-center justify-center rounded-sm border border-line bg-bg-elev font-mono text-[11px] tracking-[0.18em] text-ink-3 uppercase"
                >
                  Gambar contoh
                </div>
                <p className="mt-3 font-mono text-[11px] text-ink-2">
                  {aktif.bukti}
                </p>
                <p className="mt-1 text-xs text-ink-3">
                  Berkas fiktif — tidak ada data biner apa pun di balik nama ini.
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm leading-[1.7] text-ink-3">
                Belum ada lampiran contoh untuk {aktif.kode}.
              </p>
            )}
          </div>
        </div>
      </PanelTab>

      {/* ---------------- Panel admin ---------------- */}
      <PanelTab idPrefix={`${uid}-alur`} id="admin" aktif={tab}>
        <h3 className="text-lg font-semibold text-ink">
          Panel admin — konfirmasi
        </h3>
        <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-ink-3">
          Hak akses admin: menyetujui atau menolak pemesanan. Menyetujui membuat
          unit terkait berstatus &ldquo;Disewa&rdquo; di katalog.
        </p>

        <div
          tabIndex={0}
          role="group"
          aria-label="Tabel pemesanan — dapat digulir mendatar"
          className="mt-5 overflow-x-auto rounded-sm border border-line"
        >
          <table className="w-full min-w-[46rem] border-collapse text-sm">
            <caption className="sr-only">
              Daftar pemesanan untuk dikonfirmasi (data contoh)
            </caption>
            <thead>
              <tr className="border-b border-line bg-bg-soft text-left font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">
                <th scope="col" className="px-3 py-2.5 font-normal">
                  Kode
                </th>
                <th scope="col" className="px-3 py-2.5 font-normal">
                  Penyewa
                </th>
                <th scope="col" className="px-3 py-2.5 font-normal">
                  Unit
                </th>
                <th scope="col" className="px-3 py-2.5 font-normal">
                  Bukti
                </th>
                <th scope="col" className="px-3 py-2.5 font-normal">
                  Status
                </th>
                <th scope="col" className="px-3 py-2.5 font-normal">
                  Tindakan
                </th>
              </tr>
            </thead>
            <tbody aria-live="polite">
              {pesanan.map((p, i) => (
                <tr
                  key={p.kode}
                  className={`border-b border-line last:border-0 ${
                    i % 2 === 1 ? "bg-bg-soft/50" : ""
                  }`}
                >
                  <td className="px-3 py-3 font-mono text-[11px] text-ink-3">
                    {p.kode}
                  </td>
                  <td className="px-3 py-3 text-ink">{p.penyewa}</td>
                  <td className="px-3 py-3 text-ink-2">
                    {namaUnit(p.unitId)}
                  </td>
                  <td className="px-3 py-3 font-mono text-[11px] text-ink-3">
                    {p.bukti ?? "—"}
                  </td>
                  <td className="px-3 py-3">
                    <PilStatus nada={nadaPesan[p.status]}>
                      {labelPesan[p.status]}
                    </PilStatus>
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={p.status !== "menunggu"}
                        onClick={() => konfirmasi(p.kode, true)}
                        className={kelasTombolSekunder}
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        Konfirmasi
                        <span className="sr-only"> {p.kode}</span>
                      </button>
                      <button
                        type="button"
                        disabled={p.status !== "menunggu"}
                        onClick={() => konfirmasi(p.kode, false)}
                        className={kelasTombolSekunder}
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                        Tolak
                        <span className="sr-only"> {p.kode}</span>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelTab>

      {/* ---------------- Pengembalian ---------------- */}
      <PanelTab idPrefix={`${uid}-alur`} id="kembali" aktif={tab}>
        <h3 className="text-lg font-semibold text-ink">Pengembalian unit</h3>
        <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-ink-3">
          Mencatat pengembalian menutup pemesanan dan mengembalikan status unit
          menjadi &ldquo;Tersedia&rdquo; di katalog.
        </p>

        <div aria-live="polite" className="mt-5 space-y-4">
          {sedangDisewa.length === 0 ? (
            <p className="rounded-sm border border-line bg-bg-soft p-5 text-sm text-ink-3">
              Tidak ada unit contoh yang sedang disewa. Konfirmasi satu
              pemesanan di panel admin untuk mencobanya.
            </p>
          ) : (
            sedangDisewa.map((p) => (
              <div
                key={p.kode}
                className="rounded-sm border border-line bg-bg-elev p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] text-ink-3">{p.kode}</p>
                    <p className="mt-1 text-base font-semibold text-ink">
                      {namaUnit(p.unitId)}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-2">
                      Penyewa {p.penyewa} · {p.hari} hari
                    </p>
                  </div>
                  <PilStatus nada={nadaPesan[p.status]}>
                    {labelPesan[p.status]}
                  </PilStatus>
                </div>

                <ul className="mt-4 grid gap-2 border-t border-line pt-4 text-sm sm:grid-cols-3">
                  {[
                    "Kelengkapan unit",
                    "Kondisi bahan bakar",
                    "Kebersihan kabin",
                  ].map((c) => (
                    <li key={c} className="flex items-center gap-2 text-ink-2">
                      <Check
                        className="h-3.5 w-3.5 text-accent"
                        aria-hidden="true"
                      />
                      {c} — diperiksa (contoh)
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => catatPengembalian(p.kode)}
                  className={`${kelasTombolUtama} mt-5`}
                >
                  <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                  Catat pengembalian
                  <span className="sr-only"> {p.kode}</span>
                </button>
              </div>
            ))
          )}
        </div>
      </PanelTab>
    </section>
  );
}
