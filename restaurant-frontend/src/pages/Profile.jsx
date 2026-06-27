import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [totalReservations, setTotalReservations] = useState(0);

  useEffect(() => {

    const loggedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!loggedUser) {
      navigate("/login");
      return;
    }

    setUser(loggedUser);

    const fetchReservations = async () => {

      const res = await api.get(
        `/reservations/user/${loggedUser._id}`
      );

      setTotalReservations(res.data.length);

    };

    fetchReservations();

  }, []);

  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-orange-500 flex items-center justify-center text-white text-5xl font-bold shadow-lg">

            {user.name?.charAt(0).toUpperCase()}

          </div>

          <h1 className="text-3xl font-bold mt-5">
            {user.name}
          </h1>

          <p className="text-gray-500">
            Welcome 
          </p>

        </div>

        <div className="mt-8 space-y-4">

          <div className="bg-orange-50 rounded-2xl p-4">

            <h2 className="text-gray-500 text-sm">
              Email
            </h2>

            <p className="font-semibold text-lg">
              {user.email}
            </p>

          </div>

          <div className="bg-orange-50 rounded-2xl p-4 flex justify-between">

            <div>

              <h2 className="text-gray-500 text-sm">
                Reservations
              </h2>

              <p className="font-bold text-2xl">
                {totalReservations}
              </p>

            </div>

            <div>

              <h2 className="text-gray-500 text-sm">
                Status
              </h2>

              <p className="text-green-600 font-semibold">
                Active
              </p>

            </div>

          </div>

          <div className="bg-orange-50 rounded-2xl p-4">

            <h2 className="text-gray-500 text-sm">
              Member Since
            </h2>

            <p className="font-semibold">
              2026
            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Profile;