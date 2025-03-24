import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import BookRide from "./pages/BookRide";
import AdminDashboard from "./pages/AdminDashboard";
import NavBar from "./pages/NavBar";


function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/book" element={<BookRide />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    </>
  );
}

export default App;
