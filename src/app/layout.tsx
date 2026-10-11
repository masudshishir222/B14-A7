import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "B14 A7 Bazar",
  description: "Market price information for essentials in Bengali.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className="h-full antialiased"
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-[#E1E8E1] text-black"
      >
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
