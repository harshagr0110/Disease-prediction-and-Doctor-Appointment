import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/list`);
      if (data.success) setDoctors(data.doctors);
    } catch {
      setDoctors([]);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const getUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/get-profile`, { headers: { Authorization: `Bearer ${token}` } });
    console.log(data);
      if (data.success) setUserData(data.userData);
      else toast.error(data.message);
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() =>  {
    //console.log(token);
    if (token) getUserProfileData();
    else setUserData(null);
  }, [token]);

  return (
    <AppContext.Provider value={{
      backendurl, doctors, getDoctorsData,
      token, setToken, userId, setUserId,
      userData,setUserData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;