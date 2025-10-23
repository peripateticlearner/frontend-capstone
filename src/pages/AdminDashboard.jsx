import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../module/AdminDashboard.module.css";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminDashboard() {
  const [rides, setRides] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Not authenticated. Please login.");
      return;
    }

    // Fetch all rides from backend
    const fetchRides = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/rides`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRides(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch rides.");
      }
    };

    // Fetch all users from backend
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user`);
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users.");
      }
    };

    fetchRides();
    fetchUsers();
  }, [token]);

  const getStatusButtonText = (status) => {
    switch (status) {
      case "Scheduled":
        return "Start Ride";
      case "In Progress":
        return "Complete Ride";
      case "Completed":
        return "Reset to Scheduled";
      default:
        return "Update Status";
    }
  };

  const toggleStatus = async (rideId, currentStatus) => {
    let newStatus;

    if (currentStatus === "Scheduled") newStatus = "In Progress";
    else if (currentStatus === "In Progress") newStatus = "Completed";
    else if (currentStatus === "Completed") newStatus = "Scheduled";
    else return;

    const confirmAction = window.confirm(
      `Are you sure you want to mark this ride as ${newStatus}?`
    );
    if (!confirmAction) return;

    try {
      await axios.patch(
        `${BASE_URL}/api/rides/${rideId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRides((prev) =>
        prev.map((ride) =>
          ride._id === rideId ? { ...ride, status: newStatus } : ride
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update ride status.");
    }
  };

  const handleDelete = async (rideId) => {
    if (!window.confirm("Are you sure you want to delete this ride?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/rides/${rideId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRides((prev) => prev.filter((ride) => ride._id !== rideId));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete ride.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>Admin Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Rides Section */}
      <h3>Rides</h3>
      {rides.length === 0 ? (
        <p>No rides booked yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ backgroundColor: "#001F3F", color: "#fff" }}>
            <tr>
              <th className={styles.cell}>Pickup</th>
              <th className={styles.cell}>Dropoff</th>
              <th className={styles.cell}>Scheduled Time</th>
              <th className={styles.cell}>Contact</th>
              <th className={styles.cell}>Status</th>
              <th className={styles.cell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride._id} style={{ backgroundColor: "#f9f9f9" }}>
                <td className={styles.cell}>{ride.pickupLocation}</td>
                <td className={styles.cell}>{ride.dropoffLocation}</td>
                <td className={styles.cell}>
                  {new Date(ride.scheduledTime).toLocaleString()}
                </td>
                <td className={styles.cell}>{ride.contactInfo}</td>
                <td className={styles.cell}>{ride.status}</td>
                <td className={styles.cell}>
                  <button
                    className={`${styles.button} ${styles[`button${ride.status.replace(" ", "")}`]}`}
                    onClick={() => toggleStatus(ride._id, ride.status)}
                  >
                    {getStatusButtonText(ride.status)}
                  </button>
                  <button
                    style={{
                      marginLeft: "0.5rem",
                      backgroundColor: "crimson",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px"
                    }}
                    onClick={() => handleDelete(ride._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Users Section */}
      <h3>Users</h3>
      {users.length === 0 ? (
        <p>No users registered yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ backgroundColor: "#001F3F", color: "#fff" }}>
            <tr>
              <th className={styles.cell}>Name</th>
              <th className={styles.cell}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ backgroundColor: "#f9f9f9" }}>
                <td className={styles.cell}>{user.firstName} {user.lastName}</td>
                <td className={styles.cell}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;