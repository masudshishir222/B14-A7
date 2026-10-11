"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import SocialAuthButtons from "@/components/SocialAuthButtons";

export default function SigninPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      const result = await authClient.signIn.email({
        email: String(formData.get("email") ?? "").trim(),
        password: String(formData.get("password") ?? ""),
      });

      if (result.error) {
        toast.error(
          result.error.status >= 500
            ? "Authentication database is unreachable. Check the MongoDB Atlas connection."
            : result.error.message || "সাইন ইন করা যায়নি",
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");
      const callbackURL = new URLSearchParams(window.location.search).get("callbackURL");
      const destination = callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
        ? callbackURL
        : "/";
      router.replace(destination);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "সাইন ইন করা যায়নি");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#f0f5f0] px-4 py-10 text-[#202b24]">
      <div className="w-full max-w-97.5">
        <header className="mb-5 text-center">
          <h1 className="text-2xl font-bold leading-tight">সাইন ইন</h1>
          <p className="mt-1 text-sm text-[#77817a]">
            বাজারের দর, বাজার জুড়ে ওয়াকফুড দেখতে অ্যাকাউন্টে ঢুকুন
          </p>
        </header>

        <section className="rounded-[14px] border border-[#e0e9e1] bg-[#fbfdfb] p-5 shadow-sm">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
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
                required
                placeholder="কমপক্ষে ৬ অক্ষর"
                className="h-9 w-full rounded-lg border border-[#e1e9e2] bg-transparent px-2.5 text-sm outline-none transition focus:border-[#008940] focus:ring-2 focus:ring-[#008940]/15"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-8.5 w-full rounded-md bg-[#078b42] text-sm font-semibold text-white shadow-[0_2px_3px_#0003] transition hover:bg-[#06783a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078b42] cursor-pointer"
            >
              সাইন ইন
            </button>
          </form>

          <div className="my-3 flex items-center gap-3 text-xs text-[#59635c]">
            <span className="h-px flex-1 bg-[#e1e7e2]" />
            অথবা
            <span className="h-px flex-1 bg-[#e1e7e2]" />
          </div>

          <SocialAuthButtons mode="signin" />

          <p className="mt-3 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" prefetch={false} className="font-medium text-[#078b42] hover:underline">
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
