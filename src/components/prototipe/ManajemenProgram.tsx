"use client";

import { Bot, FileText, MessageSquare, ScanText, Wallet } from "lucide-react";
import { useId, useState } from "react";
import {
  DaftarTab,
  JudulBagian,
  LabelContoh,
  PanelTab,
  PilStatus,
  type Tab,
  kelasTombolSekunder,
  rupiah,
} from "./primitif";

/* ---------------------------------------------------------------------------
   Prototipe Sistem Full-Stack Manajemen Program.

   Modul yang diperagakan persis empat yang tertulis di `profile.ts`: katalog,
   CRM leads, invoice, dan portal peserta. Integrasi yang ditampilkan sebagai
   chip status juga persis yang disebut di sana: Fonnte (WhatsApp), Midtrans
   (payment), Gemini (chatbot AI), dan OCR self-hosted.

   Seluruh nama, nomor, dan angka adalah data contoh fiktif.
   --------------------------------------------------------------------------- */

const INTEGRASI = [
  {
    nama: "Fonnte",
    peran: "WhatsApp gateway",
    status: "Terhubung",
    nada: "aksen" as const,
    Ikon: MessageSquare,
  },
  {
    nama: "Midtrans",
    peran: "Payment gateway",
    status: "Sandbox",
    nada: "garis" as const,
    Ikon: Wallet,
  },
  {
    nama: "Gemini",
    peran: "Chatbot AI",
    status: "Terhubung",
    nada: "aksen" as const,
    Ikon: Bot,
  },
  {
    nama: "OCR self-hosted",
    peran: "Ekstraksi dokumen",
    status: "Terhubung",
    nada: "aksen" as const,
    Ikon: ScanText,
  },
];

const KATALOG = [
  {
    kode: "PRG-CONTOH-01",
    nama: "Program Contoh Alfa",
    kelas: "Daring",
    kuota: "24 / 30",
    harga: 1800000,
    status: "Dibuka",
    nada: "aksen" as const,
  },
  {
    kode: "PRG-CONTOH-02",
    nama: "Program Contoh Beta",
    kelas: "Luring",
    kuota: "30 / 30",
    harga: 2500000,
    status: "Penuh",
    nada: "isi" as const,
  },
  {
    kode: "PRG-CONTOH-03",
    nama: "Program Contoh Gama",
    kelas: "Hibrida",
    kuota: "9 / 25",
    harga: 2100000,
    status: "Dibuka",
    nada: "aksen" as const,
  },
  {
    kode: "PRG-CONTOH-04",
    nama: "Program Contoh Delta",
    kelas: "Daring",
    kuota: "0 / 20",
    harga: 950000,
    status: "Draf",
    nada: "redup" as const,
  },
];

const TAHAP = [
  { id: "baru", label: "Baru" },
  { id: "dihubungi", label: "Dihubungi" },
  { id: "kualifikasi", label: "Kualifikasi" },
  { id: "menang", label: "Menang" },
] as const;

type TahapId = (typeof TAHAP)[number]["id"];

const LEADS: {
  nama: string;
  kontak: string;
  program: string;
  sumber: string;
  tahap: TahapId;
}[] = [
  {
    nama: "Ani Contoh",
    kontak: "+62 800-0000-0001",
    program: "Program Contoh Alfa",
    sumber: "Formulir situs",
    tahap: "baru",
  },
  {
    nama: "Budi Contoh",
    kontak: "+62 800-0000-0002",
    program: "Program Contoh Gama",
    sumber: "WhatsApp",
    tahap: "dihubungi",
  },
  {
    nama: "Citra Contoh",
    kontak: "+62 800-0000-0003",
    program: "Program Contoh Alfa",
    sumber: "Rujukan",
    tahap: "kualifikasi",
  },
  {
    nama: "Dewi Contoh",
    kontak: "+62 800-0000-0004",
    program: "Program Contoh Beta",
    sumber: "Chatbot",
    tahap: "menang",
  },
  {
    nama: "Eko Contoh",
    kontak: "+62 800-0000-0005",
    program: "Program Contoh Gama",
    sumber: "Formulir situs",
    tahap: "baru",
  },
  {
    nama: "Fajar Contoh",
    kontak: "+62 800-0000-0006",
    program: "Program Contoh Alfa",
    sumber: "WhatsApp",
    tahap: "dihubungi",
  },
];

const nadaTahap: Record<TahapId, "aksen" | "garis" | "redup" | "isi"> = {
  baru: "redup",
  dihubungi: "garis",
  kualifikasi: "aksen",
  menang: "isi",
};

type Invoice = {
  nomor: string;
  peserta: string;
  program: string;
  jatuhTempo: string;
  status: "Lunas" | "Menunggu" | "Kedaluwarsa";
  nada: "isi" | "aksen" | "redup";
  metode: string;
  rincian: { label: string; nilai: number }[];
};

const INVOICE: Invoice[] = [
  {
    nomor: "INV-CONTOH-2401",
    peserta: "Dewi Contoh",
    program: "Program Contoh Beta",
    jatuhTempo: "12 Nov 2026",
    status: "Lunas",
    nada: "isi",
    metode: "Midtrans — transfer virtual (sandbox)",
    rincian: [
      { label: "Biaya program", nilai: 2500000 },
      { label: "Modul cetak", nilai: 150000 },
      { label: "Potongan pendaftaran awal", nilai: -250000 },
    ],
  },
  {
    nomor: "INV-CONTOH-2402",
    peserta: "Citra Contoh",
    program: "Program Contoh Alfa",
    jatuhTempo: "18 Nov 2026",
    status: "Menunggu",
    nada: "aksen",
    metode: "Midtrans — kartu (sandbox)",
    rincian: [
      { label: "Biaya program", nilai: 1800000 },
      { label: "Sesi pendampingan", nilai: 300000 },
    ],
  },
  {
    nomor: "INV-CONTOH-2403",
    peserta: "Budi Contoh",
    program: "Program Contoh Gama",
    jatuhTempo: "02 Nov 2026",
    status: "Kedaluwarsa",
    nada: "redup",
    metode: "Midtrans — transfer virtual (sandbox)",
    rincian: [{ label: "Biaya program", nilai: 2100000 }],
  },
];

const TAB: Tab[] = [
  { id: "katalog", label: "Katalog" },
  { id: "leads", label: "CRM leads" },
  { id: "invoice", label: "Invoice" },
  { id: "portal", label: "Portal peserta" },
];

export default function ManajemenProgram() {
  const uid = useId().replace(/:/g, "");
  const [tab, setTab] = useState("katalog");
  const [saring, setSaring] = useState<TahapId | "semua">("semua");
  const [invoice, setInvoice] = useState(INVOICE[0]!.nomor);

  const invoiceAktif = INVOICE.find((i) => i.nomor === invoice) ?? INVOICE[0]!;
  const totalInvoice = invoiceAktif.rincian.reduce((a, b) => a + b.nilai, 0);
  const leadsTampil =
    saring === "semua" ? LEADS : LEADS.filter((l) => l.tahap === saring);

  return (
    <div className="space-y-12 sm:space-y-14">
      {/* ------------------------------------------------ Integrasi */}
      <section aria-labelledby={`${uid}-integrasi`}>
        <JudulBagian
          id={`${uid}-integrasi`}
          nomor="01"
          keterangan="Empat integrasi yang tercatat pada deskripsi proyek. Status di bawah adalah status contoh, bukan pembacaan sistem yang sedang berjalan."
          aksi={<LabelContoh>Status contoh</LabelContoh>}
        >
          Integrasi
        </JudulBagian>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRASI.map(({ nama, peran, status, nada, Ikon }) => (
            <li
              key={nama}
              className="flex items-start gap-3 border border-line bg-bg-elev p-4"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center border border-line bg-bg-soft text-accent-ink">
                <Ikon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">
                  {nama}
                </span>
                <span className="mt-0.5 block font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
                  {peran}
                </span>
                <span className="mt-2 block">
                  <PilStatus nada={nada}>{status}</PilStatus>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ Modul */}
      <section aria-labelledby={`${uid}-modul`}>
        <JudulBagian
          id={`${uid}-modul`}
          nomor="02"
          keterangan="Empat modul yang tercatat pada deskripsi proyek. Pindah antar modul dengan klik atau tombol panah pada papan ketik."
          aksi={<LabelContoh />}
        >
          Modul
        </JudulBagian>

        <div className="mt-6 grid gap-0 border border-line bg-bg-elev lg:grid-cols-[13.5rem_minmax(0,1fr)]">
          {/* `min-w-0` menahan rel tab agar menggulir sendiri alih-alih
              melebarkan kolom grid di layar sempit. */}
          <div className="min-w-0 border-b border-line p-3 lg:border-r lg:border-b-0">
            <p className="px-3 pt-1 pb-3 font-mono text-[10px] tracking-[0.2em] text-ink-3 uppercase">
              Navigasi
            </p>
            <DaftarTab
              tabs={TAB}
              aktif={tab}
              onGanti={setTab}
              idPrefix={`${uid}-modul`}
              label="Modul sistem manajemen program"
              vertikal
            />
          </div>

          <div className="min-w-0 p-5 sm:p-6">
            {/* ---------------- Katalog ---------------- */}
            <PanelTab idPrefix={`${uid}-modul`} id="katalog" aktif={tab}>
              <h3 className="text-lg font-semibold text-ink">Katalog program</h3>
              <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-ink-3">
                Daftar program beserta kuota, harga, dan status publikasinya.
              </p>

              <div
                tabIndex={0}
                role="group"
                aria-label="Tabel katalog — dapat digulir mendatar"
                className="mt-5 overflow-x-auto border border-line"
              >
                <table className="w-full min-w-[38rem] border-collapse text-sm">
                  <caption className="sr-only">
                    Katalog program (data contoh)
                  </caption>
                  <thead>
                    <tr className="border-b border-line bg-bg-soft text-left font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Kode
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Program
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Kelas
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Kuota
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Harga
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {KATALOG.map((k) => (
                      <tr key={k.kode} className="border-b border-line last:border-0">
                        <td className="px-3 py-3 font-mono text-[11px] text-ink-3">
                          {k.kode}
                        </td>
                        <td className="px-3 py-3 text-ink">{k.nama}</td>
                        <td className="px-3 py-3 text-ink-2">{k.kelas}</td>
                        <td className="px-3 py-3 font-mono text-[12px] text-ink-2">
                          {k.kuota}
                        </td>
                        <td className="px-3 py-3 font-mono text-[12px] text-ink-2">
                          {rupiah(k.harga)}
                        </td>
                        <td className="px-3 py-3">
                          <PilStatus nada={k.nada}>{k.status}</PilStatus>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PanelTab>

            {/* ---------------- CRM leads ---------------- */}
            <PanelTab idPrefix={`${uid}-modul`} id="leads" aktif={tab}>
              <h3 className="text-lg font-semibold text-ink">CRM leads</h3>
              <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-ink-3">
                Pipeline empat tahap. Klik satu tahap untuk menyaring tabel di
                bawahnya.
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-4">
                {TAHAP.map((t) => {
                  const jumlah = LEADS.filter((l) => l.tahap === t.id).length;
                  const dipilih = saring === t.id;
                  return (
                    <li key={t.id}>
                      <button
                        type="button"
                        aria-pressed={dipilih}
                        onClick={() => setSaring(dipilih ? "semua" : t.id)}
                        className={`w-full border px-3 py-3 text-left transition-colors ${
                          dipilih
                            ? "border-accent bg-accent-soft"
                            : "border-line bg-bg-soft hover:border-accent/60"
                        }`}
                      >
                        <span className="block font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">
                          {t.label}
                        </span>
                        <span className="mt-1 block font-mono text-2xl leading-none font-semibold text-ink">
                          {jumlah}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-3 font-mono text-[11px] text-ink-3">
                {saring === "semua"
                  ? "Menampilkan seluruh lead contoh."
                  : `Disaring: tahap ${TAHAP.find((t) => t.id === saring)?.label}.`}
              </p>

              <div
                tabIndex={0}
                role="group"
                aria-label="Tabel leads — dapat digulir mendatar"
                className="mt-3 overflow-x-auto border border-line"
              >
                <table className="w-full min-w-[40rem] border-collapse text-sm">
                  <caption className="sr-only">
                    Daftar lead (data contoh)
                  </caption>
                  <thead>
                    <tr className="border-b border-line bg-bg-soft text-left font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Nama
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Kontak
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Program diminati
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Sumber
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-normal">
                        Tahap
                      </th>
                    </tr>
                  </thead>
                  <tbody aria-live="polite">
                    {leadsTampil.map((l) => (
                      <tr key={l.nama} className="border-b border-line last:border-0">
                        <td className="px-3 py-3 text-ink">{l.nama}</td>
                        <td className="px-3 py-3 font-mono text-[11px] text-ink-3">
                          {l.kontak}
                        </td>
                        <td className="px-3 py-3 text-ink-2">{l.program}</td>
                        <td className="px-3 py-3 text-ink-2">{l.sumber}</td>
                        <td className="px-3 py-3">
                          <PilStatus nada={nadaTahap[l.tahap]}>
                            {TAHAP.find((t) => t.id === l.tahap)?.label}
                          </PilStatus>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PanelTab>

            {/* ---------------- Invoice ---------------- */}
            <PanelTab idPrefix={`${uid}-modul`} id="invoice" aktif={tab}>
              <h3 className="text-lg font-semibold text-ink">Invoice</h3>
              <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-ink-3">
                Daftar invoice di kiri, rinciannya di kanan. Status pembayaran
                mengacu pada Midtrans.
              </p>

              <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
                <ul className="space-y-2">
                  {INVOICE.map((inv) => {
                    const ini = inv.nomor === invoice;
                    return (
                      <li key={inv.nomor}>
                        <button
                          type="button"
                          aria-pressed={ini}
                          onClick={() => setInvoice(inv.nomor)}
                          className={`w-full border px-3 py-3 text-left transition-colors ${
                            ini
                              ? "border-accent bg-accent-soft"
                              : "border-line bg-bg-soft hover:border-accent/60"
                          }`}
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] text-ink-2">
                              {inv.nomor}
                            </span>
                            <PilStatus nada={inv.nada}>{inv.status}</PilStatus>
                          </span>
                          <span className="mt-1.5 block text-sm text-ink">
                            {inv.peserta}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div
                  aria-live="polite"
                  className="min-w-0 border border-line bg-bg-soft p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
                        {invoiceAktif.nomor}
                      </p>
                      <h4 className="mt-1 text-base font-semibold text-ink">
                        {invoiceAktif.peserta}
                      </h4>
                      <p className="mt-0.5 text-sm text-ink-2">
                        {invoiceAktif.program}
                      </p>
                    </div>
                    <PilStatus nada={invoiceAktif.nada}>
                      {invoiceAktif.status}
                    </PilStatus>
                  </div>

                  <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                    {invoiceAktif.rincian.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <dt className="text-ink-3">{r.label}</dt>
                        <dd className="font-mono text-[12px] text-ink-2">
                          {rupiah(r.nilai)}
                        </dd>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between gap-3 border-t border-line pt-3">
                      <dt className="text-ink">Total</dt>
                      <dd className="font-mono text-base font-semibold text-ink">
                        {rupiah(totalInvoice)}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4 font-mono text-[11px] text-ink-3">
                    <span>Jatuh tempo {invoiceAktif.jatuhTempo}</span>
                    <span aria-hidden="true">·</span>
                    <span>{invoiceAktif.metode}</span>
                  </p>

                  <p className="mt-4">
                    <button
                      type="button"
                      className={kelasTombolSekunder}
                      disabled
                      data-butuh-js
                    >
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                      Unduh PDF (nonaktif di prototipe)
                    </button>
                  </p>
                </div>
              </div>
            </PanelTab>

            {/* ---------------- Portal peserta ---------------- */}
            <PanelTab idPrefix={`${uid}-modul`} id="portal" aktif={tab}>
              <h3 className="text-lg font-semibold text-ink">Portal peserta</h3>
              <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-ink-3">
                Tampilan yang dilihat peserta: status pendaftaran, hasil
                ekstraksi dokumen oleh OCR self-hosted, riwayat notifikasi
                WhatsApp lewat Fonnte, dan percakapan chatbot Gemini.
              </p>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="border border-line bg-bg-soft p-4 sm:p-5">
                  <h4 className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
                    Status pendaftaran
                  </h4>
                  <p className="mt-2 text-base font-semibold text-ink">
                    Dewi Contoh
                  </p>
                  <p className="text-sm text-ink-2">Program Contoh Beta</p>
                  <ol className="mt-4 space-y-2.5">
                    {[
                      ["Pendaftaran", "isi"],
                      ["Verifikasi dokumen", "isi"],
                      ["Pembayaran", "aksen"],
                      ["Kelas dimulai", "redup"],
                    ].map(([label, nada], i) => (
                      <li key={label} className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="font-mono text-[11px] text-ink-3"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-ink-2">{label}</span>
                        <span className="ml-auto">
                          <PilStatus
                            nada={nada as "isi" | "aksen" | "redup"}
                          >
                            {nada === "isi"
                              ? "Selesai"
                              : nada === "aksen"
                                ? "Berjalan"
                                : "Menunggu"}
                          </PilStatus>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border border-line bg-bg-soft p-4 sm:p-5">
                  <h4 className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
                    <ScanText className="h-3.5 w-3.5" aria-hidden="true" />
                    Ekstraksi OCR self-hosted
                  </h4>
                  <p className="mt-2 font-mono text-[11px] text-ink-3">
                    berkas: dokumen-contoh.pdf
                  </p>
                  <dl className="mt-3 space-y-2 text-sm">
                    {[
                      ["Nama pada dokumen", "DEWI CONTOH"],
                      ["Nomor dokumen", "0000-0000-0000"],
                      ["Tanggal terbit", "01 Jan 2026"],
                      ["Keyakinan ekstraksi", "0,93"],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <dt className="text-ink-3">{k}</dt>
                        <dd className="font-mono text-[12px] text-ink-2">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="border border-line bg-bg-soft p-4 sm:p-5">
                  <h4 className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
                    <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                    Notifikasi WhatsApp (Fonnte)
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      ["09:12", "Pendaftaran contoh diterima."],
                      ["09:14", "Dokumen contoh berhasil diverifikasi."],
                      ["10:02", "Tagihan INV-CONTOH-2401 telah dibuat."],
                    ].map(([jam, pesan]) => (
                      <li key={jam} className="flex gap-3 text-sm">
                        <span className="font-mono text-[11px] text-ink-3">
                          {jam}
                        </span>
                        <span className="text-ink-2">{pesan}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-line bg-bg-soft p-4 sm:p-5">
                  <h4 className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
                    <Bot className="h-3.5 w-3.5" aria-hidden="true" />
                    Chatbot AI (Gemini)
                  </h4>
                  <ul className="mt-3 space-y-3 text-sm">
                    <li>
                      <span className="block font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
                        Peserta
                      </span>
                      <span className="mt-1 block border border-line bg-bg-elev p-3 text-ink-2">
                        Kapan kelas Program Contoh Beta dimulai?
                      </span>
                    </li>
                    <li>
                      <span className="block font-mono text-[10px] tracking-[0.14em] text-accent-ink uppercase">
                        Chatbot
                      </span>
                      <span className="mt-1 block border border-accent/50 bg-accent-soft p-3 text-ink-2">
                        Jawaban contoh: kelas dijadwalkan mulai 12 Nov 2026.
                        Balasan ini ditulis di dalam prototipe, bukan hasil
                        pemanggilan model.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </PanelTab>
          </div>
        </div>
      </section>
    </div>
  );
}
