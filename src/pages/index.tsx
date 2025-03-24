import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import barstyles from "@/styles/AnnouncementBar.module.css";
interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

export default function HomePage() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const desktopImages = ["/mainPagebg1.png", "/mainPagebg2.png"];
  const mobileImages = ["/mainPageMobile1.png", "/mainPageMobile2.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = isMobile ? mobileImages : desktopImages;
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => setPopularProducts(res.data))
      .catch((error) => console.error("Error fetching popular products:", error));
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages]);

  const currentHeroStyle = {
    backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
  };

  const isDarkHero = currentImageIndex === 1;

  return (
    <div className={styles.home}>
      <section
        className={`${styles.hero} ${isDarkHero ? styles.heroDarkText : ""}`}
        style={currentHeroStyle}
      >
        <h1 className={styles.heroTitle}>RoPlug</h1>
        <p className={styles.heroSubtitle}>Produse disponibile pe website</p>
        <p className={styles.number}>{popularProducts.length}</p>
        <Link href="/products" className={styles.heroButton}>
          Descoperă Haine
        </Link>
      </section>

      <section className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>Despre noi</h2>
        <div className={styles.aboutCard}>
          <div className={`${styles.aboutText} ${isExpanded ? styles.expanded : ""}`}>
            <p>
              🧾 <strong>Termeni și Condiții – RoPlug</strong><br />
              <strong>Notă Legală:</strong> Acest site nu este afiliat cu Facebook sau cu entitățile sale.<br />
              Conținutul prezentat este responsabilitatea RoPlug© și a furnizorilor noștri.<br /><br />
              <strong>Confidențialitate:</strong> Toate datele sunt colectate pentru a vă oferi o experiență plăcută. Ne angajăm să le protejăm conform legii 67/98.<br />
              {isExpanded && (
                <>
                  <br />
                  Putem colecta: nume, email, telefon, adresă, etc.<br />
                  Prin folosirea platformei, sunteți de acord cu termenii. Aceștia pot fi modificați fără notificare.<br /><br />
                  <strong>Retururi și Rambursări:</strong> Comenzile sunt finale. Asigurați-vă că știți ce cumpărați.<br /><br />
                  <strong>Publicitate & Cookies:</strong> Folosim cookie-uri pentru îmbunătățirea experienței și reclame personalizate.<br /><br />
                  <strong>Link-uri externe:</strong> Nu ne asumăm responsabilitatea pentru site-urile linkate din platformă.
                </>
              )}
            </p>
            {!isExpanded && <div className={styles.fade}></div>}
          </div>
          <button onClick={() => setIsExpanded(!isExpanded)} className={styles.readMoreBtn}>
            {isExpanded ? "Ascunde" : "Citește mai mult"}
          </button>
        </div>
      </section>
    </div>
  );
}
