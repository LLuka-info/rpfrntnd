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

  // Outline-style SVG Icons (stroke only)
  const homeIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  );

  const clothesIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.5 7.5L12 2L3.5 7.5L5 18H19L20.5 7.5Z"/>
      <path d="M12 22V12"/>
      <path d="M8 12H16"/>
    </svg>
  );

  const cartIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="21" r="1"/>
      <circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05H4L6.7 15.95a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  );

  const userIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
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
