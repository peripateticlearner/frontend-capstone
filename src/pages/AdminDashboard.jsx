import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/rides");
        setRides(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch rides.");
      }
    };

    fetchRides();
  }, []);

  // PATCH status to "Completed"
  const markCompleted = async (rideId) => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/rides/${rideId}`, {
        status: "Completed"
      });

      // Refresh the ride list
      setRides((prev) =>
        prev.map((ride) =>
          ride._id === rideId ? { ...ride, status: "Completed" } : ride
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>Admin Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {rides.length === 0 ? (
        <p>No rides booked yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <thead style={{ backgroundColor: "#001F3F", color: "#fff" }}>
            <tr>
              <th style={cell}>Pickup</th>
              <th style={cell}>Dropoff</th>
              <th style={cell}>Scheduled Time</th>
              <th style={cell}>Contact</th>
              <th style={cell}>Status</th>
              <th style={cell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride._id} style={{ backgroundColor: "#f9f9f9" }}>
                <td style={cell}>{ride.pickupLocation}</td>
                <td style={cell}>{ride.dropoffLocation}</td>
                <td style={cell}>{new Date(ride.scheduledTime).toLocaleString()}</td>
                <td style={cell}>{ride.contactInfo}</td>
                <td style={{ ...cell, color: ride.status === "Completed" ? "green" : "#DAA520", fontWeight: "bold" }}>
                  {ride.status}
                </td>
                <td style={cell}>
                  {ride.status !== "Completed" && (
                    <button
                      onClick={() => markCompleted(ride._id)}
                      style={{
                        padding: "0.4rem 0.75rem",
                        backgroundColor: "#DAA520",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Mark as Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Shared cell style
const cell = {
  padding: "0.75rem",
  border: "1px solid #ddd",
  textAlign: "left",
};

export default AdminDashboard;
