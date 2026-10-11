"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: MarketPrice[];
};

const numberFormatter = new Intl.NumberFormat("bn-BD");
const unitNames: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) return false;
  const product = value as Record<string, unknown>;
  if (
    typeof product.change !== "object" ||
    product.change === null ||
    !Array.isArray(product.markets)
  ) {
    return false;
  }

  const change = product.change as Record<string, unknown>;
  const markets = product.markets;

  return (
    typeof product.id === "number" &&
    typeof product.slug === "string" &&
    typeof product.nameBn === "string" &&
    typeof product.category === "string" &&
    typeof product.categoryNameBn === "string" &&
    typeof product.categoryIcon === "string" &&
    typeof product.unit === "string" &&
    typeof product.image === "string" &&
    typeof product.today === "number" &&
    typeof product.yesterday === "number" &&
    typeof product.lastWeek === "number" &&
    typeof product.lastMonth === "number" &&
    (change.dir === "up" || change.dir === "down" || change.dir === "flat") &&
    typeof change.pct === "number" &&
    markets.every(
      (market: unknown) =>
        typeof market === "object" &&
        market !== null &&
        "market" in market &&
        typeof market.market === "string" &&
        "division" in market &&
        typeof market.division === "string" &&
        "min" in market &&
        typeof market.min === "number" &&
        "max" in market &&
        typeof market.max === "number",
    )
  );
}

function getProductData(value: unknown): unknown {
  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value
  ) {
    return value.data;
  }
  return value;
}

function SingleProductAllDetails({
  categoryId,
  productId,
}: {
  categoryId: string;
  productId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    if (isPending || session || !pathname) return;
    router.replace(`/signin?callbackURL=${encodeURIComponent(pathname)}`);
  }, [isPending, pathname, router, session]);

  useEffect(() => {
    if (isPending || !session || !/^\d+$/.test(productId)) return;
    let cancelled = false;
    fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productId}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((responseData: unknown) => {
        const data = getProductData(responseData);
        if (!cancelled && isProduct(data)) setProductData(data);
      })
      .catch(() => {
        if (!cancelled) setProductData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [isPending, productId, session]);

  if (isPending || !session || !productData) return null;
  if (
    productData.id !== Number(productId) ||
    productData.category !== categoryId
  ) return null;

  const priceChangeColor =
    productData.change.dir === "up"
      ? "text-red-600"
      : productData.change.dir === "down"
        ? "text-[#169B62]"
        : "text-slate-600";
  const priceChangeArrow =
    productData.change.dir === "up"
      ? "▲"
      : productData.change.dir === "down"
        ? "▼"
        : "—";

  const lowestMarket = productData.markets.reduce<MarketPrice | null>(
    (lowest, market) =>
      lowest === null || market.min < lowest.min ? market : lowest,
    null,
  );
  const highestMarket = productData.markets.reduce<MarketPrice | null>(
    (highest, market) =>
      highest === null || market.max > highest.max ? market : highest,
    null,
  );
  const priceSummaries = [
    {
      label: "সর্বনিম্ন দাম",
      price: lowestMarket?.min ?? productData.today,
      detail: lowestMarket
        ? `${lowestMarket.market} বাজারে সর্বনিম্ন`
        : "বাজারের তথ্য পাওয়া যায়নি",
      color: "text-[#169B62]",
    },
    {
      label: "সর্বোচ্চ দাম",
      price: highestMarket?.max ?? productData.today,
      detail: highestMarket
        ? `${highestMarket.market} বাজারে সর্বোচ্চ`
        : "বাজারের তথ্য পাওয়া যায়নি",
      color: "text-red-600",
    },
    {
      label: "আজকের দাম",
      price: productData.today,
      detail: `প্রতি ${unitNames[productData.unit] ?? productData.unit} হিসাবে`,
      color: "text-slate-800",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-600"
      >
        <Link href="/" className="hover:text-[#008940]">
          হোম
        </Link>
        <span aria-hidden="true">›</span>
        <Link
          href={`/Products/${productData.category}`}
          className="hover:text-[#008940]"
        >
          {productData.categoryNameBn}
        </Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{productData.nameBn}</span>
      </nav>

      <section className="mb-4 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-[#F8F9FA] p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF3EE] text-2xl"
          >
            {productData.image}
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {productData.nameBn}
            </h1>
            <p className="text-sm text-slate-500">
              প্রতি {unitNames[productData.unit] ?? productData.unit} ·{" "}
              {productData.categoryNameBn}
            </p>
            <p className="text-sm text-slate-700">
              গতকালের তুলনায় দাম{" "}
              {productData.change.dir === "up"
                ? "বেড়েছে"
                : productData.change.dir === "down"
                  ? "কমেছে"
                  : "অপরিবর্তিত"}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#EEF3EE] px-4 py-3 sm:min-w-28 sm:text-center">
          <p className="text-xs text-slate-500">আজকের দাম</p>
          <p className="text-xl font-bold text-slate-800">
            {numberFormatter.format(productData.today)}
          </p>
          <p className="text-sm text-slate-600">
            টাকা / {unitNames[productData.unit] ?? productData.unit}
          </p>
          <p className={`text-xs font-semibold ${priceChangeColor}`}>
            {priceChangeArrow}{" "}
            {productData.change.dir !== "flat" &&
              `${numberFormatter.format(Math.abs(productData.change.pct))}%`}
          </p>
        </div>
      </section>

      <section className="mb-4 rounded-2xl border border-slate-200 bg-[#F8F9FA] p-4 sm:p-5">
        <h2 className="mb-3 font-bold text-slate-800">দামের সাম্প্রতিক তথ্য</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {priceSummaries.map(({ label, price, detail, color }) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <p className="text-sm text-slate-500">{label}</p>
              <p className={`mt-1 font-bold ${color}`}>
                {numberFormatter.format(price)} টাকা
              </p>
              <p className="text-xs text-slate-500">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-[#F8F9FA] p-4 sm:p-5">
        <h2 className="mb-3 font-bold text-slate-800">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-170 border-collapse text-left text-sm">
            <thead className="bg-white text-slate-600">
              <tr>
                <th scope="col" className="px-3 py-3 font-semibold sm:px-4">
                  বাজার
                </th>
                <th scope="col" className="px-3 py-3 font-semibold sm:px-4">
                  বিভাগ
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold sm:px-4">
                  সর্বনিম্ন
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold sm:px-4">
                  সর্বোচ্চ
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold sm:px-4">
                  গড়
                </th>
              </tr>
            </thead>
            <tbody>
              {productData.markets.map((market, index) => (
                <tr
                  key={`${market.market}-${market.division}`}
                  className={`border-t border-slate-200 ${
                    index % 2 === 0 ? "bg-[#F8F9FA]" : "bg-[#EEF3EE]"
                  }`}
                >
                  <td className="px-3 py-3 text-slate-800 sm:px-4">
                    {market.market}
                  </td>
                  <td className="px-3 py-3 text-slate-600 sm:px-4">
                    {market.division}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-800 sm:px-4">
                    {numberFormatter.format(market.min)} টাকা
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-slate-800 sm:px-4">
                    {numberFormatter.format(market.max)} টাকা
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-slate-800 sm:px-4">
                    {numberFormatter.format((market.min + market.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default SingleProductAllDetails;
