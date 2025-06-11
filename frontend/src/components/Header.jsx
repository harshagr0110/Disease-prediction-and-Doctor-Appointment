import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Header = () => {
    const navigate = useNavigate();

    const handlePredictClick = () => {
        navigate('/disease-prediction');
    };

    return (
        <header className="bg-[#e0f7fa] w-full max-w-6xl mx-auto mt-16 md:mt-24 rounded-2xl shadow-lg border border-[#e0f7fa] ">
            {/* Hero Section */}
            <section className="flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-12 py-10 gap-10">
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#1b5e20] leading-tight">
                        AI-Powered <span className="text-blue-800">Disease Prediction</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#388e3c] my-5 max-w-lg">
                        Predict diseases early using advanced AI. Get instant insights and recommendations for your health.
                    </p>
                    <button
                        onClick={handlePredictClick}
                        className="inline-block bg-gradient-to-r cursor-pointer from-[#43e97b] to-[#38f9d7] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-[#38f9d7] hover:to-[#43e97b] transition-all duration-200 mt-2"
                    >
                        Go to Disease Prediction
                    </button>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={assets.header_img}
                        alt="AI Disease Prediction"
                        className="w-4/5 md:w-full max-w-xs md:max-w-md rounded-2xl shadow-xl border-4 border-[#b2f7ef] bg-white"
                        loading="lazy"
                    />
                </div>
            </section>
        </header>
    );
};

export default Header;
