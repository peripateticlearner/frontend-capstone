import { useState } from "react";
import axios from "axios";

function BookRide() {
  // Store ride form values
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    scheduledTime: "",
    contactInfo: ""
  });

  const [message, setMessage] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit ride to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      return setMessage("User not found. Please sign up first.");
    }

    try {
      const res = await axios.post("http://localhost:4000/api/rides", {
        ...formData,
        user_id: userId // Connect ride to user
      });

      setMessage("Ride booked successfully!");
      setFormData({
        pickupLocation: "",
        dropoffLocation: "",
        scheduledTime: "",
        contactInfo: ""
      });
    } catch (err) {
      console.error(err);
      setMessage("Failed to book ride. Please try again.");
    }
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "2rem auto",
      padding: "2rem",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ marginBottom: "1rem" }}>Book a Ride</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dropoffLocation"
          placeholder="Dropoff Location"
          value={formData.dropoffLocation}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="scheduledTime"
          value={formData.scheduledTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Phone or Email"
          value={formData.contactInfo}
          onChange={handleChange}
          required
        />
        <button type="submit">Confirm Ride</button>
      </form>

      {/* Show success or error message */}
      {message && (
        <p style={{
          marginTop: "1rem",
          color: message.includes("success") ? "green" : "red"
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default BookRide;
