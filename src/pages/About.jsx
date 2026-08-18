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
        Atlas Taxi is a ride-booking platform demo. It started as a
        full-stack capstone project and has grown since then, picking up
        production-style features like role-based auth and an admin
        dashboard along the way. As a rider you can sign up, log in, book
        a ride, and track its status. As an admin you can manage rides and
        see who's registered. It all runs on a REST API with JWT
        authentication.
      </p>

      <p style={{ lineHeight: 1.6 }}>
        This is meant for recruiters and other developers checking out
        how the app is built, not real taxi customers. It isn't an
        actual taxi service, so there's no dispatch, no drivers, and no
        real rides happening behind it.
      </p>

      <div className={styles.demoBox}>
        <p className={styles.demoLabel}>LIVE DEMO: SYNTHETIC DATA ONLY</p>
        <p className={styles.demoText} style={{ marginBottom: 0 }}>
          Everything here (accounts, rides, users) is test data. Please
          don't enter real personal information. We may periodically
          clear out anything that isn't part of the demo.
        </p>
      </div>
    </div>
  );
}

export default About;
