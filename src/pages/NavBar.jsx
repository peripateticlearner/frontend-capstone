import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '../module/NavBar.module.css';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const userId = localStorage.getItem("userId");
            const adminId = localStorage.getItem("adminId");
            const adminStatus = localStorage.getItem("isAdmin") === "true";
            
            setIsLoggedIn(!!(userId || adminId));
            setIsAdmin(adminStatus);
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        window.addEventListener('authChange', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('authChange', checkAuth);
        };
    }, []);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className={styles.navbar}>
            <h3 className={styles.navbarBrand}>Atlas Taxi</h3>
            
            <button 
                className={styles.navbarToggle}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
            </button>

            <ul className={`${styles.navbarMenu} ${isOpen ? styles.active : ''}`}>
                {!isLoggedIn && (
                    <>
                        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                        <li><Link to="/signup" onClick={closeMenu}>Sign Up</Link></li>
                        <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                    </>
                )}
                {isLoggedIn && !isAdmin && (
                    <>
                        <li><Link to="/book" onClick={closeMenu}>Book a Ride</Link></li>
                        <li><Link to="/dashboard" onClick={closeMenu}>User Dashboard</Link></li>
                    </>
                )}
                {isLoggedIn && isAdmin && (
                    <li><Link to="/admin" onClick={closeMenu}>Admin Dashboard</Link></li>
                )}
                {isLoggedIn && (
                    <li><Link to="/logout" onClick={closeMenu}>Logout</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;