import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  cart: any[];
}

export default function Layout({ children, cart }: LayoutProps) {
  return (
    <div className="layout">
      <Navbar cart={cart} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}