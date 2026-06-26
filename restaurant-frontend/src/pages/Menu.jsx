import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
function Menu() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {

    const fetchMenu = async () => {

      try {

        const res = await api.get(
          `/menu/restaurant/${id}`
        );

        setMenuItems(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchMenu();

  }, [id]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">

      {/* Header */}

      <div className="text-center py-16">

        <h1 className="text-5xl font-extrabold text-gray-800">
          Restaurant Menu 🍽️
        </h1>

        <p className="mt-4 text-lg text-gray-500">
          Explore delicious dishes and reserve your table.
        </p>

      </div>

      {/* Menu Items */}

      <div className="max-w-7xl mx-auto px-6">

        {menuItems.length === 0 ? (

          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

            <h2 className="text-2xl font-semibold">
              No Menu Items Found
            </h2>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {menuItems.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition"
              >

                <h2 className="text-2xl font-bold text-gray-800">
                  {item.itemName}
                </h2>

                <p className="text-gray-500 mt-3">
                  {item.description}
                </p>

                <div className="mt-5">

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    ₹ {item.price}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Reserve Button */}

      {menuItems.length > 0 && (

        <div className="text-center py-14">

          <button
            onClick={() =>
              navigate(`/reservation/${id}`)
            }
            className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-orange-600 transition shadow-lg"
          >
            Reserve Table
          </button>

        </div>

      )}

    </div>

  );

}

export default Menu;