import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-[#F8F2DE] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#D84040] p-6 text-white">
            <h1 className="text-2xl font-bold text-center">My Appointments</h1>
          </div>

          <div className="p-6">
            {doctors && doctors.length > 0 ? (
              <div className="space-y-6">
                {doctors.slice(0, 3).map((doctor, index) => (
                  <div key={index} className="bg-white border border-[#ECDCBF] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row">
                      {/* Doctor Image */}
                      <div className="w-full md:w-1/4 p-4 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#ECDCBF]">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div className="w-full md:w-1/2 p-4 border-t md:border-t-0 md:border-l md:border-r border-[#ECDCBF]">
                        <h2 className="text-xl font-bold text-[#A31D1D] mb-2">
                          Dr. {doctor.name}
                        </h2>
                        <p className="text-gray-700 font-medium mb-3">
                          {doctor.speciality}
                        </p>
                        <div className="mb-3">
                          <p className="text-gray-600 font-semibold">Address:</p>
                          <p className="text-gray-600">{doctor.address.line1}</p>
                          <p className="text-gray-600">{doctor.address.line2}</p>
                        </div>
                        <div className="bg-[#F8F2DE] p-2 rounded-md">
                          <p className="text-gray-800">
                            <span className="font-semibold">Date & Time:</span> 25/10/2023 | 10:00AM
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="w-full md:w-1/4 p-4 flex flex-col justify-center space-y-3 border-t md:border-t-0">
                        <button className="w-full py-2 bg-[#D84040] text-white font-medium rounded-md hover:bg-[#A31D1D] transition-colors duration-300">
                          Pay Online
                        </button>
                        <button className="w-full py-2 border border-[#D84040] text-[#D84040] font-medium rounded-md hover:bg-[#F8F2DE] transition-colors duration-300">
                          Cancel Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">You don't have any appointments yet.</p>
                <button className="mt-4 px-6 py-2 bg-[#D84040] text-white font-medium rounded-md hover:bg-[#A31D1D] transition-colors duration-300">
                  Book an Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;