"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

type Provider = "google" | "github";
type SocialAuthButtonsProps = { mode: "signin" | "signup" };

export default function SocialAuthButtons({ mode }: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);
  const action = mode === "signin" ? "সাইন ইন" : "সাইন আপ";

  async function handleSocialAuth(provider: Provider) {
    setLoadingProvider(provider);
    try {
      window.sessionStorage.setItem("pending-social-auth", provider);
      const callbackURL = new URLSearchParams(window.location.search).get("callbackURL");
      const result = await authClient.signIn.social({
        provider,
        callbackURL: callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
          ? callbackURL
          : "/",
      });

      if (result.error) {
        window.sessionStorage.removeItem("pending-social-auth");
        toast.error(
          result.error.status >= 500
            ? "Authentication database is unreachable. Check the MongoDB Atlas connection."
            : result.error.message || `${provider} দিয়ে ${action} করা যায়নি`,
        );
      }
    } catch (error) {
      window.sessionStorage.removeItem("pending-social-auth");
      toast.error(error instanceof Error ? error.message : `${provider} দিয়ে ${action} করা যায়নি`);
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => handleSocialAuth("google")}
        disabled={loadingProvider !== null}
        className="flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e1e9e2] px-2 text-[13px] font-medium transition hover:bg-[#f3f7f3] disabled:cursor-wait disabled:opacity-60"
      >
        <FcGoogle aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
        {loadingProvider === "google" ? "Google খুলছে…" : "Google দিয়ে চালিয়ে যান"}
      </button>
      <button
        type="button"
        onClick={() => handleSocialAuth("github")}
        disabled={loadingProvider !== null}
        className="flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e1e9e2] px-2 text-[13px] font-medium transition hover:bg-[#f3f7f3] disabled:cursor-wait disabled:opacity-60"
      >
        <FaGithub aria-hidden="true" className="h-4 w-4 shrink-0" />
        {loadingProvider === "github" ? "GitHub খুলছে…" : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
}
