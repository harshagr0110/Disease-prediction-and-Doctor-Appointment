import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="max-w-4xl mt-20 mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
      <div className="grid gap-6">
        {doctors.slice(0, 2).map((doctor, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 gap-6"
          >
            <div className="flex-shrink-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold">{doctor.name}</p>
              <p className="text-blue-600">{doctor.speciality}</p>
              <p className="text-gray-600">{doctor.address.line1}</p>
              <p className="text-gray-600">{doctor.address.line2}</p>
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-medium text-gray-700">Date &amp; Time:</span> 25, July, 2023 | 10:00am
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Pay Online
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
