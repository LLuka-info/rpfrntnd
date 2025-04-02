import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Products.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: { url: string; label: string }[];
  popular?: boolean;
  createdAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const router = useRouter();
  const { category: categoryQuery, popular } = router.query;

  // Category mapping with display names
  const categories = [
    { value: "", label: "Toate" },
    { value: "tricouri", label: "Tricouri" },
    { value: "pantaloni", label: "Pantaloni" },
    { value: "hanorace", label: "Hanorace" },
    { value: "geci", label: "Geci" },
    { value: "shorts", label: "Bluze" },
    { value: "incaltaminte", label: "Încălțăminte" }
  ];

  // Sorting options
  const sortOptions = [
    { value: "default", label: "Recomandate" },
    { value: "price-asc", label: "Preț (Mic → Mare)" },
    { value: "price-desc", label: "Preț (Mare → Mic)" },
    { value: "newest", label: "Cele mai noi" },
   // { value: "popular", label: "Populare" }
  ];

  useEffect(() => {
    if (categoryQuery) setCategory(categoryQuery as string);
  }, [categoryQuery]);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, category]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`, {
        params: { 
          search: searchQuery, 
          category: category || undefined,
          popular: popular === "true" ? true : undefined
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const sortProducts = () => {
    let sorted = [...products];
    
    switch(sortOption) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());
        break;
      case "popular":
        sorted.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      default:
        // Default sorting (recommended/whatever your backend returns)
        break;
    }

    return sorted.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (category === "" || product.category.toLowerCase() === category.toLowerCase()) &&
        (popular !== "true" || product.popular === true)
    );
  };

  const filteredProducts = sortProducts();

  // Get current category name for title
  const currentCategory = categories.find(c => c.value === category)?.label || "Produse";

  return (
    <div className={styles.products}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          {currentCategory === "Toate" ? "Explorează toate produsele!" : `Explorează ${currentCategory.toLowerCase()}`}
        </h2>

        {/* Search and Filter Row */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Caută..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />

          {/* Sorting Dropdown */}
          <div className={styles.sortDropdown}>
            <button 
              className={styles.sortToggle}
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            >
              <span>{sortOptions.find(opt => opt.value === sortOption)?.label || "Sortare"}</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className={`${styles.dropdownIcon} ${sortDropdownOpen ? styles.rotate : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            
            {sortDropdownOpen && (
              <div className={styles.sortDropdownMenu}>
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`${styles.sortDropdownItem} ${sortOption === option.value ? styles.active : ''}`}
                    onClick={() => {
                      setSortOption(option.value);
                      setSortDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className={styles.productCard}
              >
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.label || product.name}
                  className={styles.productImage}
                />
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>{product.price} RON</p>
              </Link>
            ))
          ) : (
            <p className={styles.noProducts}>Nu s-au găsit produse.</p>
          )}
        </div>
      </div>
    </div>
  );
}
