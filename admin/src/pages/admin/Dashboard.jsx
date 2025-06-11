import React, { useEffect, useContext, useState } from "react";
import { AdminContext } from "../../context/Admincontext";
import axios from "axios";

// Toast notification (simple, tailwind-based)
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg flex items-center gap-3
      ${type === "success"
        ? "bg-green-100 text-green-800 border border-green-300"
        : "bg-red-100 text-red-800 border border-red-300"
      }`}
  >
    <span>{message}</span>
    <button className="ml-2 text-xl leading-none" onClick={onClose}>&times;</button>
  </div>
);

const Dashboard = () => {
  const { aToken, backendurl } = useContext(AdminContext);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendurl}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if (data.success) {
        setDoctors(data.doctors);
        setAppointments(data.appointments);
        setUsers(data.users);
        showToast("Dashboard data loaded!", "success");
      } else {
        showToast("Failed to load dashboard data.", "error");
      }
    } catch (error) {
      showToast("Error fetching dashboard data.", "error");
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (aToken) getData();
    // eslint-disable-next-line
  }, [aToken]);

  const totalRevenue = appointments.reduce(
    (sum, appt) => (appt.paymentStatus === "paid" ? sum + appt.amount : sum),
    0
  );
  const pendingPayments = appointments.filter(
    (appt) => appt.paymentStatus === "pending"
  ).length;
  const completedAppointments = appointments.filter((appt) => appt.isCompleted)
    .length;
  const cancelledAppointments = appointments.filter((appt) => appt.cancelled)
    .length;

  if (loading) {
    return (
      <div className="w-full h-2 bg-gradient-to-r from-blue-200 via-green-200 to-blue-100 rounded animate-pulse mt-4 mb-8" />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      <div className="w-full max-w-6xl mx-auto p-4 md:p-10 rounded-2xl shadow-xl bg-white/95 backdrop-blur">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-violet-950 bg-clip-text bg-white/70 drop-shadow">
          Admin Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-blue-200 rounded-xl shadow p-5 flex flex-col items-center hover:scale-105 transition-transform duration-150">
            <div className="bg-blue-200 text-blue-700 rounded-full p-3 mb-2 shadow">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
            </div>
            <div className="text-gray-600 text-xs">Users</div>
            <div className="text-xl font-bold text-blue-900">{users.length}</div>
          </div>
          <div className="bg-green-100 rounded-xl shadow p-5 flex flex-col items-center hover:scale-105 transition-transform duration-150">
            <div className="bg-green-200 text-green-700 rounded-full p-3 mb-2 shadow">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zm0 10c-4.41 0-8-1.79-8-4V6c0-2.21 3.59-4 8-4s8 1.79 8 4v8c0 2.21-3.59 4-8 4z" /></svg>
            </div>
            <div className="text-gray-600 text-xs">Doctors</div>
            <div className="text-xl font-bold text-green-900">{doctors.length}</div>
          </div>
          <div className="bg-blue-100 rounded-xl shadow p-5 flex flex-col items-center hover:scale-105 transition-transform duration-150">
            <div className="bg-blue-100 text-blue-700 rounded-full p-3 mb-2 shadow">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div className="text-gray-600 text-xs">Appointments</div>
            <div className="text-xl font-bold text-blue-900">{appointments.length}</div>
          </div>
          <div className="bg-green-100 rounded-xl shadow p-5 flex flex-col items-center hover:scale-105 transition-transform duration-150">
            <div className="bg-green-100 text-green-700 rounded-full p-3 mb-2 shadow">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zm0 10c-4.41 0-8-1.79-8-4V6c0-2.21 3.59-4 8-4s8 1.79 8 4v8c0 2.21-3.59 4-8 4z" /></svg>
            </div>
            <div className="text-gray-600 text-xs">Revenue</div>
            <div className="text-xl font-bold text-green-900">₹{totalRevenue}</div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold mb-4 text-center text-blue-700">Recent Appointments</h2>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-white text-left">
                  <th className="py-2 px-4 font-semibold">Patient</th>
                  <th className="py-2 px-4 font-semibold">Doctor</th>
                  <th className="py-2 px-4 font-semibold">Date & Time</th>
                  <th className="py-2 px-4 font-semibold">Amount</th>
                  <th className="py-2 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map((appointment, idx) => (
                  <tr key={appointment._id} className={`border-t ${idx % 2 === 0 ? "bg-blue-50" : "bg-white"}`}>
                    <td className="py-2 px-4  ">
                      {appointment.userData?.image && (
                        <img
                          src={appointment.userData.image}
                          alt={appointment.userData.fullName}
                          className="w-8 h-8 rounded-full mr-2 border-2 border-blue-200 shadow"
                        />
                      )}
                      <span className="font-medium">{appointment.userData?.fullName}</span>
                    </td>
                    <td className="py-2 px-4 ">
                      {appointment.docData?.image && (
                        <img
                          src={appointment.docData.image}
                          alt={appointment.docData.fullName}
                          className="w-8 h-8 rounded-full mr-2 border-2 border-green-200 shadow"
                        />
                      )}
                      <span className="font-medium">{appointment.docData?.fullName}</span>
                    </td>
                    <td className="py-2 px-4">
                      <span className="bg-blue-50 px-2 py-1 rounded text-xs font-semibold">
                        {appointment.slotDate?.replace(/_/g, "/")} at {appointment.slotTime}
                      </span>
                    </td>
                    <td className="py-2 px-4 font-semibold text-green-700">₹{appointment.amount}</td>
                    <td className="py-2 px-4">
                      {appointment.cancelled ? (
                        <span className="text-red-500 font-semibold bg-red-50 px-2 py-1 rounded">Cancelled</span>
                      ) : appointment.paymentStatus === "paid" ? (
                        <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">Completed</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold bg-yellow-50 px-2 py-1 rounded">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-xl shadow p-6 flex flex-col items-center">
            <h3 className="font-semibold mb-4 text-3xl text-blue-700">Appointment Status</h3>
            <div className="flex justify-between w-full">
              <div className="text-center flex-1">
                <div className="text-2xl font-extrabold text-green-700">{completedAppointments}</div>
                <div className="text-gray-500 text-xs">Completed</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-2xl font-extrabold text-yellow-700">{pendingPayments}</div>
                <div className="text-gray-500 text-xs">Pending Payment</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-2xl font-extrabold text-red-700">{cancelledAppointments}</div>
                <div className="text-gray-500 text-xs">Cancelled</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-3xl text-blue-700 text-center">Recent Doctors</h3>
            <ul>
              {doctors.slice(0, 3).map((doctor) => (
                <li key={doctor._id} className="flex items-center mb-4 last:mb-0">
                  {doctor.image && (
                    <img
                      src={doctor.image}
                      alt={doctor.fullName}
                      className="w-9 h-9 rounded-full mr-3 border-2 border-green-200 shadow"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-800">{doctor.fullName}</div>
                    <div className="text-green-500 text-xs">{doctor.specialization}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
