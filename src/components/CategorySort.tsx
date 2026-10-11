"use client";

import { usePathname, useRouter } from "next/navigation";

type CategorySortProps = {
  value: "default" | "price-asc" | "price-desc";
};

export default function CategorySort({ value }: CategorySortProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (sort: CategorySortProps["value"]) => {
    const query = sort === "default" ? "" : `?sort=${sort}`;
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  return (
    <label className="flex items-center gap-2">
      <span>সাজান</span>
      <select
        aria-label="পণ্যের তালিকা সাজান"
        value={value}
        onChange={(event) => {
          const sort = event.currentTarget.value;
          if (
            sort === "default" ||
            sort === "price-asc" ||
            sort === "price-desc"
          ) {
            handleChange(sort);
          }
        }}
        className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-slate-700 outline-none focus:border-[#008940]"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}
