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

  // Toggle ride status (mark as completed or undo)"
  const toggleStatus = async (rideId, currentStatus) => {
      const newStatus = currentStatus === "Completed" ? "Scheduled" : "Completed";
      
      // Confirm prompt before changing the status in the database
      const confirmAction = window.confirm(`Are you sure you want to mark this ride as ${newStatus.toLowerCase()}?`);
      if (!confirmAction) return; // if admin cancels, do nothing
      
      try {
        const res = await axios.patch(`http://localhost:4000/api/rides/${rideId}`, { status: newStatus });
        
        // Update the status in the UI
        setRides((prev) =>
          prev.map((ride) => (ride._id === rideId ? { ...ride, status: newStatus } : ride))
        );
      } catch (err) {
        console.error(err);
        setError("Failed to update ride status.");
      }
    };
    
  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>Admin Dashboard</h2>

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
                    <button
                      onClick={() => toggleStatus(ride._id, ride.status)}
                      style={{
                        padding: "0.4rem 0.75rem",
                        backgroundColor: ride.status === "Completed" ? "red" : "#DAA520",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    > {ride.status === "Completed" ? "Undo" : "Mark as Completed"}
                    </button>
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
