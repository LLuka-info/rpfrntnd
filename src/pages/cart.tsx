import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Cart.module.css";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  images: { url: string; label: string }[];
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const removeFromCart = (productId: string, size?: string) => {
    const updatedCart = cartItems.filter(
      (item) => !(item._id === productId && item.selectedSize === size)
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const goToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className={styles.cart}>
      <h2 className={styles.cartTitle}>Cos</h2>
      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>
          Cosul tau este gol... A venit timpul sa il umplem :D
        </p>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className={styles.cartItem}
              onClick={() => router.push(`/products/${item._id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.images[0]?.url}
                alt={item.images[0]?.label || item.name}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemInfo}>
                <h3 className={styles.cartItemName}>{item.name}</h3>
                <p className={styles.cartItemPrice}>{item.price} RON</p>

                {item.selectedSize && (
                  <p className={styles.cartItemMeta}>Size: {item.selectedSize}</p>
                )}
                {item.images[0]?.label && (
                  <p className={styles.cartItemMeta}>Model: {item.images[0].label}</p>
                )}

                <div
                  className={styles.quantityControl}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(item._id, item.selectedSize);
                  }}
                  className={styles.removeButton}
                >
                  Remove
                </button>

              </div>
            </div>
          ))}
          <div className={styles.cartTotal}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className={styles.checkoutButton} onClick={goToCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
