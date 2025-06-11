// --- src/components/AddDoctors.jsx ---
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from '../../context/Admincontext';

const AddDoctors = () => {
  const { backendurl, aToken } = useContext(AdminContext);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    speciality: '',
    degree: '',
    experience: '',
    about: '',
    fees: '',
    address: '',
    available: true,
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setForm((prev) => ({ ...prev, available: e.target.checked }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    // Ensure numeric fields
    const payload = {
      ...form,
      experience: Number(form.experience),
      fees: Number(form.fees),
    };

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post(
        `${backendurl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      toast.success('Doctor added successfully', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setForm({
        fullName: '',
        email: '',
        password: '',
        speciality: '',
        degree: '',
        experience: '',
        about: '',
        fees: '',
        address: '',
        available: true,
        image: null,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add doctor', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } finally {
      setLoading(false);
    }
  };

  // Tailwind: blue with a hint of green (teal)
  const mainColor = 'bg-teal-600 hover:bg-teal-700';
  const accentColor = 'focus:ring-teal-500';

  return (
    <div className="min-h-screen bg-white/90 flex items-center justify-center p-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-teal-800"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-700">Add Doctor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'fullName', label: 'Full Name' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'speciality', label: 'Speciality' },
            { name: 'degree', label: 'Degree' },
            { name: 'experience', label: 'Experience (years)', type: 'number', min: 0 },
            { name: 'fees', label: 'Fees', type: 'number', min: 0 },
            { name: 'address', label: 'Address' },
          ].map(({ name, label, type = 'text', ...rest }) => (
            <div key={name}>
              <label className="block mb-1 text-sm font-semibold text-teal-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name] ?? ''}
                onChange={handleChange}
                required
                className={`w-full border border-teal-900 px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${accentColor} transition`}
                {...rest}
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-semibold text-teal-700">About</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              required
              rows={3}
              className={`w-full border border-teal-900 px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${accentColor} transition`}
            />
          </div>

          <div className="md:col-span-2 flex items-center space-x-2">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleCheckboxChange}
              className="w-5 h-5 accent-teal-600"
            />
            <label className="text-sm font-semibold text-teal-700">Available</label>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-semibold text-teal-700">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full border border-teal-900 px-3 py-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full ${mainColor} text-white py-3 rounded-md font-semibold transition flex items-center justify-center`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : null}
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddDoctors;