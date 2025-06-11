import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/Doctorcontext';

const DoctorDashboard = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const total = appointments.length;
  const completed = appointments.filter((a) => a.isCompleted).length;
  const cancelled = appointments.filter((a) => a.cancelled).length;
  const pending = total - completed - cancelled;

  const latest = [...appointments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">DOCTOR DASHBOARD</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Appointments" value={total} color="bg-blue-600 text-white" border="border-blue-700" />
        <StatCard label="Completed" value={completed} color="bg-green-500 text-white" border="border-green-600" />
        <StatCard label="Pending" value={pending} color="bg-blue-200 text-blue-900" border="border-blue-300" />
        <StatCard label="Cancelled" value={cancelled} color="bg-red-200 text-red-800" border="border-red-300" />
      </div>

      {/* Recent Appointments */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-800">RECENT APPOINTMENTS</h2>
        {latest.length === 0 ? (
          <p className="text-gray-500">No recent appointments found.</p>
        ) : (
          <div className="space-y-4">
            {latest.map((app) => (
              <div
                key={app._id}
                className="p-4 bg-white rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-blue-100 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={app.userData?.image}
                    alt={app.userData?.fullName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div>
                    <p className="font-medium text-blue-900">{app.userData?.fullName}</p>
                    <p className="text-sm text-blue-600">{app.slotDate} at {app.slotTime}</p>
                  </div>
                </div>

                <div className="text-sm font-medium">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      app.cancelled
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : app.isCompleted
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {app.cancelled
                      ? 'Cancelled'
                      : app.isCompleted
                      ? 'Completed'
                      : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, border }) => (
  <div className={`rounded-xl p-4 shadow bg-white flex flex-col items-center justify-center border-2 ${border}`}>
    <p className={`text-2xl font-bold mb-1 ${color}`}>{value}</p>
    <p className="text-sm text-blue-700">{label}</p>
  </div>
);

export default DoctorDashboard;
