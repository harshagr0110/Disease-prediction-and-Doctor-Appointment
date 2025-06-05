import React, { useState } from 'react';
import { assets } from '../assets/assets';

const initialProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 890',
  address: '123 Main St, City, Country',
  gender: 'Male',
  dob: '1990-01-01',
  profileImage: assets.profile_pic
};

const Myprofile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = () => setEditMode(true);

  const handleSave = () => {
    setEditMode(false);
    // Add logic to save the profile to backend
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setEditMode(false);
    setImagePreview(null);
  };

  return (
    <div className="my-10 max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border border-gray-200 w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            imagePreview ||
            (profile.profileImage && typeof profile.profileImage !== 'string'
              ? URL.createObjectURL(profile.profileImage)
              : profile.profileImage) ||
            'https://via.placeholder.com/120'
          }
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
        />
        {editMode && (
          <div className="mt-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Name:</label>
        {editMode ? (
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <div className="text-gray-900">{profile.name}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email:</label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <div className="text-gray-900">{profile.email}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Phone:</label>
        {editMode ? (
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <div className="text-gray-900">{profile.phone}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Address:</label>
        {editMode ? (
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <div className="text-gray-900">{profile.address}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Gender:</label>
        {editMode ? (
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        ) : (
          <div className="text-gray-900">{profile.gender}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Date of Birth:</label>
        {editMode ? (
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <div className="text-gray-900">{profile.dob}</div>
        )}
      </div>
      <div className="flex gap-3 mt-6">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Myprofile;
