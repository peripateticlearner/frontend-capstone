import { Link } from "react-router-dom";

function Home() {
return (
    <div>
        <h1>Welcome to the Atlas Taxi Service</h1>
        <p>Book a ride with us today!</p>
        <Link to="/book">Book a Ride</Link>
    </div>
);
}

export default Home;