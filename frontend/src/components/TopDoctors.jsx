import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className="bg-white/90 rounded-2xl shadow-2xl py-12 px-2 sm:px-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl text-blue-800 font-extrabold mb-3 font-sans tracking-tight drop-shadow">
                    Top Doctors to Book
                </h1>
                <p className="text-blue-700 font-serif text-lg">
                    Browse our top doctors and book your appointment with ease
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
                {doctors.slice(0, 10).map((doctor) => (
                    <div
                        key={doctor._id}
                        onClick={() => navigate(`/appointment/${doctor._id}`)}
                        className="bg-white/90 rounded-2xl shadow-lg flex flex-col items-center p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border border-green-100 hover:border-green-300"
                    >
                        <div className="relative mb-4">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-28 h-28 object-cover rounded-full border-4 border-blue-200 shadow-lg"
                            />
                            <span className="absolute bottom-2 right-2 bg-green-400 border-2 border-white rounded-full w-4 h-4"></span>
                        </div>
                        <h2 className="text-xl font-bold text-green-800 text-center mb-1">{doctor.fullName}</h2>
                        <p className="text-sm text-blue-700 font-medium text-center mb-1">{doctor.speciality}</p>
                        <p className="text-xs text-gray-500 text-center">{doctor.location}</p>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10">
                <button
                    className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg"
                    onClick={() => {
                        navigate('/doctors');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    SHOW MORE
                </button>
            </div>
        </div>
    );
};

export default TopDoctors;
