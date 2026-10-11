import { Suspense } from "react";
import Marquee from "@/components/Marquee";
import Banner from "@/components/Homepage/Banner";
import TodaysHighPrice from "@/components/Homepage/TodaysHighPrice";
import TodaysLowPrice from "@/components/Homepage/TodaysLowPrice";
import AllProducts from "@/components/Homepage/AllProducts";

export default function Home() {
  return (
    <div>
      <Suspense fallback={null}>
        <Marquee />
      </Suspense>
      <div>
        <Banner />
      </div>

      <Suspense fallback={null}>
        <TodaysHighPrice />
      </Suspense>

      <Suspense fallback={null}>
        <TodaysLowPrice />
      </Suspense>

      <Suspense fallback={null}>
        <AllProducts />
      </Suspense>
    </div>

  );
}
