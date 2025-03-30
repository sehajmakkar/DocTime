import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const [dashData, setDashData] = useState({
    doctors: 0,
    appointments: 0,
    users: 0,
    latestAppointments: [] // Initialize with empty array to prevent mapping errors
  });
  const [isLoading, setIsLoading] = useState(true);

  const getDashboardData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/admin/dashboard`, {
        headers: {
          aToken,
        },
      });

      if (data.success) {
        // Ensure latestAppointments is not undefined
        const safeData = {
          ...data.dashData,
          latestAppointments: data.dashData.latestAppointments || []
        };
        setDashData(safeData);
        console.log(safeData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
  
      try {
  
        const { data } = await axios.post(`${backendUrl}/api/v1/admin/cancel-appointment`, { appointmentId }, {
          headers: {
            aToken
          }
        });
  
        if (data.success) {
          toast.success(data.message);
          getDashboardData();
        } else {
          toast.error(data.message);
        }
        
  
      } catch(error) {
        toast.error(error.message);
      }
  
  
    }

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F8F2DE]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D84040]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F8F2DE] min-h-screen">
      <h1 className="text-3xl font-bold text-[#A31D1D] mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
          <div className="bg-[#ECDCBF] p-4 rounded-full">
            <img src={assets.doctor_icon} alt="" className="h-10 w-10" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-bold text-[#A31D1D]">{dashData.doctors}</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
          <div className="bg-[#ECDCBF] p-4 rounded-full">
            <img src={assets.appointment_icon} alt="" className="h-10 w-10" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-bold text-[#A31D1D]">{dashData.appointments}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
          <div className="bg-[#ECDCBF] p-4 rounded-full">
            <img src={assets.patients_icon} alt="" className="h-10 w-10" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-bold text-[#A31D1D]">{dashData.users}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#ECDCBF] px-6 py-4 flex items-center">
          <img src={assets.list_icon} alt="" className="h-6 w-6 mr-2" />
          <p className="text-lg font-semibold text-[#A31D1D]">Latest Appointments</p>
        </div>

        {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
          <div className="divide-y divide-[#ECDCBF]">
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="p-4 hover:bg-[#F8F2DE] transition-colors flex items-center">
                <div className="flex-shrink-0">
                  <img 
                    src={item.docData.image} 
                    alt="" 
                    className="h-12 w-12 rounded-full object-cover border-2 border-[#ECDCBF]"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-medium text-gray-900">{item.docData.name}</p>
                  <p className="text-sm text-gray-600">{item.slotTime}</p>
                </div>
                <div className="ml-auto">
                  {item.cancelled ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Cancelled
                    </span>
                  ) : (
                    <button
                      className="text-[#D84040] hover:text-[#A31D1D] transition-colors cursor-pointer"
                      title="Cancel Appointment"
                      onClick={() => handleCancelAppointment(item._id)}
                    >
                      <img
                        className="h-6 w-6"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No recent appointments found
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;