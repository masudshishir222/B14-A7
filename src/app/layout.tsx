import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-sans",
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "B14 A7 Bazar",
  description: "Market price information for essentials in Bengali.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${hindSiliguri.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="bg-[#E1E8E1] text-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
