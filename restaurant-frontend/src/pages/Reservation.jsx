import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function Reservation() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

if (!user) {
  alert("Please login first");
  navigate("/login");
  return;
}

      await api.post(
        "/reservations",
        {
          userId: user._id,
          restaurantId: id,
          date: form.date,
          time: form.time,
          guests: form.guests
        }
      );

      alert("Reservation Successful 🎉");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert("Reservation Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Reserve Your Table 🍽️
          </h1>

          <p className="text-gray-500 mt-3">
            Book your favorite restaurant in seconds.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Select Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Select Time
            </label>

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Number of Guests
            </label>

            <input
              type="number"
              name="guests"
              placeholder="Enter guests"
              value={form.guests}
              onChange={handleChange}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Confirm Reservation
          </button>

        </form>

      </div>

    </div>

  );
}

export default Reservation;