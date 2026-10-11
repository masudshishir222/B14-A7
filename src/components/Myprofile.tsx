"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";

type MyprofileProps = {
  name: string;
  email: string;
  image?: string | null;
  onSignOut: () => void;
  isSigningOut: boolean;
};

export default function Myprofile({
  name,
  email,
  image,
  onSignOut,
  isSigningOut,
}: MyprofileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Open account menu"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 rounded-full p-1 pr-2 text-slate-800 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008940]"
      >
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eef2ee] text-slate-600">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              unoptimized
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <FaUser aria-hidden="true" size={17} />
          )}
        </span>
        <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">
          {name.split(" ")[0]}
        </span>
        <span aria-hidden="true" className="text-xs text-slate-500">
          ▾
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-30 mt-3 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-[#dce7dd] bg-white p-6 shadow-xl"
        >
          <p className="truncate text-lg font-semibold text-slate-900">{name}</p>
          <p className="mt-1 truncate text-sm text-slate-500">{email}</p>
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="mt-4 flex items-center gap-2 rounded-lg py-2 font-medium text-slate-800 transition hover:bg-slate-50"
          >
            <FaUser aria-hidden="true" className="text-slate-500" />
            আমার প্রোফাইল
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onSignOut();
            }}
            disabled={isSigningOut}
            className="mt-5 w-full rounded-lg py-2 text-left font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60 cursor-pointer pl-3"
          >
            {isSigningOut ? "সাইন আউট হচ্ছে…" : "সাইন আউট"}
          </button>
        </div>
      )}
    </div>
  );
}
