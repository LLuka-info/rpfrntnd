import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 RoPlug. All rights reserved. </p>
      <p><a href="/terms">Termeni si conditii.</a> </p>
    </footer>
  );
}