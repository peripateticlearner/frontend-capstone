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
                <td style={{ ...cell, color: getStatusColor(ride.status), fontWeight: "bold" }}>
                  {ride.status}
                </td>
                <td style={cell}>
                    <button
                      onClick={() => toggleStatus(ride._id, ride.status)}
                      style={{
                        padding: "0.4rem 0.75rem",
                        backgroundColor: getStatusButtonColor(ride.status),
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "0.5rem",
                      }}
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

// Function to determine the next status text for the button
const getStatusButtonText = (status) => {
  if (status === "Scheduled") {
    return "Start Ride";
  } else if (status === "In Progress") {
    return "Complete Ride";
  } else if (status === "Completed") {
    return "Undo";
  } else {
    return "Unknown";
  }
};

// Function to determine button color based on status
const getStatusButtonColor = (status) => {
  if (status === "Scheduled") {
    return "#DAA520"; // Goldenrod
  } else if (status === "In Progress") {
    return "#blue";
  } else if (status === "Completed") {
    return "#red";
  } else {
    return "#000";
  }
};

// Function to determine status colors in the table
const getStatusColor = (status) => {
  if (status === "Scheduled") {
    return "#DAA520"; // Goldenrod
  } else if (status === "In Progress") {
    return "#blue";
  } else if (status === "Completed") {
    return "#green";
  } else {
    return "#000";
  }
};

// Shared cell style
const cell = {
  padding: "0.75rem",
  border: "1px solid #ddd",
  textAlign: "left",
};

export default AdminDashboard;
