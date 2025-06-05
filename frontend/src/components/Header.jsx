import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] w-full mt-20 md:w-11/12 h-auto  md:mt-24 mx-auto rounded-xl sm:mt-20  shadow">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 pt-8 pb-4 gap-8">
                <div className="flex-1 min-w-[200px]">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 m-0">
                        Your Health, <span className="text-blue-600">Our Priority</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 my-4">
                        Book appointments, consult top doctors, and manage your health records easily.
                    </p>
                    <a
                        href="#speciality"
                        className="inline-block bg-blue-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold text-base md:text-lg no-underline shadow-md mt-4 hover:bg-blue-700 transition"
                    >
                        Explore Specialities
                    </a>
                </div>
                <div className="flex-1 min-w-[200px] text-center">
                    <img
                        src={assets.header_img}
                        alt="Header"
                        className="w-4/5 md:w-full max-w-xs md:max-w-md mx-auto rounded-xl shadow-lg"
                    />
                </div>
            </section>
        </header>
    );
};

export default Header;
