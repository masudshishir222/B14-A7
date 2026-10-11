import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SigninPage() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#f0f5f0] px-4 py-10 text-[#202b24]">
      <div className="w-full max-w-[390px]">
        <header className="mb-5 text-center">
          <h1 className="text-2xl font-bold leading-tight">সাইন ইন</h1>
          <p className="mt-1 text-sm text-[#77817a]">
            বাজারের দর, বাজার জুড়ে ওয়াকফুড দেখতে অ্যাকাউন্টে ঢুকুন
          </p>
        </header>

        <section className="rounded-[14px] border border-[#e0e9e1] bg-[#fbfdfb] p-5 shadow-sm">
          <form className="space-y-3">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-9 w-full rounded-lg border border-[#e1e9e2] bg-transparent px-2.5 text-sm outline-none transition focus:border-[#008940] focus:ring-2 focus:ring-[#008940]/15"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="কমপক্ষে ৬ অক্ষর"
                className="h-9 w-full rounded-lg border border-[#e1e9e2] bg-transparent px-2.5 text-sm outline-none transition focus:border-[#008940] focus:ring-2 focus:ring-[#008940]/15"
              />
            </div>
            <button
              type="submit"
              className="h-[34px] w-full rounded-md bg-[#078b42] text-sm font-semibold text-white shadow-[0_2px_3px_#0003] transition hover:bg-[#06783a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078b42]"
            >
              সাইন ইন
            </button>
          </form>

          <div className="my-3 flex items-center gap-3 text-xs text-[#59635c]">
            <span className="h-px flex-1 bg-[#e1e7e2]" />
            অথবা
            <span className="h-px flex-1 bg-[#e1e7e2]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" className="flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e1e9e2] px-2 text-[13px] font-medium hover:bg-[#f3f7f3]">
              <FcGoogle aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              Google দিয়ে চালিয়ে যান
            </button>
            <button type="button" className="flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e1e9e2] px-2 text-[13px] font-medium hover:bg-[#f3f7f3]">
              <FaGithub aria-hidden="true" className="h-4 w-4 shrink-0" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-3 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-medium text-[#078b42] hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        <Link href="/" className="mt-4 block text-center text-sm text-[#89928b] hover:text-[#078b42]">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
