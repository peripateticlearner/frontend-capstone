import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear localstorage
        localStorage.clear();

        // Redirect to home page
        navigate("/");
    };

    return (
        <div>
            <h1>Logging Out...</h1>
            {handleLogout()}
        </div>
    );
}

export default Logout;