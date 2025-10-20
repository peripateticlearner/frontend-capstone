import { Link } from 'react-router-dom';

function NavBar() {
    // Check authentication and role from localStorage (or state management)
    const isLoggedIn = localStorage.getItem("userId") || localStorage.getItem("adminId");
    const isAdmin = localStorage.getItem("isAdmin") === "true" || false;

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
                    <li><Link to="/">Home</Link></li>  
                    {!isLoggedIn && <li><Link to="/signup">Sign Up</Link></li>}
                    {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
                    {!isLoggedIn && <li><Link to="/admin-login">Admin Login</Link></li>}  
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