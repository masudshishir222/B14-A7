import { Suspense } from "react";
import AllProducts from "@/components/Homepage/AllProducts";

export default function ProductsPage() {
  return (
    <main className="py-6">
      <Suspense fallback={null}>
        <AllProducts />
      </Suspense>
    </main>
  );
}
