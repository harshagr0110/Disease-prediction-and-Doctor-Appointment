import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/Admincontext';

const DoctorsList = () => {
  const { aToken, doctors, getalldoctors,changeAvaliability } = useContext(AdminContext);
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    if (aToken) {
      getalldoctors();
    }
  }, [aToken]);

  useEffect(() => {
    // Initialize availability state once doctors are fetched
    if (doctors && doctors.length > 0) {
      const initialState = {};
      doctors.forEach((doc) => {
        initialState[doc._id] = doc.available;
      });
      setAvailability(initialState);
    }
  }, [doctors]);

  const toggleAvailability = (id) => {
    changeAvaliability(id);
    setAvailability((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Doctors List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={doctor.image}
                alt={doctor.fullName}
                className="w-full h-60 object-cover object-top rounded-md mb-4"
              />

              <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
              <p className="text-blue-700 font-medium">{doctor.speciality}</p>
              <p className="text-sm text-gray-600">Degree: {doctor.degree}</p>
              <p className="text-sm text-gray-600">Experience: {doctor.experience} years</p>
              <p className="text-sm text-gray-600">Fees: ₹{doctor.fees}</p>
              <p className="text-sm text-gray-600">Email: {doctor.email}</p>
              <p className="text-sm text-gray-600">Address: {doctor.address}</p>

              <div className="mt-3 flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={availability[doctor._id] || false}
                  onChange={() => toggleAvailability(doctor._id)}
                  className="h-5 w-5 text-blue-600"
                />
                <label className="text-sm font-medium">
                  {availability[doctor._id] ? 'Available' : 'Not Available'}
                </label>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No doctors found.</div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
