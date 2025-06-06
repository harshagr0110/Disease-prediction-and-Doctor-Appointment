// --- src/components/AddDoctors.jsx ---
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
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

      toast.success('Doctor added successfully');
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
      console.error('Add doctor error:', err.response?.data);
      toast.error(err.response?.data?.message || 'Failed to add doctor');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Add Doctor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['fullName', 'email', 'password', 'speciality', 'degree', 'experience', 'fees', 'address'].map((field) => (
            <div key={field}>
              <label className="block mb-1 text-sm font-semibold capitalize">
                {field}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={form[field] ?? ''}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-semibold">About</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2 flex items-center space-x-2">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleCheckboxChange}
              className="w-5 h-5"
            />
            <label className="text-sm font-semibold">Available</label>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-semibold">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full border px-3 py-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDoctors;