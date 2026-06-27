import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {

  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full">

        <div className="text-center">


          <h1 className="text-4xl font-bold text-green-600">
            Reservation Confirmed
          </h1>

          <p className="text-gray-500 mt-3">
            Your table has been reserved successfully.
          </p>

        </div>

        <div className="mt-8 space-y-4">

          <div className="flex justify-between">
            <span className="font-semibold">Restaurant</span>
            <span>{state.restaurantName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Date</span>
            <span>{state.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Time</span>
            <span>{state.time}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Guests</span>
            <span>{state.guests}</span>
          </div>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600"
        >
          Go to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Confirmation;