import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

     const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );
    localStorage.setItem(
      "token",
      res.data.token
    );
    alert("Login Successful");
    navigate("/");
  } catch (err) {
    console.log(err);
    alert(
      err.response?.data?.message ||
      "Login Failed"
    );

  }

};
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Left Side Food Gallery */}
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

      {/* Right Side Login */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-6">

        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-gray-800">
              Login
            </h1>

            <p className="text-gray-500 mt-3">
              Login to reserve your favorite restaurant
            </p>

          </div>

          <form 
          onSubmit={handleSubmit}
           className="space-y-5">

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-500 font-semibold"
            >
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;