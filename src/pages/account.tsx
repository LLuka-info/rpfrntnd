import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Account.module.css";

interface Order {
  _id: string;
  createdAt: string;
  total: number;
  status: string;
  items: { name: string; quantity: number; price: number }[];
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
      fetchOrders(JSON.parse(userData)._id);
    }
  }, [router]);

  const fetchOrders = async (userId: string) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?userId=${userId}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className={styles.account}>
      <h2>Contul Meu</h2>
      {user && (
        <div className={styles.userInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <h3>Order History</h3>
      <div className={styles.orders}>
        {orders.map((order) => (
          <div key={order._id} className={styles.order}>
            <p>Order ID: {order._id}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
            <div className={styles.orderItems}>
              {order.items.map((item) => (
                <div key={item.name} className={styles.orderItem}>
                  <p>{item.name} (x{item.quantity})</p>
                  <p>${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}