"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Myprofile from "@/components/Myprofile";

export default function AuthLinks() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const onSignInPage = pathname === "/signin";
  const onSignUpPage = pathname === "/signup";

  useEffect(() => {
    if (isPending || !session) return;

    const provider = window.sessionStorage.getItem("pending-social-auth");
    if (provider === "google" || provider === "github") {
      window.sessionStorage.removeItem("pending-social-auth");
      toast.success(`সফলভাবে ${provider === "google" ? "Google" : "GitHub"}-এ সাইন ইন হয়েছে`);
    }
  }, [isPending, session]);

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      const result = await authClient.signOut();
      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি");
        return;
      }
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "সাইন আউট করা যায়নি");
    } finally {
      setIsSigningOut(false);
    }
  }

  if (!isPending && session) {
    return (
      <Myprofile
        name={session.user.name}
        email={session.user.email}
        image={session.user.image}
        onSignOut={handleSignOut}
        isSigningOut={isSigningOut}
      />
    );
  }

  return (
    <nav aria-label="Authentication" className="flex items-center gap-2 sm:gap-4">
      <Link
        href="/signin"
        prefetch={false}
        aria-current={onSignInPage ? "page" : undefined}
        className={`rounded-lg px-3 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008940] active:scale-95 sm:px-4 ${
          onSignInPage
            ? "bg-[#008940] text-white shadow-sm hover:bg-emerald-800 active:bg-emerald-900"
            : "bg-white text-slate-800 hover:bg-[#eef7f0] hover:text-[#008940] active:bg-[#dcefe1]"
        }`}
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        prefetch={false}
        aria-current={onSignUpPage ? "page" : undefined}
        className={`rounded-lg px-3 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008940] active:scale-95 sm:px-4 ${
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
