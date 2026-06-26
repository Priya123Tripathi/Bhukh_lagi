import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
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
    const res = await api.post(
      "/auth/signup",
      form
    );
    alert(res.data.message);
    navigate("/login");

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Signup Failed"
    );

  }

};

return (
  <div className="min-h-screen flex bg-gray-100">

   
    <div className="hidden lg:grid lg:w-3/5 grid-cols-2 gap-4 p-6 bg-gradient-to-br from-orange-100 to-red-100">

      <img
        src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
        alt="Pizza"
        className="w-full h-64 object-cover rounded-3xl shadow-lg hover:scale-105 transition duration-300"
      />

      <img
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
        alt="Burger"
        className="w-full h-64 object-cover rounded-3xl shadow-lg hover:scale-105 transition duration-300"
      />

      <img
        src="https://images.unsplash.com/photo-1589302168068-964664d93dc0"
        alt="Biryani"
        className="w-full h-64 object-cover rounded-3xl shadow-lg hover:scale-105 transition duration-300"
      />

      <img
        src="https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb"
        alt="Pasta"
        className="w-full h-64 object-cover rounded-3xl shadow-lg hover:scale-105 transition duration-300"
      />

      <img
        src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
        alt="Food"
        className="w-full h-64 object-cover rounded-3xl shadow-lg hover:scale-105 transition duration-300"
      />

      <img
        src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
        alt="Sandwich"
        className="w-full h-64 object-cover rounded-3xl shadow-lg hover:scale-105 transition duration-300"
      />

    </div>

    {/* Right Side Signup */}
    <div className="w-full lg:w-2/5 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Create Account 
          </h1>

          <p className="text-gray-500 mt-3">
            Join our restaurant reservation platform
          </p>

        </div>

        <form onSubmit={handleSubmit} 
        className="space-y-5">

          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Full Name"
            value={form.name}
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Create Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  </div>
);
}

export default Signup;