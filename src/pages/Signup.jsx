import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
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
    try {
      // Send a POST request to the server
      const response = await axios.post("http://localhost:4000/api/user", formData);

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
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h2>Sign Up</h2>

      {/* Signup form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <button type="submit" style={{ marginTop: "1rem" }}>
          Create Account
        </button>
      </form>

      {/* Show feedback message */}
      {error && (
        <p style={{ color: error.includes("successful") ? "green" : "red", marginTop: "1rem" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Signup;