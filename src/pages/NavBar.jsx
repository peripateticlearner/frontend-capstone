import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavBar() {
    // Use state to make the component reactive to auth changes
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check auth status on mount and when localStorage changes
    useEffect(() => {
        const checkAuth = () => {
            const userId = localStorage.getItem("userId");
            const adminId = localStorage.getItem("adminId");
            const adminStatus = localStorage.getItem("isAdmin") === "true";
            
            setIsLoggedIn(!!(userId || adminId));
            setIsAdmin(adminStatus);
        };

        // Check on mount
        checkAuth();

        // Listen for storage events (for cross-tab changes)
        window.addEventListener('storage', checkAuth);

        // Custom event for same-tab changes
        window.addEventListener('authChange', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('authChange', checkAuth);
        };
    }, []);

    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            borderBottom: "1px solid #ccc",
            backgroundColor: "#1a1a1a",
            color: "#fff"
        }}>
            <h3 style={{ margin: 0 }}>Atlas Taxi</h3>
            <div>
                <ul style={{ listStyle:"none", display: "flex", gap: "1rem", margin: 0, padding: 0 }}>
                    {!isLoggedIn && <li><Link to="/">Home</Link></li>}
                    {!isLoggedIn && <li><Link to="/signup">Sign Up</Link></li>}
                    {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
                    {isLoggedIn && !isAdmin && <li><Link to="/book">Book a Ride</Link></li>}
                    {isLoggedIn && !isAdmin && <li><Link to="/dashboard">User Dashboard</Link></li>}
                    {isLoggedIn && isAdmin && <li><Link to="/admin">Admin Dashboard</Link></li>}
                    {isLoggedIn && <li><Link to="/logout">Logout</Link></li>}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;