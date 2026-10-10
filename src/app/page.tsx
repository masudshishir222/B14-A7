import { Suspense } from "react";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <div>
      <Suspense fallback={null}>
        <Marquee />
      </Suspense>

      <h1 className="text-3xl font-bold text-slate-900 pb-100">Welcome</h1>
    </div>
  );
}
