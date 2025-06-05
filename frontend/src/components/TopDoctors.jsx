import React from 'react'
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext';
const TopDoctors = () => {

    const navigate= useNavigate();
    const {doctors} = useContext(AppContext);
    return (
        <div className="  bg-gray-50 rounded-lg shadow-lg py-12">
            <div className="text-center mb-6">
                <h1 className="text-4xl  text-blue-700 font-semibold mb-4">Top Doctors to Book</h1>
            <p className='text-gray-600 font-serif'>Simply browse through our list of top doctors and book an appointment</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6 px-4">
                {doctors.slice(0, 10).map((doctor, index) => (
                    <div onClick={() => navigate(`/appointment/${doctor._id}`)}
                        key={index}
                        className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 transition-transform hover:scale-105"
                    >
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-blue-100 shadow"
                        />
                        <h2 className="text-lg font-semibold text-center">{doctor.name}</h2>
                        <p className="text-sm text-gray-600 text-center">{doctor.speciality}</p>
                        <p className="text-sm text-gray-500 text-center">{doctor.location}</p>
                    </div>
                ))}
                
            </div>
           <div className="text-center mt-6">
             <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() =>{ navigate('/doctors');scrollTo(0, 0)}}>SHOW MORE</button>
           </div>
        </div>
    )
}

export default TopDoctors
