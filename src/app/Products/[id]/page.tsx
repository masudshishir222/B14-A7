import { Suspense } from "react";
import SingleAllPpage from "./SingleAllPpage";

async function CategoryPageContent({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const [{ id }, { sort }] = await Promise.all([params, searchParams]);
  const sortBy =
    sort === "price-asc" || sort === "price-desc" ? sort : "default";

  return <SingleAllPpage categoryId={id} sortBy={sortBy} />;
}

export default function CategoryProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <CategoryPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
