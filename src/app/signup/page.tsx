import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#f0f5f0] px-4 py-8 text-[#202b24]">
      <div className="w-full max-w-[390px]">
        <header className="mb-4 text-center">
          <h1 className="text-xl font-bold leading-tight">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="mt-1 text-xs text-[#77817a]">
            বিনা খরচে সাথে লগ ইন করে সব বাজারের দামের দেখুন
          </p>
        </header>

        <section className="rounded-xl border border-[#e0e9e1] bg-[#fbfdfb] p-3.5 shadow-sm sm:p-4">
          <form className="space-y-2.5">
            <div>
              <label htmlFor="name" className="mb-0.5 block text-xs font-medium">
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="উদাহরণ: রহিম উদ্দিন"
                className="h-[34px] w-full rounded-md border border-[#e1e9e2] bg-transparent px-2 text-xs outline-none transition focus:border-[#008940] focus:ring-2 focus:ring-[#008940]/15"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-0.5 block text-xs font-medium">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-[34px] w-full rounded-md border border-[#e1e9e2] bg-transparent px-2 text-xs outline-none transition focus:border-[#008940] focus:ring-2 focus:ring-[#008940]/15"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-0.5 block text-xs font-medium">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="কমপক্ষে ৬ অক্ষর"
                className="h-[34px] w-full rounded-md border border-[#e1e9e2] bg-transparent px-2 text-xs outline-none transition focus:border-[#008940] focus:ring-2 focus:ring-[#008940]/15"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="mb-0.5 block text-xs font-medium">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="আবার লিখুন"
                className="h-[34px] w-full rounded-md border border-[#e1e9e2] bg-transparent px-2 text-xs outline-none transition focus:border-[#008940] focus:ring-2 focus:ring-[#008940]/15"
              />
            </div>
            <button
              type="submit"
              className="h-[34px] w-full rounded-md bg-[#078b42] text-xs font-semibold text-white shadow-[0_2px_3px_#0003] transition hover:bg-[#06783a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078b42]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          <div className="my-2.5 flex items-center gap-3 text-[11px] text-[#59635c]">
            <span className="h-px flex-1 bg-[#e1e7e2]" />
            অথবা
            <span className="h-px flex-1 bg-[#e1e7e2]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" className="flex h-[32px] items-center justify-center gap-1 whitespace-nowrap rounded-md border border-[#e1e9e2] px-1.5 text-[11px] font-medium hover:bg-[#f3f7f3]">
              <FcGoogle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              Google দিয়ে চালিয়ে যান
            </button>
            <button type="button" className="flex h-[32px] items-center justify-center gap-1 whitespace-nowrap rounded-md border border-[#e1e9e2] px-1.5 text-[11px] font-medium hover:bg-[#f3f7f3]">
              <FaGithub aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-2 text-center text-xs">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-medium text-[#078b42] hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </section>

        <Link href="/" className="mt-3 block text-center text-xs text-[#89928b] hover:text-[#078b42]">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
