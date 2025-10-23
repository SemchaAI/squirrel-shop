import { ProductList } from "@/components/widgets/lists/ProductList";
import { getNewArrivals } from "@/utils/api/getHomePage";

export async function NewArrivalsSection() {
  const products = await getNewArrivals();
  return (
    <div className="wrapper">
      <ProductList products={products} title="New Arrivals" />
    </div>
  );
}
