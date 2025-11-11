import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cross Insurance",
  description:
    "Correduría moderna que ofrece seguros de autos, vida, propiedad y comerciales con una plataforma CRM integral.",
  icons: {
    icon: '/logos/cross insurance logo gold textured.png',
  },
  openGraph: {
    title: "Cross Insurance",
    description:
      "Correduría moderna que ofrece seguros de autos, vida, propiedad y comerciales con una plataforma CRM integral.",
    url: "https://www.crossinsurance.com",
    locale: "es_PR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.crossinsurance.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
