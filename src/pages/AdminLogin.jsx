import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import styles from "../module/AdminLogin.module.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
      <form onSubmit={handleSubmit}>
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
      {message && (
        <p className={`${styles.message} ${message.includes("success") ? styles.messageSuccess : styles.messageError}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AdminLogin;