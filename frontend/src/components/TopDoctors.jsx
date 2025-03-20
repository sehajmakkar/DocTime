import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="w-full bg-[#F8F2DE] p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[#A31D1D] text-2xl font-bold">Top Doctors</h1>
          <p className="text-gray-600">
            Find and book appointments with the best specialists
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-[#D84040] hover:bg-[#A31D1D] text-white py-2 px-4 rounded-md transition-colors duration-300"
        >
          See All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0, 0);}}
            key={index}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={`Dr. ${item.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">⭐ 4.8 (120)</p>
                <p className="text-[#D84040] text-sm font-medium bg-[#ECDCBF] py-1 px-2 rounded-full">
                  Available
                </p>
              </div>
              <p className="font-bold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
              <button className="w-full mt-3 border border-[#D84040] text-[#D84040] hover:bg-[#D84040] hover:text-white py-1 px-3 rounded-md text-sm transition-colors cursor-pointer duration-300">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;
