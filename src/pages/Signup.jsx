import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Dynamically use the environment variable

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
      const response = await axios.post(`${BASE_URL}/api/user`, formData);

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
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h2>Sign Up</h2>

      {/* Signup form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>Username</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.firstName}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastName}
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