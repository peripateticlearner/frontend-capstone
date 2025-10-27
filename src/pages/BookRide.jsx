import { useState } from "react";
import axios from "../utils/axiosInstance";

function BookRide() {
    const [formData, setFormData] = useState({
        pickupLocation: "",
        dropoffLocation: "",
        scheduledTime: "",
        contactInfo: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.pickupLocation || !formData.dropoffLocation || !formData.scheduledTime || !formData.contactInfo) {
            return setMessage("Please fill in all fields.");
        }

        // Get the JWT token from localStorage
        const token = localStorage.getItem("token");
        
        if (!token) {
            return setMessage("You must be logged in to book a ride.");
        }

        try {
            // Send request with Authorization header
            const res = await axios.post(
                "/api/rides",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

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