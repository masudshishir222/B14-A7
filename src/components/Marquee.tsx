"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
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

const Marquee = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((response) => (response.ok ? response.json() : null))
      .then((responseData: unknown) => {
        const data = Array.isArray(responseData)
          ? responseData
          : typeof responseData === "object" && responseData !== null && "data" in responseData
            ? responseData.data
            : null;
        if (Array.isArray(data)) setProducts(data as Product[]);
      })
      .catch(() => setProducts(null));
  }, []);

  if (!products) return null;

  return (
    <div className="group flex overflow-hidden bg-[#F8F9FA] border-y border-slate-200 py-3">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex min-w-full shrink-0 items-center"
          >
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-2 border-r border-slate-300 px-6 text-[15px] font-medium text-slate-800 whitespace-nowrap">
                <span className="text-lg">{product.image}</span>
                <span>{product.nameBn} {bengaliNumberFormatter.format(product.today)} টাকা/{product.unit}</span>
                {product.change.dir !== "flat" && (
                  <span className={`flex items-center gap-1 font-bold ${
                    product.change.dir === 'up' ? 'text-[#DC3545]' : 'text-[#28A745]'
                  }`}>
                    {product.change.dir === 'up' ? '▲' : '▼'} {bengaliNumberFormatter.format(product.change.pct)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
