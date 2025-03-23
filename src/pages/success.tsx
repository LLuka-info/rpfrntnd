// pages/success.tsx
import Link from "next/link";
import styles from "@/styles/Success.module.css";

export default function SuccessPage() {
  return (
    <div className={styles.successContainer}>
      <h1 className={styles.title}>✅ Plată efectuată cu succes!</h1>
      <p className={styles.message}>Comanda ta a fost plasată. Vei primi un email de confirmare în curând.</p>
      <Link href="/products" className={styles.backButton}>
        Înapoi la produse
      </Link>
    </div>
  );
}
