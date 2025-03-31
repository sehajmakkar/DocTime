import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/user/appointments`,
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error(error.message);
    }
  };


// APIs FOR RAZORPAY PAYMENT
// WILL IMPLEMENT AFTER I DO KYC.

  const initiatePayment = async (order) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Appointment Payment",
        description: "Payment for appointment booking",
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response) => {
          // console.log("Payment response:", response);

          try {
            const { data } = await axios.post(
              `${backendUrl}/api/v1/user/verify-payment`,
              response,
              {
                headers: {
                  token,
                },
              }
            );

            if (data.success) {
              getUserAppointments();
              navigate("/ my-appointments");
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error(error.message);
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error(error.message);
    }
  };

  const handlePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/payment-razorpay`,
        { appointmentId },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        initiatePayment(data.order);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    } else {
      toast.error("Please login to view your appointments.");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#F8F2DE] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#D84040] p-6 text-white">
            <h1 className="text-2xl font-bold text-center">My Appointments</h1>
          </div>

          <div className="p-6">
            {appointments && appointments.length > 0 ? (
              <div className="space-y-6">
                {appointments.map((doctor, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#ECDCBF] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Doctor Image */}
                      <div className="w-full md:w-1/4 p-4 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#ECDCBF]">
                          <img
                            src={doctor.docData.image}
                            alt={doctor.docData.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div className="w-full md:w-1/2 p-4 border-t md:border-t-0 md:border-l md:border-r border-[#ECDCBF]">
                        <h2 className="text-xl font-bold text-[#A31D1D] mb-2">
                          Dr. {doctor.docData.name}
                        </h2>
                        <p className="text-gray-700 font-medium mb-3">
                          {doctor.docData.specialization}
                        </p>
                        <div className="mb-3">
                          <p className="text-gray-600 font-semibold">
                            Address:
                          </p>
                          <p className="text-gray-600">
                            {doctor.docData.address.line1}
                          </p>
                          <p className="text-gray-600">
                            {doctor.docData.address.line2}
                          </p>
                        </div>
                        <div className="bg-[#F8F2DE] p-2 rounded-md">
                          <p className="text-gray-800">
                            <span className="font-semibold">Date & Time:</span>
                            {doctor.slotTime}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="w-full md:w-1/4 p-4 flex flex-col justify-center space-y-3 border-t md:border-t-0">
                        {!doctor.cancelled && doctor.payment && !doctor.isCompleted && (
                          <button className="w-full py-2 bg-[#D84040] text-white font-medium rounded-md hover:bg-[#A31D1D] transition-colors duration-300">
                            Appointment Paid
                          </button>
                        )}

                        {!doctor.cancelled && !doctor.payment && !doctor.isCompleted && (
                          <button
                            className="w-full py-2 bg-[#D84040] text-white font-medium rounded-md hover:bg-[#A31D1D] transition-colors duration-300"
                            // onClick={() => handlePayment(doctor._id)}
                          >
                            Pay Online
                          </button>
                        )}

                        

                        {doctor.cancelled && !doctor.isCompleted ? (
                          <button className="w-full py-2 bg-[#D84040] text-white font-medium rounded-md hover:bg-[#A31D1D] transition-colors duration-300">
                            Appointment Cancelled
                          </button>
                        ) : (
                          !doctor.isCompleted && <button
                            onClick={() => handleCancelAppointment(doctor._id)}
                            className="w-full py-2 border border-[#D84040] text-[#D84040] font-medium rounded-md hover:bg-[#F8F2DE] transition-colors duration-300"
                          >
                            Cancel Appointment
                          </button>
                        )}

{
                          doctor.isCompleted && (
                            <button className="w-full py-2 bg-[#D84040] text-white font-medium rounded-md hover:bg-[#A31D1D] transition-colors duration-300">
                            Completed!
                          </button>
                          )
                        }

                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">
                  You don't have any appointments yet.
                </p>
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
