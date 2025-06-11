import { createContext, useState } from "react";
import axios from "axios";
export const DoctorContext = createContext();


const DoctorContextProvider = ({ children }) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
   const [appointments, setAppointments] = useState([]);

   const getAppointments = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/doctor/appointments`, {
        headers: {
          Authorization: `Bearer ${dToken}`,
        },
      });
      console.log(response,dToken);
      if (response.data.success) {
       // console.log(response.data.appointments);
        setAppointments(response.data.appointments);
      } else {
        console.error('Error fetching appointments:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  }
   
    const value = {
        dToken,
        setDToken,
        backendurl,
        appointments,
        getAppointments
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;