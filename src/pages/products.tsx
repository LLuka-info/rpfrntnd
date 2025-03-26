import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Products.module.css";
import Link from "next/link";
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: { url: string; label: string }[];
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  useEffect(() => {
    fetchProducts();
  }, [searchQuery, category]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`, {
        params: { search: searchQuery, category},
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) && product.category.toLowerCase().includes(category.toLowerCase())
  );

  return (
    <div className={styles.products}>
      <div className={styles.content}>
        <h2 className={styles.title}>Exploreaza produsele!</h2>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Cauta."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <select onChange={(e) => setCategory(e.target.value)} className={styles.categorySelect}>
          <option value="">Toate</option>
          <option value="tricouri">Tricouri</option>
          <option value="pantaloni">Pantaloni</option>
          <option value="hanorace">Hanorace</option>
          <option value="geci">Geci</option>
          <option value="bluze">Bluze</option>
          <option value="incaltaminte">Încălțăminte</option>
        </select>
        </div>
        

        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div key={product._id} className={styles.productCard}>
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.label || product.name}
                  className={styles.productImage}
                />

              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>{product.price} RON</p>
              <Link href={`/products/${product._id}`} className={styles.productButton}>
                Detalii
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
