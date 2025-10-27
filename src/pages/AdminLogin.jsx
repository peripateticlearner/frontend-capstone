import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import styles from "../module/AdminLogin.module.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Check if user was redirected due to session expiration
  useEffect(() => {
    if (localStorage.getItem('sessionExpired')) {
      setMessage('Your session expired. Please log in again.');
      localStorage.removeItem('sessionExpired');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please fill in all fields.");
      return;
    }

    await login(`${BASE_URL}/api/auth/admin-login`, formData, setMessage, navigate, "admin");
  };

  return (
    <div className={styles.container}>
      <h2>Admin Login</h2>
      
      {message && (
        <p className={`${styles.message} ${
          message.includes("success") 
            ? styles.messageSuccess 
            : message.includes("expired") 
              ? styles.messageWarning 
              : styles.messageError
        }`}>
          {message}
        </p>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;