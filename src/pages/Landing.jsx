import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import styles from "../module/Landing.module.css";

function Landing() {
    return (
        <div className={styles.landing}>
            
            <div className={styles.landingContainer}>
                <div className={styles.contentContainer}>
                    <h1 className={styles.mainTitle}>
                        Atlas Taxi Service
                    </h1>
                    <p className={styles.tagline}>
                        Your reliable partner for comfortable and convenient transportation.
                    </p>
                    <div className={styles.buttonContainer}>
                        <Link to="/signup">
                            <button className={styles.signupButton}>
                                Sign Up
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className={styles.loginButton}>
                                Login
                            </button>
                        </Link>
                    </div>
                </div>

                <img
                    src="/taxi-image.jpg"
                    alt="Taxi Service"
                    className={styles.taxiImage}
                />
            </div>
        </div>
    );
}

export default Landing;