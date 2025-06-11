import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🚀 Import useNavigate
import { toast } from "react-toastify";
import { AdminContext } from "../context/Admincontext";
import { DoctorContext } from "../context/Doctorcontext";

const Login = () => {
  const { backendurl, setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate(); // 🚀 Initialize navigate function

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("admin"); // "admin" or "doctor"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setForm({ email: "", password: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "";
      let tokenKey = "";
      let setToken = null;
      let redirectPath = "";

      if (loginType === "admin") {
        url = `${backendurl}/api/admin/login`;
        tokenKey = "aToken";
        setToken = setAToken;
        redirectPath = "/admin-dashboard"; // 🚀 Admin redirect path
      } else {
        url = `${backendurl}/api/doctor/login`;
        tokenKey = "dToken";
        setToken = setDToken;
        redirectPath = "/doctor-dashboard"; // 🚀 Doctor redirect path
      }

      const response = await axios.post(url, {
        email: form.email,
        password: form.password,
      });

      if (response.data.success && response.data.token) {
        localStorage.setItem(tokenKey, response.data.token);
        if(loginType==="admin") {
          setDToken('');
          localStorage.removeItem('dToken');
        }
        else{
          setAToken('');
          localStorage.removeItem('aToken');
        }
        setToken(response.data.token);
        toast.success("Logged in successfully!");

        navigate(redirectPath); // 🚀 Redirect to correct dashboard
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
        <div className="flex mb-6">
          <button
            type="button"
            className={`flex-1 py-2 rounded-l font-bold ${
              loginType === "admin"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleLoginTypeChange("admin")}
          >
            Admin Login
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-r font-bold ${
              loginType === "doctor"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleLoginTypeChange("doctor")}
          >
            Doctor Login
          </button>
        </div>
        <h2 className="mb-6 text-center text-2xl font-semibold">
          {loginType === "admin" ? "Admin Login" : "Doctor Login"}
        </h2>
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