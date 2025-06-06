// src/context/AdminContext.js

import axios from 'axios';
import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
export const AdminContext = createContext();

// Rename to match what the Login component expects:
const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken')||'');
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);

    const getalldoctors = async () => {
      try {
        const response = await axios.get(`${backendurl}/api/admin/all-doctors`, {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        });
        if(response.data.success){
          setDoctors(response.data.doctors);
        }else{
          console.error('Error fetching doctors:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
      }
    }
    const changeAvaliability = async (docId) => {
      try{
        const {data}=await axios.post(`${backendurl}/api/admin/change-availability/`,{docId},{headers:{Authorization:`Bearer ${aToken}`}})
        if(data.success){
          toast.success(data.message)
          getalldoctors()
        }else{
          toast.error(data.message)
        }
      }
      catch(err){
        console.log(err)
        toast.error(err.message)
      }
    }

  // Provide the same keys that Login.jsx expects:
  const value = {
    aToken,
    setAToken,    // Login.jsx will call this instead of 'setToken'
    backendurl,
    doctors,
    getalldoctors,
    changeAvaliability
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
