import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Register.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, [router]);
  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, { username, email, password }, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Registration successful!");
      router.push("/login");
    } catch (error) {
      console.error("Register error:", error);
      alert("Registration failed");
    }
  };
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2 className={styles.registerTitle}>Register</h2>
        <form onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Parola</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}