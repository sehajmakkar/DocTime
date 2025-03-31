import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { backendUrl, dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Local state to handle loading or if context doesn't provide loading state
  useEffect(() => {
    if (dToken) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          await getDashData();
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchData();
    }
  }, [dToken]);


  if (isLoading || !dashData) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F8F2DE]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D84040]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F8F2DE] min-h-screen">
      <h1 className="text-3xl font-bold text-[#A31D1D] mb-6">Doctor Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
          <div className="bg-[#ECDCBF] p-4 rounded-full">
            <img src={assets.appointment_icon} alt="" className="h-10 w-10" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-bold text-[#A31D1D]">{dashData.appointments || 0}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
          <div className="bg-[#ECDCBF] p-4 rounded-full">
            <img src={assets.patients_icon} alt="" className="h-10 w-10" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-bold text-[#A31D1D]">{dashData.patients || 0}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
          <div className="bg-[#ECDCBF] p-4 rounded-full">
            <img src={assets.earnings_icon || assets.list_icon} alt="" className="h-10 w-10" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-bold text-[#A31D1D]">₹{dashData.earnings || 0}</p>
            <p className="text-gray-600">Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#ECDCBF] px-6 py-4 flex items-center">
          <img src={assets.list_icon} alt="" className="h-6 w-6 mr-2" />
          <p className="text-lg font-semibold text-[#A31D1D]">Upcoming Appointments</p>
        </div>

        {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
          <div className="divide-y divide-[#ECDCBF]">
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="p-4 hover:bg-[#F8F2DE] transition-colors">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img 
                      src={item.userData?.image || assets.patient_placeholder} 
                      alt="" 
                      className="h-12 w-12 rounded-full object-cover border-2 border-[#ECDCBF]"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="font-medium text-gray-900">{item.userData?.name || "Patient"}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="text-gray-600">{item.slotTime}</span>
                      <span className="text-gray-600">• {item.payment ? "Paid" : "Unpaid"}</span>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                  {item.cancelled ? (
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D84040]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-medium text-[#D84040]">Cancelled</span>
                      </div>
                    ) : item.isCompleted ? (
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium text-green-600">Completed</span>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors duration-150 text-[#D84040]"
                          title="Cancel appointment"
                          onClick={() => {
                            cancelAppointment(item._id);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <button
                          className="p-2 rounded-full bg-green-50 hover:bg-green-100 transition-colors duration-150 text-green-600"
                          title="Complete appointment"
                          onClick={() => {
                            completeAppointment(item._id);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Additional patient details */}
                <div className="mt-3 ml-16 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <div>
                    <span className="font-medium">Email:</span> {item.userData?.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {item.userData?.phone}
                  </div>
                  <div>
                    <span className="font-medium">Gender:</span> {item.userData?.gender}
                  </div>
                  <div>
                    <span className="font-medium">DOB:</span> {item.userData?.dob}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Address:</span> {item.userData?.address?.line1}, {item.userData?.address?.line2}
                  </div>
                </div>
                
                {/* Payment info */}
                <div className="mt-3 ml-16 text-sm">
                  <span className="font-medium text-[#A31D1D]">Amount:</span> ₹{item.amount}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No upcoming appointments found
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;