import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", fullName: "", password: "" });
  const { backendurl, token, setToken, setUserId } = useContext(AppContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const endpoint = isRegister ? "register" : "login";
    const url = `${backendurl}/api/user/${endpoint}`;
    const payload = isRegister
      ? { email: form.email, fullName: form.fullName, password: form.password }
      : { email: form.email, password: form.password };

    try {
      const response = await axios.post(url, payload);
      const data = response?.data;
      if (data?.success) {
        setSuccess(data.message || "Success!");
        setToken(data.token);
        setUserId(data.userId);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
      } else {
        setError(data?.message || "Operation failed");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unexpected error occurred"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-2 text-blue-600">
          {isRegister ? "Create Account" : "User Login"}
        </h2>
        <p className="text-center mb-6 text-gray-600">
          {isRegister
            ? "Register to access your account"
            : "Login to your account"}
        </p>
        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-3 py-2 rounded mb-3 text-sm">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-blue-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50"
              placeholder="user@email.com"
            />
          </div>
          {isRegister && (
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium text-blue-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete={isRegister ? "new-password" : "current-password"}
              className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold py-2 rounded shadow hover:from-blue-600 hover:to-green-500 transition"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="text-center mt-6">
          {isRegister ? (
            <>
              <span className="text-blue-700">Already have an account? </span>
              <button
                onClick={() => setIsRegister(false)}
                className="text-green-600 font-semibold hover:underline transition"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <span className="text-blue-700">New to our platform? </span>
              <button
                onClick={() => setIsRegister(true)}
                className="text-green-600 font-semibold hover:underline transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
