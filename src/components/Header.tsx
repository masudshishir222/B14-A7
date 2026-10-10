import { Suspense } from "react";
import Image from "next/image";
import logoIcon from "@/assets/logo-icon.png";
import CurrentDate from "./CurrentDate";
import Navlinks from "./Navlinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 p-1.5">
            <Image
              src={logoIcon}
              alt="বাজার দর লোগো"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-slate-900">বাজার দর</p>
            <CurrentDate />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-sm font-bold text-slate-800 transition hover:text-[#008940]">
            সাইন ইন
          </button>
          <button className="rounded-lg bg-[#008940] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800">
            সাইন আপ
          </button>
        </div>
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