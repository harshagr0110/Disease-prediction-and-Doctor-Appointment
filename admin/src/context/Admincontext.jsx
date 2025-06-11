// src/context/AdminContext.jsx

import axios from 'axios';
import React, { createContext, useState, useEffect,useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(() => localStorage.getItem('aToken') || '');
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors
  const getAllDoctors = useCallback(async () => {
    try {
      const response = await axios.get(`${backendurl}/api/admin/all-doctors`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if (response.data.success) {
        setDoctors(response.data.doctors);
      } else {
        toast.error(response.data.message || 'Error fetching doctors');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error fetching doctors');
    }
  }, [aToken, backendurl]);


  // Change doctor availability
  const changeAvailability = async (docId) => {
    try {
      console.log(docId);
      const { data } = await axios.post(
        `${backendurl}/api/admin/change-availability`,
        { docId },
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  // Fetch doctors on mount
  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken, getAllDoctors]);

  const value = {
    aToken,
    setAToken,
    backendurl,
    doctors,
    getAllDoctors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>
      {/* ToastContainer with Tailwind and blue-green theme */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={() =>
          "bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-3 rounded shadow-lg"
        }
        bodyClassName={() => "text-sm font-medium"}
        progressClassName={() => "bg-green-300"}
      />
      {children}
    </AdminContext.Provider>
  );
}


export default AdminContextProvider;
