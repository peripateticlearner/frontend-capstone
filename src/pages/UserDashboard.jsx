import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

function UserDashboard() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const firstName = localStorage.getItem("userFirstName");

  useEffect(() => {
    const fetchUserRides = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Please log in to view your rides.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/rides", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Ensure rides is always an array
        const ridesData = response.data;
        
        if (Array.isArray(ridesData)) {
          setRides(ridesData);
        } else if (ridesData && Array.isArray(ridesData.rides)) {
          setRides(ridesData.rides);
        } else {
          console.error('Unexpected rides data format:', ridesData);
          setRides([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rides:", err);
        setError("Failed to fetch your rides.");
        setLoading(false);
      }
    };

    fetchUserRides();
  }, []);

  const handleCancel = async (rideId) => {
    if (!window.confirm("Cancel this ride?")) return;

    const token = localStorage.getItem("token");
    setCancellingId(rideId);

    try {
      const response = await axios.delete(`/api/rides/${rideId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setRides((prev) =>
        prev.map((ride) => (ride._id === rideId ? response.data.ride : ride))
      );
    } catch (err) {
      console.error("Error cancelling ride:", err);
      setError("Failed to cancel the ride. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading your rides...</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", padding: "2rem" }}>
      <h1>Welcome, {firstName || "User"}!</h1>
      <p>View your booked rides below:</p>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {rides.length === 0 ? (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p>You haven't booked any rides yet.</p>
          <a href="/book" style={{ color: "#007bff", textDecoration: "underline" }}>
            Book your first ride
          </a>
        </div>
      ) : (
        <div style={{ marginTop: "2rem", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "#001F3F", color: "#fff" }}>
            <tr>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                Pickup Location
              </th>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                Dropoff Location
              </th>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                Scheduled Time
              </th>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                Contact Info
              </th>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                Status
              </th>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(rides) && rides.map((ride) => (
              <tr key={ride._id} style={{ backgroundColor: "#f9f9f9" }}>
                <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                  {ride.pickupLocation}
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                  {ride.dropoffLocation}
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                  {new Date(ride.scheduledTime).toLocaleString()}
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                  {ride.contactInfo}
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      backgroundColor:
                        ride.status === "Scheduled"
                          ? "#FFF3CD"
                          : ride.status === "In Progress"
                          ? "#CCE5FF"
                          : ride.status === "Completed"
                          ? "#D4EDDA"
                          : ride.status === "Cancelled"
                          ? "#E2E3E5"
                          : "#F8D7DA",
                      color:
                        ride.status === "Scheduled"
                          ? "#856404"
                          : ride.status === "In Progress"
                          ? "#004085"
                          : ride.status === "Completed"
                          ? "#155724"
                          : ride.status === "Cancelled"
                          ? "#383d41"
                          : "#721C24",
                      fontWeight: "bold",
                    }}
                  >
                    {ride.status}
                  </span>
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                  {ride.status === "Scheduled" && (
                    <button
                      onClick={() => handleCancel(ride._id)}
                      disabled={cancellingId === ride._id}
                      style={{
                        padding: "0.4rem 0.8rem",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        cursor: cancellingId === ride._id ? "not-allowed" : "pointer",
                        opacity: cancellingId === ride._id ? 0.6 : 1,
                      }}
                    >
                      {cancellingId === ride._id ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      </div>
    </div>
  );
}

export default UserDashboard;