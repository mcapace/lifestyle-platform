import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Sora, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
});

const sora = Sora({ 
  subsets: ["latin"],
  variable: "--font-sora",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Lifestyle Platform - Where Sophistication Meets Connection",
  description: "A verified community built on authenticity, privacy, and genuine human connection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} ${playfair.variable} ${inter.variable} ${cormorant.variable} ${sora.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

