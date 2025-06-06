import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/Admincontext";

const Login = () => {
  const { backendurl, setAToken } = useContext(AdminContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendurl}/api/admin/login`, {
        email: form.email,
        password: form.password,
      });

      if (response.data.success && response.data.token) {
        localStorage.setItem("aToken", response.data.token);
        setAToken(response.data.token);
        toast.success("Logged in successfully!");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md min-w-[320px] w-full max-w-sm"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold">Admin Login</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-2 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mt-2 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-700 text-white rounded font-bold hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
