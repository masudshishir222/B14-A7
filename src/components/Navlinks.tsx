import Link from "next/link";

type Category = {
  id: string;
  nameBn: string;
  icon: string;
};

const categories: Category[] = [
  { id: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

const Navlinks = () => {
  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {categories.map((category) => (
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