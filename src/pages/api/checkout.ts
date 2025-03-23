import axios from "axios";
import { useEffect, useState } from "react";
interface CartItem {
    _id: string;
    name: string;
    price: number;
    images: string[];
    quantity: number;
  }
  
const [cartItems, setCartItems] = useState<CartItem[]>([]);

const handleCheckout = async () => {
  try {
    const response = await axios.post("/api/checkout", {
      items: cartItems, // Send cart data
    });

    console.log("Checkout successful:", response.data);
    alert("Checkout completed successfully!");
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Checkout failed. Please try again.");
  }
};
