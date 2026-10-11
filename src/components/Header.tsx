import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import logoIcon from "@/assets/logo-icon.png";
import CurrentDate from "./CurrentDate";
import Navlinks from "./Navlinks";
import AuthLinks from "./AuthLinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="বাজার দর - হোম পেজ"
          className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008940]"
        >
          <div className="flex h-12 w-12 p-1.5">
            <Image
              src={logoIcon}
              alt=""
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-slate-900">বাজার দর</p>
            <CurrentDate />
          </div>
        </Link>

        <AuthLinks />
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="py-2 text-sm text-slate-500">Loading...</div>}>
            <Navlinks />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
