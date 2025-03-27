import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../module/Signup.module.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed.");
        return;
      }

      localStorage.setItem("userId", data._id);
      localStorage.setItem("isAdmin", "false");
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
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
        <p style={{ color: message.includes("success") ? "green" : "red", marginTop: "1rem" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;