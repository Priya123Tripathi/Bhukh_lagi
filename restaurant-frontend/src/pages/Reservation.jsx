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

const res = await api.post("/reservations", {
  userId: user._id,
  restaurantId: id,
  date: form.date,
  time: form.time,
  guests: form.guests
});

navigate("/confirmation", {
  state: {
    restaurantName: res.data.restaurantId?.name,
    date: form.date,
    time: form.time,
    guests: form.guests,
  },
});

return;

const { data: order } = await api.post(
  "/payment/create-order",
  {
    amount: 100
  }
);

const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency,
  order_id: order.id,
  name: "BhukhLagi",
  description: "Restaurant Reservation",
  prefill: {
  name: user.name,
  email: user.email,
},
theme: {
  color: "#f97316",
},

  handler: async function (response) {

  const verify = await api.post(
    "/payment/verify",
    response
  );

  if (verify.data.success) {

   if (import.meta.env.DEV) {
  await api.post("/reservations", {
    userId: user._id,
    restaurantId: id,
    date: form.date,
    time: form.time,
    guests: form.guests
  });

  alert("Reservation Successful");
  navigate("/dashboard");
  return;
}
 
  } else {

    alert("Payment Verification Failed");

  }
}
};
    if (!window.Razorpay) {
  alert("Razorpay SDK not loaded");
  return;
}
const razorpay = new window.Razorpay(options);
razorpay.on("payment.failed", function (response) {
  alert("Payment Failed ");
  console.log(response.error);
});

razorpay.open();
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
            Reserve Your Table 
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

          <select
  name="time"
  value={form.time}
  onChange={handleChange}
  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
  required
>
  <option value="">Select Time</option>
  <option value="09:00 AM">09:00 AM</option>
  <option value="10:00 AM">10:00 AM</option>
  <option value="11:00 AM">11:00 AM</option>
  <option value="12:00 PM">12:00 PM</option>
  <option value="01:00 PM">01:00 PM</option>
  <option value="02:00 PM">02:00 PM</option>
  <option value="03:00 PM">03:00 PM</option>
  <option value="04:00 PM">04:00 PM</option>
  <option value="05:00 PM">05:00 PM</option>
  <option value="06:00 PM">06:00 PM</option>
  <option value="07:00 PM">07:00 PM</option>
  <option value="08:00 PM">08:00 PM</option>
  <option value="09:00 PM">09:00 PM</option>
  <option value="10:00 PM">10:00 PM</option>
</select>

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