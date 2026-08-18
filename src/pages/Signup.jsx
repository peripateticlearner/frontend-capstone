import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import styles from "../module/Signup.module.css";

function Signup() {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // State to hold error or success message
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Frontend validation
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      return setError("Please fill in all fields.");
  }

  try {
      // Send a POST request to the server
      const response = await axios.post("/api/auth/user-register", formData);

      // Save the user ID locally for later use
      localStorage.setItem("userId", response.data._id);

      // Show a success message
      setError("Signup successful!");

      // Redirect the user to the book page
      setTimeout(() => {
          navigate("/book");
      }, 1000);

  } catch (error) {
      console.error(error);
      // Show an error message
      if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message); // Extract message from server response
      } else {
          setError("Signup failed. Please try again.");
      }
  }
};

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>

      <div className={styles.demoBox}>
        <p className={styles.demoLabel}>JUST EXPLORING?</p>
        <p className={styles.demoText}>
          No need to sign up. The{" "}
          <Link to="/login" style={{ color: "#007bff", fontWeight: "bold", textDecoration: "underline" }}>
            Login page
          </Link>{" "}
          has a one-click demo rider account ready to go.
        </p>
      </div>

      {/* Signup form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }}>
        <label>First Name</label>
        <input
          className={styles.input}
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.firstName}
          required
        />
        <label>Last Name</label>
        <input
          className={styles.input}
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastName}
          required
        />

        <label>Email</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <label>Password</label>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <button type="submit" className={styles.button}>
          Create Account
        </button>
      </form>

      {/* Show feedback message */}
      {error && (
        <p className={`${styles.message} ${error.includes("successful") ? styles.messageSuccess : styles.messageError}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Signup;