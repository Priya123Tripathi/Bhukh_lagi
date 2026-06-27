import { useEffect, useState } from "react";
import api from "../api";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);

useEffect(() => {
  const fetchData = async () => {

    try {
      const userRes = await api.get("/users");
      console.log("Users:", userRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.log("Users Error:", err);
    }

    try {
      const restaurantRes = await api.get("/restaurants");
      console.log("Restaurants:", restaurantRes.data);
      setRestaurants(restaurantRes.data);
    } catch (err) {
      console.log("Restaurants Error:", err);
    }

    try {
      const reservationRes = await api.get("/reservations");
      console.log("Reservations:", reservationRes.data);
      setReservations(reservationRes.data);
    } catch (err) {
      console.log("Reservations Error:", err);
    }

  };

  fetchData();
}, []);
  return (

    <div className="min-h-screen bg-orange-50 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Admin Dashboard
      </h1>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">

          <h2 className="text-5xl font-bold text-orange-500">
            {users.length}
          </h2>

          <p>Total Users</p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">

          <h2 className="text-5xl font-bold text-orange-500">
            {restaurants.length}
          </h2>

          <p>Total Restaurants</p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">

          <h2 className="text-5xl font-bold text-orange-500">
            {reservations.length}
          </h2>

          <p>Total Reservations</p>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;