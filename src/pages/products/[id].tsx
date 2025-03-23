// pages/products/[id].tsx
import { useRouter } from "next/router";
import ProductDetails from "../../components/ProductDetails";  // Adjust the path if necessary

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;  // Get the `id` from the URL

  if (!id) {
    return <div>Loading...</div>;  // Show loading while waiting for `id`
  }

  return <ProductDetails productId={id as string} />;  // Pass the `id` as prop to ProductDetails component
}
