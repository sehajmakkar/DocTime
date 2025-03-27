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
  const [userData, setUserData] = useState({});

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

  const loadUserProfileData = async () => {
    try {

      const {data} = await axios.get(`${backendUrl}/api/v1/user/get-profile`, {
        headers: {
          Authorization: {token}
        }
      });
      // console.log(data);
      if(data.success){
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }

    } catch(e){
      console.log(e);
      toast.error(e.message);
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

  useEffect(() => {
    if(token){
      loadUserProfileData();
    } else {
      setUserData({});
    }
  }, [token]);

  const value = {
    doctors, 
    token, 
    setToken, 
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
};

export default AppContextProvider;