import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/ProductDetails.module.css";

interface ProductImage {
  url: string;
  label: string;
}

interface Product {
  cnfansurl: string;
  _id: string;
  name: string;
  price: number;
  description: string;
  images: ProductImage[];
  sizes: string[];
  colors: string[];
}

interface ProductDetailsProps {
  productId: string;
}
const shoeSizeMapping = [
  { eu: "37", us: "5" },
  { eu: "37.5", us: "5.5" },
  { eu: "38", us: "6" },
  { eu: "38.5", us: "6.5" },
  { eu: "39", us: "7" },
  { eu: "39.5", us: "7.5" },
  { eu: "40", us: "8" },
  { eu: "40.5", us: "8.5" },
  { eu: "41", us: "9" },
  { eu: "41.5", us: "9.5" },
  { eu: "42", us: "10" },
  { eu: "42.5", us: "10.5" },
  { eu: "43", us: "11" },
  { eu: "43.5", us: "11.5" },
  { eu: "44", us: "12" },
];

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (productId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((error) => {
          setError("Error fetching product details.");
          console.error("Error fetching product details:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productId]);

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    if (product) {
      const selectedImage = product.images[selectedImageIndex];

      const cartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        images: [selectedImage],
        selectedSize,
        selectedColor,
        cnfansurl: product.cnfansurl, // ✅ Fix: include it here!
        quantity: 1,
      };

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
    }
  };

  const handleNextImage = () => {
    if (product) {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  };

  const handlePrevImage = () => {
    if (product) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  const selectedImage = product.images[selectedImageIndex];

  return (
    <div className={styles.productDetails}>
      <div className={styles.productImageContainer}>
        <button onClick={handlePrevImage} className={styles.navButton}>{"<"}</button>
        <img
          src={selectedImage.url}
          alt={selectedImage.label}
          className={styles.productImage}
        />
        <button onClick={handleNextImage} className={styles.navButton}>{">"}</button>
      </div>

      <div className={styles.thumbnailContainer}>
        {product.images.map((image, index) => (
          <div key={index} className={styles.thumbnailWrapper}>
            <img
              src={image.url}
              alt={image.label}
              className={`${styles.thumbnail} ${index === selectedImageIndex ? styles.activeThumbnail : ""}`}
              onClick={() => setSelectedImageIndex(index)}
            />
            <p className={styles.thumbnailLabel}>{image.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.productInfo}>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productPrice}>{product.price} RON</p>
        <p className={styles.productDescription}>{product.description}</p>

        
        <div className={styles.sizeColorSelection}>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            required
          >
            <option value="">Select Size</option>
            {product.category === "incaltaminte"
              ? shoeSizeMapping.map(({ eu, us }) => (
                  <option key={eu} value={eu}>
                    {eu} (US {us})
                  </option>
                ))
              : product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
          </select>
        </div>

        <button onClick={addToCart} className={styles.addToCartButton}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
