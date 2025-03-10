import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAllDoctors() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/v1/admin/all-doctors`,
        {
          headers: {
            aToken,
          },
        }
      );

      if (data.success === true) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleAvailabilityToggle = async (doctorId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/v1/admin/update-doctor-availability`,
        {
          doctorId,
        },
        {
          headers: {
            aToken,
          },
        }
      );

      if (data.success === true) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update availability");
    }
  };

  return (
    <div className="p-6 bg-[#F8F2DE] min-h-screen transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#A31D1D] opacity-90">Doctors List</h1>
        <button
          onClick={() => getAllDoctors()}
          className="px-4 py-2 bg-[#D84040] text-white rounded-md hover:bg-[#A31D1D] transition-colors duration-300 shadow-sm"
        >
          Refresh List
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative w-20 h-20">
            <div className="absolute border-4 border-[#ECDCBF] border-t-[#D84040] rounded-full w-20 h-20 animate-spin"></div>
            <div className="absolute border-4 border-transparent border-l-[#A31D1D] rounded-full w-14 h-14 left-3 top-3 animate-spin animation-delay-150"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <div
                key={doctor._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="relative h-48 bg-[#ECDCBF]">
                  <img
                    src={doctor.image}
                    alt={`Dr. ${doctor.name}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                  <div
                    className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300 ${
                      doctor.available
                        ? "bg-[#A31D1D] text-white"
                        : "bg-[#D84040] text-white opacity-70"
                    }`}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-b from-white to-[#F8F2DE]">
                  <h3 className="text-lg font-semibold text-[#A31D1D] mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-[#D84040] font-medium mb-2">
                    {doctor.specialization}
                  </p>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center">
                      <span className="font-medium w-24">Experience:</span>
                      <span>{doctor.experience} years</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium w-24">Fee:</span>
                      <span>${doctor.fees}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium w-24">Degree:</span>
                      <span>{doctor.degree}</span>
                    </p>
                    <p className="flex items-center truncate">
                      <span className="font-medium w-24">Email:</span>
                      <span>{doctor.email}</span>
                    </p>
                    {doctor.address && (
                      <p className="flex items-center truncate">
                        <span className="font-medium w-24">Address:</span>
                        <span>{doctor.address.line1}</span>
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={doctor.available}
                        onChange={() =>
                          handleAvailabilityToggle(doctor._id)
                        }
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ECDCBF] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D84040] transition-colors duration-300"></div>
                      <span className="ms-3 text-sm font-medium text-gray-700">
                        {doctor.available ? "Available" : "Unavailable"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-[#A31D1D] bg-white rounded-lg shadow-sm">
              No doctors found. Add doctors to see them here.
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};

export default DoctorsList;