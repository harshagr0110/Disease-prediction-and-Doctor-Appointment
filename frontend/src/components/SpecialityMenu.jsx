// src/components/SpecialityMenu.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';

const SpecialityMenu = () => {
    return (
        <section id="speciality" className="py-12 bg-gradient-to-b from-blue-50 to-white flex flex-col items-center">
            {/* ===== Title + Subtitle ===== */}
            <div className="max-w-3xl mx-auto text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-800">
                    Find by Specialty
                </h2>
                <p className="mt-2 text-gray-600 text-sm md:text-base">
                    Browse through our trusted specialists and pick the perfect one for you.
                </p>
            </div>

            {/* ===== Scrollable Row of Cards ===== */}
            <div className="mt-8 w-full">
                <div className="relative">
                    <div className="flex justify-center-safe gap-4 md:gap-8 px-2 md:px-8 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-200">
                        {specialityData.map((item, index) => (
                            <Link
                                key={item.speciality || index}
                                to={`/doctors/${encodeURIComponent(item.speciality)}`}
                                onClick={() => window.scrollTo(0, 0)}
                                className="flex-shrink-0 w-24 sm:w-28 md:w-32 mx-6"
                            >
                                <div className="flex flex-col items-center bg-white rounded-xl shadow-md my-3 p-5 md:p-4 transition-transform duration-200 hover:-translate-y-1 hover:ring-4 hover:ring-indigo-200">
                                    {/* ===== Circular Image ===== */}
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-indigo-100 bg-indigo-50">
                                        <img
                                            src={item.image}
                                            alt={item.speciality}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* ===== Specialty Label ===== */}
                                    <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-indigo-700 text-center">
                                        {item.speciality}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialityMenu;
