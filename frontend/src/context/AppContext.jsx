import { createContext } from "react";  
export const AppContext = createContext();
import axios from 'axios';
import { useEffect, useState } from "react";
import {toast} from 'react-toastify';

const AppContextProvider = ({ children }) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors]=useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
        const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
     useEffect(() => {
        // Check if token exists in localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);
      useEffect(() => {
        // Check if userId exists in localStorage
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      }, []);
    const getDoctorsData=async()=>{
        try{
            const {data}=await axios.get(`${backendurl}/api/doctor/list`)
            if(data.success){
                setDoctors(data.doctors);
            }else{
                return [];
            }
        }
        catch(err){
            return [];
        }
    }
    useEffect(()=>{
        getDoctorsData();
    },[])
    useEffect(()=>{
        console.log(doctors)
    },[doctors])
    const value={
        doctors,
        getDoctorsData,
        setDoctors,
        token,
        setToken,
        userId,
        setUserId


    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;