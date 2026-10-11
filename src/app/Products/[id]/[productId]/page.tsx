import { Suspense } from "react";
import SingleProductAllDetails from "../singleProductAllD";

async function ProductPageContent({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const { id, productId } = await params;

  return <SingleProductAllDetails categoryId={id} productId={productId} />;
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}
