// src/pages/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", fullName: "", password: "" });

  const { backendurl, token, setToken,userId, setUserId } = useContext(AppContext);
  const navigate = useNavigate();

  // Redirect on successful login/register
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.fullName]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "register" : "login";
    const url = `${backendurl}/api/user/${endpoint}`;

    // Build payload
    const payload = isRegister
      ? { email: form.email, fullName: form.fullName, password: form.password }
      : { email: form.email, password: form.password };

    try {
      const response = await axios.post(url, payload);
      const data = response?.data;

      if (data?.success) {
        toast.success(data.message || "Success!");
        setToken(data.token);
        setUserId(data.userId);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
      } else {
        toast.error(data?.message || "Operation failed");
      }
    } catch (err) {
      console.error("Auth Error:", err);
      // Safely read error message
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Unexpected error occurred";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isRegister ? "Register" : "Login"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            fullName="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {isRegister && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">fullName</label>
            <input
              type="text"
              fullName="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            fullName="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <div className="text-center mt-4">
        {isRegister ? (
          <>
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={() => setIsRegister(false)}
              className="text-blue-600 hover:underline ml-1"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-600">New user? </span>
            <button
              onClick={() => setIsRegister(true)}
              className="text-blue-600 hover:underline ml-1"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;