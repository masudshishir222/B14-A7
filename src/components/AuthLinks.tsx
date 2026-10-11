"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLinks() {
  const pathname = usePathname();
  const onSignInPage = pathname === "/signin";
  const onSignUpPage = pathname === "/signup";

  return (
    <nav aria-label="Authentication" className="flex items-center gap-3 sm:gap-6">
      <Link
        href="/signin"
        aria-current={onSignInPage ? "page" : undefined}
        className={`rounded-lg px-4 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008940] active:scale-95 ${
          onSignInPage
            ? "bg-[#008940] text-white shadow-sm hover:bg-emerald-800 active:bg-emerald-900"
            : "text-slate-800 hover:bg-[#eef7f0] hover:text-[#008940] active:bg-[#dcefe1]"
        }`}
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        aria-current={pathname === "/signup" ? "page" : undefined}
        className={`rounded-lg px-4 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008940] active:scale-95 sm:px-5 ${
          onSignUpPage
            ? "bg-[#008940] text-white shadow-sm hover:bg-emerald-800 active:bg-emerald-900"
            : "bg-white text-slate-800 hover:bg-[#eef7f0] hover:text-[#008940] active:bg-[#dcefe1]"
        }`}
      >
        সাইন আপ
      </Link>
    </nav>
  );
}
