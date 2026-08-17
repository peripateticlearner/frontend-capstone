import styles from "../module/Signup.module.css";

function About() {
  return (
    <div style={{
      maxWidth: "650px",
      margin: "2rem auto",
      padding: "2rem",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h2>About Atlas Taxi</h2>

      <p style={{ lineHeight: 1.6 }}>
        Atlas Taxi is a ride-booking platform demo built as a full-stack
        capstone project. It showcases a complete rider and admin
        experience — account signup and login, booking a ride, tracking
        ride status, and an admin dashboard for managing rides and
        registered users — backed by a REST API with JWT-based
        authentication.
      </p>

      <p style={{ lineHeight: 1.6 }}>
        This site is for anyone exploring the developer's portfolio work:
        recruiters, potential clients, or other developers looking at how
        the app is built. It isn't a real taxi service — there are no
        actual drivers, dispatch, or rides taking place.
      </p>

      <div className={styles.demoBox}>
        <p className={styles.demoLabel}>LIVE DEMO — SYNTHETIC DATA ONLY</p>
        <p className={styles.demoText} style={{ marginBottom: 0 }}>
          Everything you see and create here — accounts, rides, and users —
          is test data. Please don't enter real personal information; any
          non-demo data may be periodically removed.
        </p>
      </div>
    </div>
  );
}

export default About;
