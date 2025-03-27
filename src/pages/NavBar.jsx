import { Link } from 'react-router-dom';

function NavBar() {
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
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>  
                    <li><Link to="/book">Book a Ride</Link></li>
                    <li><Link to="/admin">Admin Dashboard</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;