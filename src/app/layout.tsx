import type { Metadata } from "next";
import "./globals.css";
import { identity } from "@/data/profile";

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
 */
const themeScript = `
(function () {
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
    <html lang="id" className="dark h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-white text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-300">
        {children}
      </body>
    </html>
  );
}
