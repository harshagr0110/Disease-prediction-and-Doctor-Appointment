import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Myprofile = () => {
  const { userData, setUserData, backendurl, token } = useContext(AppContext);

  const initialProfile = {
    fullName: userData?.fullName || "John Doe",
    email: userData?.email || "john.doe@example.com",
    phone: userData?.phone || "+1 234 567 890",
    address: userData?.address || "123 Main St, City, Country",
    gender: userData?.gender || "Male",
    dob: userData?.dob || "1990-01-01",
    profileImage: userData?.image || assets.profile_pic,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!editMode) {
      setProfile(initialProfile);
      setImageFile(null);
    }
  }, [userData, editMode]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "date" ? new Date(value).toISOString().split("T")[0] : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfile((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", profile.fullName);
      formData.append("phone", profile.phone);
      formData.append("address", profile.address);
      formData.append("dob", profile.dob);
      formData.append("gender", profile.gender);
      if (imageFile) formData.append("image", imageFile);

      const response = await axios.post(`${backendurl}/api/user/update-profile`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setUserData(response.data.userData);
        setEditMode(false);
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (err) {
      console.error("Profile Update Error:", err);
    }
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setEditMode(false);
    setImageFile(null);
  };

  if (!userData) return null;

  return (
    <div className="my-10 max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border border-gray-200 w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={profile.profileImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
        />
        {editMode && (
          <input type="file" accept="image/*" onChange={handleImageChange} className="mt-3" />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Full Name:</label>
        {editMode ? (
          <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        ) : (
          <div className="text-gray-900">{profile.fullName}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email:</label>
        <div className="text-gray-900">{profile.email}</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Phone:</label>
        {editMode ? (
          <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        ) : (
          <div className="text-gray-900">{profile.phone}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Address:</label>
        {editMode ? (
          <input type="text" name="address" value={profile.address} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        ) : (
          <div className="text-gray-900">{profile.address}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Gender:</label>
        {editMode ? (
          <select name="gender" value={profile.gender} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
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
          <input type="string" name="dob" value={profile.dob} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        ) : (
          <div className="text-gray-900">{profile.dob}</div>
        )}
      </div>
      <div className="flex gap-3 mt-6">
        {editMode ? (
          <>
            <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Save</button>
            <button onClick={handleCancel} className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition">Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Edit</button>
        )}
      </div>
    </div>
  );
};

export default Myprofile;