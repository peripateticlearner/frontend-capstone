import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import BookRide from "./pages/BookRide";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NavBar from "./pages/NavBar";
import { useEffect } from "react";
import Logout from "./pages/Logout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  useEffect(() => {
    document.title = "Atlas Taxi - Ride with Ease";
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/book" element={
          <PrivateRoute isLoggedIn={localStorage.getItem("userId")}>
          <BookRide />
          </PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute isLoggedIn={localStorage.getItem("userId")}>
          <UserDashboard />
          </PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute isLoggedIn={localStorage.getItem("adminId")}>
          <AdminDashboard />
          </PrivateRoute>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;