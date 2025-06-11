import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/Doctorcontext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, backendurl } = useContext(DoctorContext);
  const [doctor, setDoctor] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchDoctorProfile = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/doctor/profile`,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );
      if (data.success) {
        setDoctor(data.doctor);
        setFormData(data.doctor);
      }
    } catch (error) {
      console.error('Error loading doctor profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAvailability = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/update-availability`,
        {},
        {
          headers: { Authorization: `Bearer ${dToken}` },
        }
      );
      toast.success("Availability updated");
      fetchDoctorProfile();
    } catch (err) {
      toast.error("Failed to update availability");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post(`${backendurl}/api/doctor/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${dToken}`,
        },
      });
      toast.success("Profile updated successfully");
      setEditing(false);
      fetchDoctorProfile();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    if (dToken) {
      fetchDoctorProfile();
    }
  }, [dToken]);

  if (!doctor) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-20 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-10 flex flex-col md:flex-row gap-10 border border-black">
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <img
            src={doctor.image}
            alt={doctor.fullName}
            className="w-64 h-64 rounded-2xl object-cover border-4 border-blue-200 shadow-lg"
            onError={(e) => {
              e.target.src = '/default-doctor.png';
            }}
          />
          <h3 className="text-3xl font-bold mt-6 text-blue-800">{doctor.fullName}</h3>
          <p className="text-lg text-blue-600">{doctor.email}</p>
          <div className="mt-4">
            <button
              onClick={toggleAvailability}
              className={`px-5 py-2 rounded-full text-sm font-semibold shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                doctor.available
                  ? 'bg-gradient-to-r from-green-300 to-blue-300 text-green-900 hover:from-green-400 hover:to-blue-400'
                  : 'bg-gradient-to-r from-red-200 to-blue-200 text-red-700 hover:from-red-300 hover:to-blue-300'
              }`}
            >
              {doctor.available ? 'Available' : 'Not Available'}
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-base">
            <Info label="Speciality" value={editing ? (
              <input 
                name="speciality" 
                value={formData.speciality || ''} 
                onChange={handleChange} 
                className="input border border-blue-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
            ) : doctor.speciality} />
            
            <Info label="Degree" value={editing ? (
              <input 
                name="degree" 
                value={formData.degree || ''} 
                onChange={handleChange} 
                className="input border border-blue-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
            ) : doctor.degree} />
            
            <Info label="Experience" value={editing ? (
              <input 
                name="experience" 
                type="number" 
                value={formData.experience || ''} 
                onChange={handleChange} 
                className="input border border-blue-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
            ) : `${doctor.experience} years`} />
            
            <Info label="Fees" value={editing ? (
              <input 
                name="fees" 
                type="number" 
                value={formData.fees || ''} 
                onChange={handleChange} 
                className="input border border-blue-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
            ) : `₹${doctor.fees}`} />
            
            <Info label="Address" value={editing ? (
              <input 
                name="address" 
                value={formData.address || ''} 
                onChange={handleChange} 
                className="input border border-blue-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
            ) : doctor.address} />
          </div>

          <div className="mt-10">
            <h4 className="font-semibold text-xl mb-2 text-blue-700">About</h4>
            {editing ? (
              <textarea 
                name="about" 
                value={formData.about || ''} 
                onChange={handleChange} 
                className="w-full border border-blue-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                rows="5" 
              />
            ) : (
              <p className="text-gray-700 text-lg leading-relaxed bg-gradient-to-r from-blue-50 via-green-50 to-blue-100 rounded-xl p-5 shadow-inner">
                {doctor.about}
              </p>
            )}
          </div>

          <div className="mt-6">
            {editing ? (
              <div className="flex gap-4">
                <button 
                  onClick={handleUpdate} 
                  className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => {
                    setEditing(false);
                    setFormData(doctor);
                  }} 
                  className="bg-gradient-to-r from-gray-200 to-blue-100 text-gray-800 px-6 py-2 rounded-lg shadow hover:from-gray-300 hover:to-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setEditing(true)} 
                className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 px-6 py-2 rounded-lg shadow hover:from-blue-200 hover:to-green-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-blue-600 font-medium mb-1">{label}</p>
    <div className="font-semibold text-gray-800">{value}</div>
  </div>
);

export default DoctorProfile;