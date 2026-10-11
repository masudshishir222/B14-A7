import { notFound } from "next/navigation";
import Link from "next/link";
import CategorySort from "@/components/CategorySort";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

const numberFormatter = new Intl.NumberFormat("bn-BD");
const unitNames: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

function isCategory(value: unknown): value is Category {
  if (typeof value !== "object" || value === null) return false;
  const category = value as Record<string, unknown>;

  return (
    typeof category.id === "string" &&
    typeof category.slug === "string" &&
    typeof category.nameBn === "string" &&
    typeof category.icon === "string"
  );
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) return false;
  const product = value as Record<string, unknown>;
  if (typeof product.change !== "object" || product.change === null) {
    return false;
  }
  const change = product.change as Record<string, unknown>;

  return (
    typeof product.id === "number" &&
    typeof product.slug === "string" &&
    typeof product.nameBn === "string" &&
    typeof product.image === "string" &&
    typeof product.unit === "string" &&
    typeof product.today === "number" &&
    (change.dir === "up" || change.dir === "down" || change.dir === "flat") &&
    typeof change.pct === "number"
  );
}

function getArrayData(value: unknown): unknown {
  if (Array.isArray(value)) return value;
  if (typeof value === "object" && value !== null && "data" in value) {
    return value.data;
  }
  return null;
}

async function SingleAllPpage({
  categoryId,
  sortBy,
}: {
  categoryId: string;
  sortBy: "default" | "price-asc" | "price-desc";
}) {
  const [categoriesResponse, productsResponse] = await Promise.all([
    fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
      cache: "no-store",
    }),
    fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
      { cache: "no-store" },
    ),
  ]);

  if (!categoriesResponse.ok) {
    throw new Error(`Failed to fetch categories: ${categoriesResponse.status}`);
  }
  if (!productsResponse.ok) {
    throw new Error(`Failed to fetch products: ${productsResponse.status}`);
  }

  const categoriesData = getArrayData(await categoriesResponse.json());
  const productsData = getArrayData(await productsResponse.json());

  if (!Array.isArray(categoriesData) || !categoriesData.every(isCategory)) {
    throw new Error("Categories API returned an invalid response");
  }
  if (!Array.isArray(productsData) || !productsData.every(isProduct)) {
    throw new Error("Products API returned an invalid response");
  }

  const category = categoriesData.find(
    (item) => item.id === categoryId || item.slug === categoryId,
  );
  if (!category) notFound();

  const sortedProducts = [...productsData];
  if (sortBy === "price-asc") {
    sortedProducts.sort((first, second) => first.today - second.today);
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((first, second) => second.today - first.today);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="mb-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F8F9FA] p-4 sm:p-5">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF3EE] text-2xl"
        >
          {category.icon}
        </span>
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {category.nameBn}
          </h1>
          <p className="text-sm text-slate-500">
            {numberFormatter.format(productsData.length)}টি পণ্যের আজকের দাম ও
            পরিবর্তন
          </p>
        </div>
      </section>

      <div className="mb-2 flex min-h-11 items-center justify-between rounded-xl border border-slate-200 bg-[#F8F9FA] px-4 text-sm text-slate-600">
        <span>
          মোট {numberFormatter.format(productsData.length)}টি পণ্য দেখানো হচ্ছে
        </span>
        <label className="flex items-center gap-2">
          <span>সাজান</span>
          <CategorySort value={sortBy} />
        </label>
      </div>

      {productsData.length === 0 ? (
        <p className="py-8 text-center text-slate-600">
          এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";
            const direction = isUp ? "▲" : isDown ? "▼" : "—";
            const directionColor = isUp
              ? "text-red-600"
              : isDown
                ? "text-[#169B62]"
                : "text-slate-600";

            return (
              <Link
                key={product.id}
                href={`/Products/${category.id}/${product.id}`}
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
                    <h2 className="truncate font-semibold text-slate-800">
                      {product.nameBn}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {unitNames[product.unit] ?? product.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-slate-500">আজকের দাম</p>
                    <p className="font-bold text-slate-800">
                      {numberFormatter.format(product.today)} টাকা
                    </p>
                  </div>
                  <span
                    className={`rounded-full bg-[#EEF3EE] px-2.5 py-1 text-xs font-semibold ${directionColor}`}
                  >
                    {direction}
                    {product.change.dir !== "flat" &&
                      ` ${numberFormatter.format(product.change.pct)}%`}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default SingleAllPpage;