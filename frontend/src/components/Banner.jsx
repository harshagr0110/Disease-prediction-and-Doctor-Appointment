import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="rounded-2xl shadow-lg my-8 overflow-hidden items-center flex justify-center ">
            <div className="flex h-full max-w-8/12 border-b-black bg-white border border-gray-400">
                {/* Left: Text Content */}
                <div className="w-full md:w-11/12 flex flex-col justify-center px-10 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                        We Provide the <span className="text-yellow-300">Best Doctors</span><br /> For Your Health
                    </h1>
                    <p className="text-md md:text-lg mb-6 text-gray-100 max-w-md">
                        Book appointments with top-rated specialists and get the care you deserve.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition px-6 py-2 rounded-md font-semibold shadow-md w-fit"
                    >
                        Create Account
                    </button>
                </div>

                {/* Right: Full Image */}
                <div className="hidden md:block md:w-1/2 h-full">
                    <img
                        src={assets.appointment_img}
                        alt="Banner"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
