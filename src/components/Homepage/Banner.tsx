import Image from "next/image";
import Link from "next/link";
import bazarHero from "@/assets/bazar-hero.png";
import CurrentDate from "@/components/CurrentDate";

const Banner = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse items-center justify-between rounded-3xl border border-slate-100 bg-[#F8F9FA] p-6 shadow-sm sm:p-8 md:flex-row md:p-12 lg:p-16">
        <div className="mt-8 flex w-full flex-col items-start md:mt-0 md:w-1/2">
          <CurrentDate className="mb-4 inline-block rounded-full bg-[#E6F4EA] px-4 py-1.5 text-sm font-semibold text-[#008940]" />

          <h1 className="mb-8 text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <Link
            href="/Products"
            className="rounded-lg bg-[#008940] px-6 py-2.5 font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008940]"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="flex w-full justify-center md:w-1/2 md:justify-end">
          <Image
            src={bazarHero}
            alt="বাজারের ফলের ঝুড়ি"
            priority
            className="h-auto w-48 object-contain sm:w-56 md:w-64 lg:w-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;