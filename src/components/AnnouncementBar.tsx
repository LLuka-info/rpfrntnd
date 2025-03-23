
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/AnnouncementBar.module.css";

export default function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements`)
      .then((res) => setAnnouncements(res.data.map((a: any) => a.message)))
      .catch((err) => console.error("Error fetching announcements:", err));
  }, []);

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee}>
        {announcements.map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </div>
    </div>
  );
}
