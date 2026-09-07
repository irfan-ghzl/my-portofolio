import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { identity } from "@/data/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${identity.name} — ${identity.headline}`,
  description: identity.tagline,
  authors: [{ name: identity.name, url: identity.github }],
  openGraph: {
    title: `${identity.name} — ${identity.headline}`,
    description: identity.tagline,
    type: "profile",
    locale: "id_ID",
  },
};

/**
 * Skrip kecil yang berjalan sebelum paint untuk menerapkan tema tersimpan,
 * sehingga tidak ada kedipan warna saat halaman dimuat. Default: gelap.
 *
 * Sekalian memasang kelas `js` pada <html>. Kelas itu dipakai halaman prototipe
 * untuk mendeteksi ketiadaan JavaScript lewat CSS (`html:not(.js)`) dan
 * menampilkan seluruh panel tab sekaligus alih-alih menyembunyikan sebagian.
 */
const themeScript = `
(function () {
  document.documentElement.classList.add("js");
  try {
    var stored = localStorage.getItem("tema");
    if (stored === "terang") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`dark h-full ${inter.variable} ${jetbrainsMono.variable}`}
      // Skrip pra-paint di bawah sengaja mengubah daftar kelas <html> sebelum
      // React hidrasi (menerapkan tema tersimpan + memasang kelas `js`), jadi
      // markup server memang beda dari DOM klien. Ini menyenyapkan peringatan
      // ketidakcocokan atribut pada elemen <html> saja — bukan turunannya.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg text-ink-2 min-h-full font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
