import { Navigate } from "react-router-dom";

function PrivateRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;