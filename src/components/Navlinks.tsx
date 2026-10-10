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
        <button
          key={category.id}
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700"
        >
          {category.icon} {category.nameBn}
        </button>
      ))}
    </div>
  );
};

export default Navlinks;