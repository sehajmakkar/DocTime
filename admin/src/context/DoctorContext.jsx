import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem('dToken') ? localStorage.getItem('dToken') : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use effect to set the token in localStorage when it changes
  useEffect(() => {
    if (dToken) {
      localStorage.setItem('dToken', dToken);
    }
  }, [dToken]);

  const getAppointments = async () => {
    setLoading(true);
    try {
      console.log("Using token:", dToken); // Debug the token value
      
      // Make sure to send the token as a header
      const { data } = await axios.get(`${backendUrl}/api/v1/doctor/appointments`, {
        headers: {
          'dtoken': dToken, // Use lowercase for consistency
          'Authorization': dToken // Alternative approach that's commonly used
        },
      });
  
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const completeAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(`${backendUrl}/api/v1/doctor/complete-appointment`, { appointmentId }, {
        headers: {
          dToken
        }
      });

      if (data.success) {
        getAppointments();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(`${backendUrl}/api/v1/doctor/cancel-appointment`, { appointmentId }, {
        headers: {
          dToken
        }
      });

      if (data.success) {
        getAppointments();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  const getDashData = async () => {
    try {

      const { data } = await axios.get(`${backendUrl}/api/v1/doctor/dashboard`, {
        headers: {
          dToken
        }
      });

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

    } catch (error){
      console.log(error);
      toast.error(error.message);
    }
  }

  const value = {
    dToken,
    setDToken,
    backendUrl,
    getAppointments,
    appointments, 
    setAppointments,
    loading,
    setLoading,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;