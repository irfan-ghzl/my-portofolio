"use client";

import { Bell, Inbox, Send, Share2 } from "lucide-react";
import { useState } from "react";
import {
  Bidang,
  DaftarTab,
  JudulBagian,
  LabelContoh,
  PanelTab,
  PilStatus,
  type NadaStatus,
  kelasInput,
  kelasTombolSekunder,
  kelasTombolUtama,
  useIdBersih,
} from "./primitif";

/* ---------------------------------------------------------------------------
   Prototipe Sistem Pengaduan Masyarakat.

   Alur yang diperagakan persis yang tertulis di `profile.ts`: pelaporan →
   disposisi ke petugas → tanggapan → notifikasi pelapor, dengan dua peran
   (masyarakat dan petugas).

   Tidak ada login. Pengalih peran di bawah murni mengganti tampilan; tidak ada
   autentikasi, sesi, maupun penyimpanan apa pun. Seluruh isi laporan adalah
   data contoh fiktif.
   --------------------------------------------------------------------------- */

type Tahap = "pelaporan" | "disposisi" | "tanggapan" | "notifikasi";

const URUTAN: { id: Tahap; label: string; keterangan: string }[] = [
  {
    id: "pelaporan",
    label: "Pelaporan",
    keterangan: "Masyarakat mengirim laporan.",
  },
  {
    id: "disposisi",
    label: "Disposisi",
    keterangan: "Petugas meneruskan ke unit terkait.",
  },
  {
    id: "tanggapan",
    label: "Tanggapan",
    keterangan: "Unit menuliskan tindak lanjut.",
  },
  {
    id: "notifikasi",
    label: "Notifikasi",
    keterangan: "Pelapor diberi tahu hasilnya.",
  },
];

const labelTahap: Record<Tahap, string> = {
  pelaporan: "Baru",
  disposisi: "Didisposisi",
  tanggapan: "Ditanggapi",
  notifikasi: "Selesai",
};

/* "Baru" adalah antrean yang belum tersentuh (slate), dua tahap di tengah
   sedang berjalan (amber), dan "Selesai" berakhir positif (hijau). Sebelumnya
   justru terbalik: "Baru" paling menyala, "Selesai" paling redup. */
const nadaTahap: Record<Tahap, NadaStatus> = {
  pelaporan: "netral",
  disposisi: "aksen",
  tanggapan: "aksen",
  notifikasi: "ok",
};

const UNIT = [
  "Unit Contoh — Sarana Umum",
  "Unit Contoh — Kebersihan",
  "Unit Contoh — Penerangan Jalan",
  "Unit Contoh — Layanan Warga",
];

const KATEGORI = [
  "Sarana umum",
  "Kebersihan",
  "Penerangan jalan",
  "Layanan administrasi",
];

type Pengaduan = {
  id: string;
  judul: string;
  kategori: string;
  lokasi: string;
  uraian: string;
  waktu: string;
  tahap: Tahap;
  unit?: string;
  tanggapan?: string;
  riwayat: string[];
};

const AWAL: Pengaduan[] = [
  {
    id: "ADU-CONTOH-001",
    judul: "Lampu jalan padam di ruas contoh",
    kategori: "Penerangan jalan",
    lokasi: "Jalan Contoh Nomor 1, Kelurahan Contoh",
    uraian:
      "Laporan contoh: penerangan pada satu ruas jalan tidak menyala sejak beberapa malam terakhir.",
    waktu: "02 Nov 2026, 08:14",
    tahap: "pelaporan",
    riwayat: ["08:14 — Laporan contoh diterima sistem."],
  },
  {
    id: "ADU-CONTOH-002",
    judul: "Saluran air tersumbat di gang contoh",
    kategori: "Kebersihan",
    lokasi: "Gang Contoh II, Kelurahan Contoh",
    uraian:
      "Laporan contoh: aliran air tersendat setelah hujan dan menggenang di badan gang.",
    waktu: "01 Nov 2026, 16:40",
    tahap: "disposisi",
    unit: "Unit Contoh — Kebersihan",
    riwayat: [
      "16:40 — Laporan contoh diterima sistem.",
      "17:05 — Didisposisikan ke Unit Contoh — Kebersihan.",
    ],
  },
  {
    id: "ADU-CONTOH-003",
    judul: "Papan informasi rusak di balai contoh",
    kategori: "Sarana umum",
    lokasi: "Balai Contoh, Kelurahan Contoh",
    uraian:
      "Laporan contoh: papan informasi warga patah pada bagian penyangganya.",
    waktu: "29 Okt 2026, 09:02",
    tahap: "notifikasi",
    unit: "Unit Contoh — Sarana Umum",
    tanggapan:
      "Tanggapan contoh: penyangga papan telah diganti dan area sekitarnya dirapikan.",
    riwayat: [
      "09:02 — Laporan contoh diterima sistem.",
      "09:30 — Didisposisikan ke Unit Contoh — Sarana Umum.",
      "13:11 — Tanggapan contoh dikirim petugas.",
      "13:12 — Notifikasi contoh dikirim ke pelapor.",
    ],
  },
  {
    id: "ADU-CONTOH-004",
    judul: "Sampah menumpuk di titik contoh",
    kategori: "Kebersihan",
    lokasi: "Jalan Contoh Nomor 7, Kelurahan Contoh",
    uraian:
      "Laporan contoh: tumpukan sampah di bahu jalan belum terangkut sejak akhir pekan.",
    waktu: "02 Nov 2026, 07:05",
    tahap: "disposisi",
    unit: "Unit Contoh — Kebersihan",
    riwayat: [
      "07:05 — Laporan contoh diterima sistem.",
      "07:48 — Didisposisikan ke Unit Contoh — Kebersihan.",
    ],
  },
  {
    id: "ADU-CONTOH-005",
    judul: "Antrean layanan surat contoh terlalu panjang",
    kategori: "Layanan administrasi",
    lokasi: "Kantor Contoh, Kelurahan Contoh",
    uraian:
      "Laporan contoh: waktu tunggu layanan surat keterangan dirasa terlalu lama pada jam sibuk.",
    waktu: "31 Okt 2026, 11:22",
    tahap: "tanggapan",
    unit: "Unit Contoh — Layanan Warga",
    tanggapan:
      "Tanggapan contoh: loket tambahan dibuka pada jam sibuk mulai pekan depan.",
    riwayat: [
      "11:22 — Laporan contoh diterima sistem.",
      "11:50 — Didisposisikan ke Unit Contoh — Layanan Warga.",
      "15:30 — Tanggapan contoh dikirim petugas.",
    ],
  },
  {
    id: "ADU-CONTOH-006",
    judul: "Trotoar retak di sisi contoh",
    kategori: "Sarana umum",
    lokasi: "Jalan Contoh Nomor 12, Kelurahan Contoh",
    uraian:
      "Laporan contoh: permukaan trotoar retak dan menaikkan sebagian ubinnya.",
    waktu: "28 Okt 2026, 14:47",
    tahap: "notifikasi",
    unit: "Unit Contoh — Sarana Umum",
    tanggapan:
      "Tanggapan contoh: ubin yang terangkat sudah dipasang ulang dan diratakan.",
    riwayat: [
      "14:47 — Laporan contoh diterima sistem.",
      "15:20 — Didisposisikan ke Unit Contoh — Sarana Umum.",
      "09:40 — Tanggapan contoh dikirim petugas.",
      "09:41 — Notifikasi contoh dikirim ke pelapor.",
    ],
  },
];

const PERAN = [
  { id: "masyarakat", label: "Masyarakat" },
  { id: "petugas", label: "Petugas" },
];

export default function Pengaduan() {
  const uid = useIdBersih();
  const [peran, setPeran] = useState("masyarakat");
  const [daftar, setDaftar] = useState<Pengaduan[]>(AWAL);
  const [terpilih, setTerpilih] = useState(AWAL[0]!.id);
  const [unit, setUnit] = useState(UNIT[0]!);
  const [tanggapan, setTanggapan] = useState("");
  const [nomorBaru, setNomorBaru] = useState(7);
  const [judul, setJudul] = useState("");
  const [kabar, setKabar] = useState("");

  const aktif = daftar.find((p) => p.id === terpilih) ?? daftar[0]!;
  const indeksTahap = URUTAN.findIndex((t) => t.id === aktif.tahap);

  function ubah(id: string, ubahan: (p: Pengaduan) => Pengaduan) {
    setDaftar((d) => d.map((p) => (p.id === id ? ubahan(p) : p)));
  }

  function kirimLaporan() {
    const id = `ADU-CONTOH-${String(nomorBaru).padStart(3, "0")}`;
    const baru: Pengaduan = {
      id,
      judul: judul.trim() || "Laporan contoh tanpa judul",
      kategori: KATEGORI[0]!,
      lokasi: "Alamat contoh, Kelurahan Contoh",
      uraian: "Uraian contoh yang diisi lewat formulir prototipe ini.",
      waktu: "baru saja",
      tahap: "pelaporan",
      riwayat: ["baru saja — Laporan contoh diterima sistem."],
    };
    setDaftar((d) => [baru, ...d]);
    setTerpilih(id);
    setNomorBaru((n) => n + 1);
    setJudul("");
    setKabar(`Laporan contoh ${id} dibuat di layar ini saja.`);
  }

  function disposisikan() {
    ubah(aktif.id, (p) => ({
      ...p,
      tahap: "disposisi",
      unit,
      riwayat: [...p.riwayat, `baru saja — Didisposisikan ke ${unit}.`],
    }));
    setKabar(`${aktif.id} didisposisikan ke ${unit} (simulasi).`);
  }

  function kirimTanggapan() {
    const teks = tanggapan.trim() || "Tanggapan contoh dari petugas.";
    ubah(aktif.id, (p) => ({
      ...p,
      tahap: "notifikasi",
      tanggapan: teks,
      riwayat: [
        ...p.riwayat,
        "baru saja — Tanggapan contoh dikirim petugas.",
        "baru saja — Notifikasi contoh dikirim ke pelapor.",
      ],
    }));
    setTanggapan("");
    setKabar(`Tanggapan untuk ${aktif.id} dikirim, pelapor dinotifikasi (simulasi).`);
  }

  return (
    <div className="space-y-12 sm:space-y-14">
      {/* ------------------------------------------------ Alur */}
      <section aria-labelledby={`${uid}-alur`}>
        <JudulBagian
          id={`${uid}-alur`}
          nomor="01"
          keterangan="Empat tahap yang tercatat pada deskripsi proyek. Penanda di bawah mengikuti laporan yang sedang dipilih."
          aksi={<LabelContoh />}
        >
          Alur pengaduan
        </JudulBagian>

        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {URUTAN.map((t, i) => {
            const lewat = i <= indeksTahap;
            return (
              <li
                key={t.id}
                aria-current={i === indeksTahap ? "step" : undefined}
                className={`border p-4 ${
                  i === indeksTahap
                    ? "border-accent bg-accent-soft"
                    : lewat
                      ? "border-line-strong bg-bg-soft"
                      : "border-line bg-bg-elev"
                }`}
              >
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-ink-3 uppercase">
                  <span aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-px flex-1 ${lewat ? "bg-accent" : "bg-line"}`}
                  />
                </span>
                <span className="mt-2 block text-sm font-semibold text-ink">
                  {t.label}
                </span>
                <span className="mt-1 block text-xs leading-[1.6] text-ink-3">
                  {t.keterangan}
                </span>
              </li>
            );
          })}
        </ol>

        <p className="mt-4 font-mono text-[11px] text-ink-3">
          Laporan aktif: {aktif.id} · tahap {labelTahap[aktif.tahap]}
        </p>
      </section>

      {/* ------------------------------------------------ Peran */}
      <section aria-labelledby={`${uid}-peran`}>
        <JudulBagian
          id={`${uid}-peran`}
          nomor="02"
          keterangan="Dua peran yang tercatat pada deskripsi proyek. Pengalih ini hanya mengganti tampilan — tidak ada login, sesi, atau autentikasi apa pun di prototipe."
        >
          Peran
        </JudulBagian>

        <div className="mt-6">
          <DaftarTab
            tabs={PERAN}
            aktif={peran}
            onGanti={setPeran}
            idPrefix={`${uid}-peran`}
            label="Peran pengguna"
          />
        </div>

        <p aria-live="polite" className="mt-4 min-h-5 text-sm text-accent-ink">
          {kabar}
        </p>

        {/* ---------------- Masyarakat ---------------- */}
        <PanelTab
          idPrefix={`${uid}-peran`}
          id="masyarakat"
          aktif={peran}
          className="mt-4"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <form
              method="dialog"
              onSubmit={(e) => {
                e.preventDefault();
                kirimLaporan();
              }}
              className="border border-line bg-bg-elev p-5 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-ink">
                Formulir pelaporan
              </h3>
              <p className="mt-2 text-sm leading-[1.7] text-ink-3">
                Isian di bawah tidak dikirim ke mana pun. Tombol kirim hanya
                menambah satu baris pada daftar di sebelahnya.
              </p>

              <div className="mt-5 space-y-4">
                <Bidang id={`${uid}-judul`} label="Judul laporan">
                  <input
                    id={`${uid}-judul`}
                    type="text"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    placeholder="Contoh: lampu jalan padam"
                    className={kelasInput}
                  />
                </Bidang>

                <Bidang id={`${uid}-kategori`} label="Kategori">
                  <select
                    id={`${uid}-kategori`}
                    defaultValue={KATEGORI[0]}
                    className={kelasInput}
                  >
                    {KATEGORI.map((k) => (
                      <option key={k}>{k}</option>
                    ))}
                  </select>
                </Bidang>

                <Bidang
                  id={`${uid}-lokasi`}
                  label="Lokasi"
                  petunjuk="Alamat contoh — bukan alamat sungguhan."
                >
                  <input
                    id={`${uid}-lokasi`}
                    type="text"
                    aria-describedby={`${uid}-lokasi-petunjuk`}
                    defaultValue="Jalan Contoh Nomor 1, Kelurahan Contoh"
                    className={kelasInput}
                  />
                </Bidang>

                <Bidang id={`${uid}-uraian`} label="Uraian">
                  <textarea
                    id={`${uid}-uraian`}
                    rows={4}
                    defaultValue="Uraian contoh untuk memperagakan tampilan formulir."
                    className={kelasInput}
                  />
                </Bidang>
              </div>

              <button type="submit" className={`${kelasTombolUtama} mt-6`}>
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                Kirim laporan
              </button>
            </form>

            <div className="border border-line bg-bg-elev p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-ink">
                Daftar pengaduan saya
              </h3>

              <ul aria-live="polite" className="mt-5 space-y-3">
                {daftar.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      aria-pressed={p.id === terpilih}
                      onClick={() => setTerpilih(p.id)}
                      className={`w-full border p-4 text-left transition-colors ${
                        p.id === terpilih
                          ? "border-accent bg-accent-soft"
                          : "border-line bg-bg-soft hover:border-accent/60"
                      }`}
                    >
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-ink-3">
                          {p.id}
                        </span>
                        <PilStatus nada={nadaTahap[p.tahap]}>
                          {labelTahap[p.tahap]}
                        </PilStatus>
                      </span>
                      <span className="mt-1.5 block text-sm font-medium text-ink">
                        {p.judul}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] text-ink-3">
                        {p.kategori} · {p.waktu}
                      </span>
                      {p.tanggapan ? (
                        <span className="mt-2.5 block border-l-2 border-accent pl-3 text-xs leading-[1.6] text-ink-2">
                          {p.tanggapan}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PanelTab>

        {/* ---------------- Petugas ---------------- */}
        <PanelTab
          idPrefix={`${uid}-peran`}
          id="petugas"
          aktif={peran}
          className="mt-4"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
            <div className="border border-line bg-bg-elev p-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
                <Inbox className="h-4 w-4 text-accent" aria-hidden="true" />
                Kotak masuk
              </h3>
              <p className="mt-2 text-sm text-ink-3">
                {daftar.length} laporan contoh.
              </p>
              <ul className="mt-4 space-y-2">
                {daftar.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      aria-pressed={p.id === terpilih}
                      onClick={() => setTerpilih(p.id)}
                      className={`w-full border px-3 py-3 text-left transition-colors ${
                        p.id === terpilih
                          ? "border-accent bg-accent-soft"
                          : "border-line bg-bg-soft hover:border-accent/60"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-ink-3">
                          {p.id}
                        </span>
                        <PilStatus nada={nadaTahap[p.tahap]}>
                          {labelTahap[p.tahap]}
                        </PilStatus>
                      </span>
                      <span className="mt-1.5 block text-sm text-ink">
                        {p.judul}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div aria-live="polite" className="min-w-0 space-y-6">
              <div className="border border-line bg-bg-elev p-5 sm:p-6">
                <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
                  {aktif.id} · {aktif.waktu}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold text-ink">
                  {aktif.judul}
                </h3>
                <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
                      Kategori
                    </dt>
                    <dd className="text-ink-2">{aktif.kategori}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
                      Lokasi
                    </dt>
                    <dd className="text-ink-2">{aktif.lokasi}</dd>
                  </div>
                </dl>
                <p className="mt-4 border-t border-line pt-4 text-sm leading-[1.7] text-ink-2">
                  {aktif.uraian}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-line bg-bg-soft p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Share2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Disposisi
                  </h4>
                  <div className="mt-4">
                    <Bidang id={`${uid}-unit`} label="Unit tujuan">
                      <select
                        id={`${uid}-unit`}
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className={kelasInput}
                      >
                        {UNIT.map((u) => (
                          <option key={u}>{u}</option>
                        ))}
                      </select>
                    </Bidang>
                  </div>
                  <button
                    type="button"
                    onClick={disposisikan}
                    className={`${kelasTombolSekunder} mt-4`}
                  >
                    Disposisikan
                  </button>
                  <p className="mt-3 font-mono text-[11px] text-ink-3">
                    {aktif.unit ? `Terkini: ${aktif.unit}` : "Belum didisposisi."}
                  </p>
                </div>

                <div className="border border-line bg-bg-soft p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Bell className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Tanggapan &amp; notifikasi
                  </h4>
                  <form
                    method="dialog"
                    onSubmit={(e) => {
                      e.preventDefault();
                      kirimTanggapan();
                    }}
                    className="mt-4"
                  >
                    <Bidang
                      id={`${uid}-tanggapan`}
                      label="Isi tanggapan"
                      petunjuk="Mengirim tanggapan otomatis menandai notifikasi pelapor sebagai terkirim (simulasi)."
                    >
                      <textarea
                        id={`${uid}-tanggapan`}
                        rows={3}
                        value={tanggapan}
                        onChange={(e) => setTanggapan(e.target.value)}
                        aria-describedby={`${uid}-tanggapan-petunjuk`}
                        placeholder="Tanggapan contoh dari petugas."
                        className={kelasInput}
                      />
                    </Bidang>
                    <button type="submit" className={`${kelasTombolUtama} mt-4`}>
                      Kirim tanggapan
                    </button>
                  </form>
                </div>
              </div>

              <div className="border border-line bg-bg-elev p-5 sm:p-6">
                <h4 className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
                  Riwayat {aktif.id}
                </h4>
                <ol className="mt-3 space-y-2">
                  {aktif.riwayat.map((r, i) => (
                    <li
                      key={`${r}-${i}`}
                      className="flex gap-3 text-sm text-ink-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="leading-[1.7]">{r}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </PanelTab>
      </section>
    </div>
  );
}
