import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center my-8 px-4">
            <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-r from-blue-400 via-green-200 to-green-400 border border-blue-300">
                {/* Left: Text Content */}
                <div className="flex flex-col justify-center items-center md:items-start w-full md:w-1/2 p-8 bg-gradient-to-br from-blue-700 via-blue-500 to-green-400">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-white drop-shadow-lg text-center md:text-left">
                        Your <span className="text-green-200">Health</span>,<br />
                        Our <span className="text-blue-200">Priority</span>
                    </h1>
                    <p className="text-md md:text-lg mb-6 text-blue-50 max-w-md text-center md:text-left">
                        Book appointments with top-rated doctors and get the care you deserve. Trusted, compassionate, and always here for you.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-500 hover:bg-blue-400 text-white transition px-8 py-3 rounded-lg font-bold shadow-lg mt-2"
                    >
                        Create Account
                    </button>
                </div>

                {/* Right: Full Image */}
                <div className="flex items-center justify-center w-full md:w-1/2 bg-white">
                    <img
                        src={assets.appointment_img}
                        alt="Doctor Appointment"
                        className="w-full h-64 md:h-full object-cover object-center rounded-b-3xl md:rounded-b-none md:rounded-r-3xl shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
