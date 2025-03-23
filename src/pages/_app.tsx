import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import { AppProps } from "next/app";
import AnnouncementBar from "@/components/AnnouncementBar";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cart);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && router.pathname !== "/login" && router.pathname !== "/register") {
    router.push("/login");
    return null;
  }

  return (
    <Elements stripe={stripePromise}>
      <Layout cart={cart}>
      <AnnouncementBar />
        <Component {...pageProps} />
      </Layout>
    </Elements>
    
  );
}
