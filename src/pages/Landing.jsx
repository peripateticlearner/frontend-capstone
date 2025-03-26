import { Link } from "react-router-dom";

function Landing() {
  return (
    <div style={{
      textAlign: "center",
      padding: "4rem",
      backgroundColor: "#f8f9fa"
    }}>
      <h1>Atlas Taxi Service</h1>
      <p>Reliable and professional taxi service for your transportation needs.</p>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/signup">
          <button style={{ marginRight: "1rem" }}>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
