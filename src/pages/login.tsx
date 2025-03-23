import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, [router]);
 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      email,
      password
    }, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      router.replace("/"); // ✅ use replace to avoid login -> back navigation
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed");
  }
};

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Login</h2>
        <form onSubmit={handleLogin}>
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
          <p>Nu ai cont? <a href="/register">Inregistreaza-te</a></p>
          <button
            type="submit"
            className={styles.loginButton}
            
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
