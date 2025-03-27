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

  // Improved SVG Icons
  const homeIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
    </svg>
  );

  const clothesIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M19.5 6c-1.3 0-2.5.9-2.5 2.2V13h-2V8.2C15 6.9 13.8 6 12.5 6S10 6.9 10 8.2V13H8V8.2C8 6.9 6.8 6 5.5 6S3 6.9 3 8.2V20h18V8.2C21 6.9 19.8 6 18.5 6z" fill="currentColor"/>
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
            <span className={styles.icon}>{homeIcon}</span>
            {!isMobile && <span className={styles.linkText}>Acasă</span>}
          </Link>
        </li>
        <li>
          <Link href="/products" className={styles.navLink}>
            <span className={styles.icon}>{clothesIcon}</span>
            {!isMobile && <span className={styles.linkText}>Haine</span>}
          </Link>
        </li>       
        <li>
          <Link href="/cart" className={styles.navLink}>
            <span className={styles.icon}>{cartIcon}</span>
            {!isMobile && (
              <span className={styles.linkText}>
                Coș <span className={styles.cartCount}>({cart.length})</span>
              </span>
            )}
            {isMobile && cart.length > 0 && (
              <span className={styles.mobileCartCount}>{cart.length}</span>
            )}
          </Link>
        </li>
        <li>
          <Link href="/account" className={styles.navLink}>
            <span className={styles.icon}>{userIcon}</span>
            {!isMobile && <span className={styles.linkText}>{username}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
