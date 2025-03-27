import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import Image from 'next/image';

interface NavbarProps {
  cart: any[];
}

export default function Navbar({ cart }: NavbarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [username, setUsername] = useState("Cont");

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // SVG Icons
  const homeIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
    </svg>
  );

  const clothesIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M21.6 18.2L13 11.75v-.91a3 3 0 00-.75-2A3 3 0 0016 5a3 3 0 00-3-3 3 3 0 00-3 3c0 .84.3 1.6.75 2.19l-.04.03-7.31 6.47c-.62.58-1 1.41-1 2.31V20a2 2 0 002 2h16a2 2 0 002-2v-1.5c0-.9-.38-1.73-1-2.3z" fill="currentColor"/>
    </svg>
  );

  const cartIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
    </svg>
  );

  const userIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
    </svg>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logogog.png" 
            alt="RoPlug"
            width={120}
            height={40}
            style={{ objectFit: 'contain' }}
          />
        </Link>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link href="/" className={styles.navLink}>
            {homeIcon}
            {!isMobile && 'Acasă'}
          </Link>
        </li>
        <li>
          <Link href="/products" className={styles.navLink}>
            {clothesIcon}
            {!isMobile && 'Haine'}
          </Link>
        </li>       
        <li>
          <Link href="/cart" className={styles.navLink}>
            {cartIcon}
            {!isMobile && (
              <>
                Coș <span className={styles.cartCount}>({cart.length})</span>
              </>
            )}
          </Link>
        </li>
        <li>
          <Link href="/account" className={styles.navLink}>
            {userIcon}
            {!isMobile && username}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
