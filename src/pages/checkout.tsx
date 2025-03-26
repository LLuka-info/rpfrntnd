import { useState, useEffect } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "@/styles/Checkout.module.css";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  cnfansurl?: string;
  images?: { url: string; label: string }[];
}
export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "RO",
    postalCode: "",
    paymentMethod: "credit_card",
  });
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const createPaymentIntent = async () => {
    if (!formData.fullName || !formData.email || !formData.address || !formData.postalCode || !formData.phone) {
      setMessage("Please fill in all required fields.");
      return;
    }
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
        cart,
        customer: formData,
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      setMessage("Failed to create payment. Please try again.");
    }
  };
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet.");
      return;
    }
    if (!clientSecret) {
      setMessage("Client secret not found. Please generate payment first.");
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: {
            line1: formData.address,
            city: formData.city,
            country: formData.country,
            postal_code: formData.postalCode,
          },
        },
      },
      shipping: {
        name: formData.fullName,
        address: {
          line1: formData.address,
          city: formData.city,
          country: formData.country,
          postal_code: formData.postalCode,
        },
        phone: formData.phone,
      },
    });
    if (result.error) {
      setMessage(result.error.message || "Payment failed.");
    } else if (result.paymentIntent?.status === "succeeded") {
      localStorage.removeItem("cart");
      setCart([]);
      setMessage("✅ Payment successful! Your order has been placed.");
      await axios.post("/api/send-discord", {
        cart,
        customer: formData,
        totalAmount: totalPrice,
      });  
      localStorage.removeItem("cart");
      setCart([]);
      window.location.href = "/success"; // ✅ Redirect after payment
    }
    setIsProcessing(false);
  };
  return (
    <div className={styles.checkoutContainer}>
      <h1>Checkout</h1>
      <div className={styles.orderSummary}>
        <h2 className={styles.orderSummaryText}>Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className={styles.orderItem}>
              <span>{item.name} (x{item.quantity})</span>
              <span>{(item.price * item.quantity).toFixed(2)} RON</span>
            </div>
          ))
        )}
        <h3>Total: {totalPrice.toFixed(2)} RON</h3>
      </div>
      <div className={styles.formGroup}>
        <h2 className={styles.shippingText}>Shipping Details</h2>
        <input className={styles.inputT} type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} required />
        <input className={styles.inputT} type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
        <input className={styles.inputT} type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} required />
        <input className={styles.inputT} type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
        <input className={styles.inputT} type="text" name="city" placeholder="City" onChange={handleInputChange} required />
        <input className={styles.inputT} type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} required />
        <input
          className={styles.inputT}
          type="text"
          name="postalCode"
          placeholder="Cod Poștal (6 cifre)"
          onChange={handleInputChange}
          pattern="\d{6}"
          maxLength={6}
          required
        />
      </div>
      {clientSecret && (
        <div className={styles.cardElementContainer}>
          <CardElement />
        </div>
      )}
      {!clientSecret ? (
        <button onClick={createPaymentIntent} className={styles.checkoutButton} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Generate Payment"}
        </button>
      ) : (
        <button onClick={handleCheckout} className={styles.checkoutButton} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      )}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
