import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Montserrat } from 'next/font/google'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Konfigurasi font Heading
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair", // Kita gunakan CSS Variable
});

// Konfigurasi font Body
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Cheers to 20th!❤️",
  description: "Digital gift for my GF",
};

// app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Tambahkan variabel font di sini agar bisa diakses CSS/Tailwind
      className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${playfair.variable} 
        ${montserrat.variable} 
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
