import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../module/AdminDashboard.module.css"

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
  
  // Function to update ride status
  const toggleStatus = async (rideId, currentStatus) => {
    let newStatus;
    if (currentStatus === "Scheduled") {
      newStatus = "In Progress";
    } else if (currentStatus === "In Progress") {
      newStatus = "Completed";
    } else if (currentStatus === "Completed") {
      newStatus = "Scheduled"; // In case admin wants to undo
    } else {
      return;
    }

    // Confirm prompt before changing the status in the database
    const confirmAction = window.confirm(`Are you sure you want to mark this ride as ${newStatus}?`);
    if (!confirmAction) return; // if admin cancels, do nothing

    try {
      await axios.patch(`http://localhost:4000/api/rides/${rideId}`, { status: newStatus });

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
                <td className={styles.cell}>{new Date(ride.scheduledTime).toLocaleString()}</td>
                <td className={styles.cell}>{ride.contactInfo}</td>
                <td className={styles.cell}>{ride.status}</td>
                <td className={styles.cell}>
                  <button
                    className={`${styles.button} ${styles[`button${ride.status}`]}`}
                    onClick={() => toggleStatus(ride._id, ride.status)}
                  >
                    {getStatusButtonText(ride.status)}
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

export default AdminDashboard;
