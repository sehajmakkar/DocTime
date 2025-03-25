import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(() => {
    // Initialize token from localStorage on first load
    const savedToken = localStorage.getItem('token');
    return savedToken || '';
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDoctorsData = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/v1/doctor/all-doctors`);
      console.log(data);
      if(data.success){
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }

    } catch (error){
      console.log(error);
      toast.error(error.message);
    }
  }

  // Update localStorage whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    getDoctorsData();
  }, []);

  const value = {
    doctors, 
    token, 
    setToken, 
    backendUrl
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
};

export default AppContextProvider;