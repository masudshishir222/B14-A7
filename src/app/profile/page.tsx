"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (session?.user.name) setName(session.user.name);
  }, [session?.user.name]);

  useEffect(() => {
    if (!isPending && !session) router.replace("/signin");
  }, [isPending, router, session]);

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedName = name.trim();
    if (!updatedName) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setIsSaving(true);
    try {
      const result = await authClient.updateUser({ name: updatedName });
      if (result.error) {
        toast.error(result.error.message || "তথ্য আপডেট করা যায়নি");
        return;
      }
      toast.success("প্রোফাইল আপডেট হয়েছে");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "তথ্য আপডেট করা যায়নি");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      const result = await authClient.signOut();
      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি");
        return;
      }
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "সাইন আউট করা যায়নি");
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="min-h-[60vh] bg-[#eef4ee] px-4 py-12" aria-busy="true">
        <div className="mx-auto h-48 max-w-3xl animate-pulse rounded-2xl bg-white/70" />
      </main>
    );
  }

  return (
    <main className="min-h-[65vh] bg-[#eef4ee] px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-[#1e2921]">আমার প্রোফাইল</h1>
          <p className="mt-1 text-sm text-slate-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </header>

        <section className="flex flex-col gap-4 rounded-2xl border border-[#dce7dd] bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eef2ee] text-slate-600">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt=""
                  fill
                  unoptimized
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <FaUser aria-hidden="true" size={24} />
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-slate-900">{session.user.name}</p>
              <p className="truncate text-sm text-slate-500">{session.user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="shrink-0 self-start rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60 sm:self-center"
          >
            {isSigningOut ? "সাইন আউট হচ্ছে…" : "↶ সাইন আউট"}
          </button>
        </section>

        <section className="mt-5 rounded-2xl border border-[#dce7dd] bg-white/80 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-slate-800">তথ্য</h2>
          <form onSubmit={handleUpdate} className="mt-6 space-y-3 px-0 sm:px-4">
            <label htmlFor="profile-name" className="block text-sm font-medium text-slate-800">
              নাম
            </label>
            <input
              id="profile-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-[#dce7dd] bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#008940] focus:ring-2 focus:ring-[#008940]/15"
            />
            <button
              type="submit"
              disabled={isSaving || !name.trim() || name.trim() === session.user.name}
              className="w-full rounded-lg bg-[#008940] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "আপডেট হচ্ছে…" : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
