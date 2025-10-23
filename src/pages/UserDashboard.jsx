import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserDashboard() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserRides = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Please log in to view your rides.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/rides`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setRides(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rides:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Session expired. Please log in again.");
        } else {
          setError("Failed to fetch your rides.");
        }
        setLoading(false);
      }
    };

    fetchUserRides();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading your rides...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Welcome to Your Dashboard</h1>
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
        <table
          style={{
            width: "100%",
            marginTop: "2rem",
            borderCollapse: "collapse",
            background: "#fff",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
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
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
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
                          : "#F8D7DA",
                      color:
                        ride.status === "Scheduled"
                          ? "#856404"
                          : ride.status === "In Progress"
                          ? "#004085"
                          : ride.status === "Completed"
                          ? "#155724"
                          : "#721C24",
                      fontWeight: "bold",
                    }}
                  >
                    {ride.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserDashboard;