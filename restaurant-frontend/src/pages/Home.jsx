import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function Home() {

  const [restaurants, setRestaurants] = useState([]);
const [search, setSearch] = useState("");
const [cuisine, setCuisine] = useState("All");
  useEffect(() => {

    const fetchRestaurants = async () => {

      try {

        const res = await api.get(
          "/restaurants"
        );

        setRestaurants(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchRestaurants();

  }, []);

const filteredRestaurants = restaurants
  .filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((restaurant) =>
    cuisine === "All" || restaurant.cuisine === cuisine
  );

  return (
<>
<div className="text-center py-24">

  <h1 className="text-6xl font-extrabold text-gray-800">
     BhukhLagi
  </h1>

  <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
    Discover amazing restaurants, explore menus and
    reserve your favorite table in seconds.
  </p>

  <button
    className="mt-8 bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-600 transition"
  >
    Explore Restaurants
  </button>

</div>

<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">

  <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
    <h2 className="text-4xl font-bold text-orange-500">
     {filteredRestaurants.length}
    </h2>
    <p className="text-gray-500 mt-2">
      Restaurants
    </p>
  </div>

  <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
    <h2 className="text-4xl font-bold text-orange-500">
      100+
    </h2>
    <p className="text-gray-500 mt-2">
      Menu Items
    </p>
  </div>

  <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
    <h2 className="text-4xl font-bold text-orange-500">
      24/7
    </h2>
    <p className="text-gray-500 mt-2">
      Reservations
    </p>
  </div>

</div>
<div className="max-w-6xl mx-auto px-6 mb-10 flex flex-col md:flex-row gap-4">

  <input
    type="text"
    placeholder="Search Restaurant..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 p-3 border rounded-xl shadow"
  />

  <select
    value={cuisine}
    onChange={(e) => setCuisine(e.target.value)}
    className="p-3 border rounded-xl shadow"
  >
    <option value="All">All</option>
    <option value="Indian">Indian</option>
    <option value="Chinese">Chinese</option>
    <option value="Italian">Italian</option>
    <option value="Fast Food">Fast Food</option>
  </select>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 mb-20">

{filteredRestaurants.length === 0 ? (

  <div className="col-span-full bg-white p-10 rounded-3xl shadow-lg text-center">

    <h2 className="text-3xl font-semibold text-gray-700">
      No Restaurant Found
    </h2>

    <p className="text-gray-500 mt-3">
      Try searching another restaurant or choose a different cuisine.
    </p>

  </div>

) : (

  filteredRestaurants.map((restaurant) => (

    <div
      key={restaurant._id}
      className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition"
    >

      <div className="flex justify-between">

        <h2 className="text-2xl font-bold">
          {restaurant.name}
        </h2>

        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
          {restaurant.cuisine}
        </span>

      </div>

      <p className="mt-4 text-gray-500">
        {restaurant.address}
      </p>

      <Link to={`/menu/${restaurant._id}`}>
        <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800">
          View Menu
        </button>
      </Link>

    </div>

  ))

)}

</div>

<div className="py-20">

  <h2 className="text-4xl font-bold text-center mb-12">
    Why Choose BhukhLagi?
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <h3 className="text-xl font-bold">
        Instant Booking
      </h3>
      <p className="mt-3 text-gray-500">
        Reserve tables in seconds.
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <h3 className="text-xl font-bold">
        🍴 Best Restaurants
      </h3>
      <p className="mt-3 text-gray-500">
        Discover top-rated places.
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <h3 className="text-xl font-bold">
         Easy Experience
      </h3>
      <p className="mt-3 text-gray-500">
        Simple and user-friendly booking.
      </p>
    </div>

  </div>

</div>
<footer className="bg-white border-t py-8 text-center text-gray-500">

  © 2026 BhukhLagi

  <p className="mt-2">
    Discover • Reserve • Enjoy
  </p>

</footer>
</>

  );
}

export default Home;