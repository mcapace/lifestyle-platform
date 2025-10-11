import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Sora } from "next/font/google";
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

export const metadata: Metadata = {
  title: "[Brand] - The Lifestyle. Elevated.",
  description: "A verified community where sophistication meets authentic connection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${cormorant.variable} ${sora.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

