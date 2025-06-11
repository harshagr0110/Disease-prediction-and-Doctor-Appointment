// src/components/SpecialityMenu.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const SpecialityMenu = () => {
    const navigate = useNavigate();
    return (
        <section
            id="speciality"
            className="py-14 bg-white flex flex-col items-center"
        >
            {/* ===== Title + Subtitle ===== */}
            <div className="max-w-3xl mx-auto text-center px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800 drop-shadow-sm">
                    Find by Specialty
                </h2>
                <p className="mt-3 text-blue-700 text-base md:text-lg font-medium">
                    Browse our trusted specialists and pick the perfect one for you.
                </p>
            </div>

            {/* ===== Scrollable Row of Cards ===== */}
            <div className="mt-10 w-full">
                <div className="relative">
                    <div className="flex justify-center items-center gap-6 md:gap-10 px-4 md:px-12 overflow-x-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-blue-50">
                        {specialityData.slice(0,6).map((item, index) => (
                            <Link
                                key={item.speciality || index}
                                to={`/doctors/${encodeURIComponent(item.speciality)}`}
                                onClick={() => window.scrollTo(0, 0)}
                                className="flex-shrink-0 w-28 sm:w-32 md:w-36"
                                aria-label={`View doctors for ${item.speciality}`}
                            >
                                <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg border border-green-100 my-3 p-6 md:p-5 transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl hover:ring-4 hover:ring-blue-100">
                                    {/* ===== Circular Image ===== */}
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-green-200 bg-blue-50 flex items-center justify-center">
                                        <img
                                            src={item.image}
                                            alt={item.speciality}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* ===== Specialty Label ===== */}
                                    <p className="mt-4 text-sm sm:text-base md:text-lg font-semibold text-green-800 text-center">
                                        {item.speciality}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div onClick={() => navigate('/doctors')} className="flex justify-center mt-6 text-sm sm:text-base md:text-lg font-semibold text-green-800 cursor-pointer">
                        VIEW MORE
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialityMenu;
