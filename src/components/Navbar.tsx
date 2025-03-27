import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import Image from 'next/image';

interface NavbarProps {
  cart: any[];
}

export default function Navbar({ cart }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
          <Link href="/">
          <Image
            src="/logogog.png" 
            alt="RoPlug"
            width={499} // Set appropriate width
            height={284} // Set appropriate height
            className={styles.logo}
          />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>       
        <li>
          <Link href="/cart">Cart ({cart.length})</Link>
        </li>
        <li>
          <Link href="/account">Account</Link>
        </li>
        
      </ul>
    </nav>
  );
}
