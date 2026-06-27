import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {

  const [reservations, setReservations] = useState([]);

  useEffect(() => {

    const fetchReservations = async () => {

      try {
        const user = JSON.parse(
          localStorage.getItem("user")
        );
        
          if (!user) return;
        const res = await api.get(
          `/reservations/user/${user._id}`
        );

        setReservations(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchReservations();

  }, []);
  const cancelReservation = async (id) => {
  try {
    await api.delete(`/reservations/${id}`);
    setReservations(
      reservations.filter(
        (reservation) => reservation._id !== id
      )
    );
    alert("Reservation Cancelled Successfully");
  } catch (err) {
    console.log(err);
    alert("Unable to Cancel Reservation");

  }
};

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">

      {/* Header */}

      <div className="text-center py-16">

        <h1 className="text-5xl font-extrabold text-gray-800">
          My Reservations 
        </h1>

        <p className="mt-4 text-lg text-gray-500">
          Manage all your restaurant bookings.
        </p>

      </div>

      {/* Reservation Cards */}

      <div className="max-w-6xl mx-auto px-6">

        {reservations.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

            <h2 className="text-3xl font-semibold text-gray-700">
              No Reservations Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Book your first table from BhukhLagi.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-8">

            {reservations.map((reservation) => (

              <div
                key={reservation._id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition"
              >

                <div className="flex justify-between items-center">

                  <h2 className="text-2xl font-bold text-orange-500">
                     {reservation.restaurantId?.name}

                  </h2>

                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                    Confirmed
                  </span>

                </div>

                <div className="mt-6 space-y-4">

                  <p className="text-gray-700 text-lg">
                     <span className="font-semibold">Date:</span>{" "}
                    {reservation.date}
                  </p>

                  <p className="text-gray-700 text-lg">
                     <span className="font-semibold">Time:</span>{" "}
                    {reservation.time}
                  </p>

                  <p className="text-gray-700 text-lg">
                     <span className="font-semibold">Guests:</span>{" "}
                    {reservation.guests}
                  </p>

                </div>

              <button
  onClick={() => cancelReservation(reservation._id)}
  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl"
>
  Cancel Reservation
</button>
              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Dashboard;