"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  slug: string;
  category: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

const bengaliNumberFormatter = new Intl.NumberFormat("bn-BD");
const unitNames: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const isProduct = (value: unknown): value is Product => {
  if (typeof value !== "object" || value === null) return false;

  const product = value as Record<string, unknown>;
  if (typeof product.change !== "object" || product.change === null) {
    return false;
  }

  const change = product.change as Record<string, unknown>;
  return (
    typeof product.id === "number" &&
    typeof product.slug === "string" &&
    typeof product.category === "string" &&
    typeof product.nameBn === "string" &&
    typeof product.image === "string" &&
    typeof product.unit === "string" &&
    typeof product.today === "number" &&
    (change.dir === "up" || change.dir === "down" || change.dir === "flat") &&
    typeof change.pct === "number"
  );
};

function AllProducts() {
  const [productData, setProductData] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((response) => (response.ok ? response.json() : null))
      .then((responseData: unknown) => {
        const data = Array.isArray(responseData)
          ? responseData
          : typeof responseData === "object" && responseData !== null && "data" in responseData
            ? responseData.data
            : null;
        if (Array.isArray(data) && data.every(isProduct)) setProductData(data);
      })
      .catch(() => setProductData(null));
  }, []);

  if (!productData) return null;

  return (
    <section
      aria-labelledby="all-products-heading"
      className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8"
    >
      <h2
        id="all-products-heading"
        className="text-xl font-bold text-slate-800"
      >
        সব পণ্য
      </h2>
      <p className="mb-4 text-sm text-slate-500">
        বাজারের সকল পণ্যের আজকের দাম
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {productData.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";
          const directionLabel = isUp ? "▲" : isDown ? "▼" : "—";
          const directionColor = isUp
            ? "text-red-600"
            : isDown
              ? "text-[#169B62]"
              : "text-slate-600";

          return (
            <Link
              key={product.id}
              href={`/Products/${product.category}/${product.id}`}
              className="rounded-2xl border border-slate-200 bg-[#F8F9FA] p-3 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#C8E6D1] hover:shadow-md motion-reduce:transition-none sm:p-4"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF3EE] text-xl"
                >
                  {product.image}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-800">
                    {product.nameBn}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {unitNames[product.unit] ?? product.unit}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-slate-500">আজকের দাম</p>
                  <p className="font-bold text-slate-800">
                    {bengaliNumberFormatter.format(product.today)} টাকা
                  </p>
                </div>
                <span
                  className={`rounded-full bg-[#EEF3EE] px-2.5 py-1 text-xs font-semibold ${directionColor}`}
                  aria-label={
                    product.change.dir === "flat"
                      ? "দাম অপরিবর্তিত"
                      : `${isUp ? "দাম বেড়েছে" : "দাম কমেছে"} ${bengaliNumberFormatter.format(product.change.pct)} শতাংশ`
                  }
                >
                  {directionLabel}
                  {product.change.dir !== "flat" &&
                    ` ${bengaliNumberFormatter.format(product.change.pct)}%`}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default AllProducts;
