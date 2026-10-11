import Link from "next/link";

type Category = {
  id: string;
  nameBn: string;
  icon: string;
};

const Navlinks = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
  const data = (await res.json()) as Category[];

  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {data.map((category) => (
        <Link
          key={category.id}
          href={`/Products/${category.id}`}
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 transition-colors hover:border-[#008940] hover:bg-[#008940] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008940]"
        >
          {category.icon} {category.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default Navlinks;