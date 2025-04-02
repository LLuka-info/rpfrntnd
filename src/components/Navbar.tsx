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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
  const categories = [
    { name: "Toate", filter: "" },
   // { name: "Populare", filter: "popular" },
    { name: "Tricouri", filter: "tricouri" },
    { name: "Incaltaminte", filter: "incaltaminte" },
    { name: "Geci", filter: "geci" },
    { name: "Pantaloni", filter: "pantaloni" },
    { name: "Hanorace", filter: "hanorace" },
    { name: "Shorts", filter: "shorts" }
  ];

  const clothesIcon = (
    <svg 
      viewBox="100 0 440 512"  // Adjusted viewBox to focus on the t-shirt
      width="18" 
      height="18" 
      fill="none" 
      stroke="currentColor"  // Will inherit the text color
      strokeWidth="50"       // Thinner stroke for better proportions
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5 .8 21.5-7.2L638.3 118c4-7.9 .8-17.6-7.1-21.5z"/>
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
        <li 
          className={styles.dropdown} 
          onMouseEnter={() => setDropdownOpen(true)} 
          onMouseLeave={() => setDropdownOpen(false)}
          onClick={() => isMobile && setDropdownOpen(!dropdownOpen)}
        >
          <button className={styles.navLink}>
            <span className={styles.icon}>{clothesIcon}</span>
            {!isMobile && <span className={styles.linkText}>Produse</span>}
          </button>
          <ul className={`${styles.dropdownMenu} ${dropdownOpen ? styles.show : ''}`}>
            {categories.map((category) => (
              <li key={category.filter}>
                <Link 
                  href={`/products?category=${category.filter}`} 
                  className={styles.dropdownItem}
                  onClick={() => setDropdownOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
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
