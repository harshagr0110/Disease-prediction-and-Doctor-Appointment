import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Enhanced theme colors and styles
const theme = {
  primary: "bg-gradient-to-br from-green-100 via-blue-50 to-blue-100",
  card: "bg-white/90 backdrop-blur-lg border border-green-200 shadow-2xl",
  accent: "text-green-700",
  button: "bg-gradient-to-r from-green-400 to-blue-400",
  buttonHover: "hover:from-green-500 hover:to-blue-500",
  input: "border-green-200 focus:ring-green-300",
  label: "text-green-700 font-medium",
};

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
    // eslint-disable-next-line
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
        toast.success("Profile updated successfully!", { position: "top-center" });
      } else {
        toast.error(response.data.message || "Update failed", { position: "top-center" });
      }
    } catch (err) {
      toast.error("Profile Update Error", { position: "top-center" });
    }
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setEditMode(false);
    setImageFile(null);
  };

  if (!userData) return null;

  return (
    <div className={`${theme.primary} min-h-screen flex flex-col items-center justify-center py-12 px-4`}>
      <ToastContainer />
      <div
        className={`${theme.card} w-full max-w-4xl mx-auto rounded-3xl p-12 flex flex-col md:flex-row items-center gap-12 transition-all duration-300`}
        style={{
          minHeight: "600px",
        }}
      >
        {/* Profile Image Section */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="relative">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-green-300 shadow-xl"
            />
            {editMode && (
              <label className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 cursor-pointer shadow-lg hover:bg-green-600 transition">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2H7a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2z" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <h2 className="text-3xl font-bold mt-6 text-center text-blue-700 tracking-tight">
            My Profile
          </h2>
        </div>
        {/* Profile Form Section */}
        <form className="w-full md:w-2/3 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`${theme.label} mb-1 block`}>Full Name:</label>
              {editMode ? (
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${theme.input} transition`}
                  autoComplete="off"
                />
              ) : (
                <div className="text-gray-900 font-semibold">{profile.fullName}</div>
              )}
            </div>
            <div>
              <label className={`${theme.label} mb-1 block`}>Email:</label>
              <div className="text-gray-900 font-semibold">{profile.email}</div>
            </div>
            <div>
              <label className={`${theme.label} mb-1 block`}>Phone:</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${theme.input} transition`}
                  autoComplete="off"
                />
              ) : (
                <div className="text-gray-900 font-semibold">{profile.phone}</div>
              )}
            </div>
            <div>
              <label className={`${theme.label} mb-1 block`}>Address:</label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${theme.input} transition`}
                  autoComplete="off"
                />
              ) : (
                <div className="text-gray-900 font-semibold">{profile.address}</div>
              )}
            </div>
            <div>
              <label className={`${theme.label} mb-1 block`}>Gender:</label>
              {editMode ? (
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${theme.input} transition`}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <div className="text-gray-900 font-semibold">{profile.gender}</div>
              )}
            </div>
            <div>
              <label className={`${theme.label} mb-1 block`}>Date of Birth:</label>
              {editMode ? (
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${theme.input} transition`}
                />
              ) : (
                <div className="text-gray-900 font-semibold">{profile.dob}</div>
              )}
            </div>
          </div>
          <div className="flex gap-4 mt-8 w-full justify-center">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  type="button"
                  className={`flex-1 ${theme.button} ${theme.buttonHover} text-white py-2 rounded-xl font-semibold shadow-md transition`}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl font-semibold shadow-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                type="button"
                className={`flex-1 ${theme.button} ${theme.buttonHover} text-white py-2 rounded-xl font-semibold shadow-md transition`}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
      <style>{`
        body {
          background: linear-gradient(135deg, #e0f7fa 0%, #e8f5e9 100%);
        }
      `}</style>
    </div>
  );
};

export default Myprofile;