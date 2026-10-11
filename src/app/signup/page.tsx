"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import SocialAuthButtons from "@/components/SocialAuthButtons";

export default function SignupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }
    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        toast.error(
          result.error.status >= 500
            ? "Authentication database is unreachable. Check the MongoDB Atlas connection."
            : result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি",
        );
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে");
      const callbackURL = new URLSearchParams(window.location.search).get("callbackURL");
      const destination = callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
        ? callbackURL
        : "/";
      router.replace(destination);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "অ্যাকাউন্ট তৈরি করা যায়নি");
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <form className="space-y-2.5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="mb-0.5 block text-xs font-medium">
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
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
                required
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
                minLength={6}
                required
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
                minLength={6}
                required
                placeholder="আবার লিখুন"
                className="h-[34px] w-full rounded-md border border-[#e1e9e2] bg-transparent px-2 text-xs outline-none transition focus:border-[#008940] focus:ring-2 focus:ring-[#008940]/15"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="h-[34px] w-full rounded-md bg-[#078b42] text-xs font-semibold text-white shadow-[0_2px_3px_#0003] transition hover:bg-[#06783a] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078b42] disabled:cursor-wait disabled:opacity-70"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          <div className="my-2.5 flex items-center gap-3 text-[11px] text-[#59635c]">
            <span className="h-px flex-1 bg-[#e1e7e2]" />
            অথবা
            <span className="h-px flex-1 bg-[#e1e7e2]" />
          </div>

          <SocialAuthButtons mode="signup" />

          <p className="mt-2 text-center text-xs">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" prefetch={false} className="font-medium text-[#078b42] hover:underline">
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
