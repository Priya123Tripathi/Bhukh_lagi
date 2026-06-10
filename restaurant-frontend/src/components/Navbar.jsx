import { Link, useNavigate } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-orange-500"
        > <GiKnifeFork size={32} />BhukhLagi
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8">

          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-orange-500 transition"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="font-medium text-gray-700 hover:text-orange-500 transition"
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white px-5 py-2 rounded-xl font-medium hover:bg-orange-600 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;