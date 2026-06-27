import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reservation from "./pages/Reservation";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Confirmation from "./pages/Confirmation";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import { Navigate } from "react-router-dom";
function App() {
const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";
  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu/:id" element={<Menu />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
     <Route path="/confirmation" element={<Confirmation />}/>
     <Route path="/admin"  element={<AdminDashboard />}/>
      </Routes>
    </>
  );
}
export default App;