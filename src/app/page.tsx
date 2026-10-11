import { Suspense } from "react";
import Marquee from "@/components/Marquee";
import Banner from "@/components/Homepage/Banner";

export default function Home() {
  return (
    <div>
      <Suspense fallback={null}>
        <Marquee />
      </Suspense>
      <div>
        <Banner />
      </div>
    </div>

  );
}
