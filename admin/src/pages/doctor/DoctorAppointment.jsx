import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/Doctorcontext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom Toast options for a greenish-blue theme
const toastOptions = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: {
    background: 'linear-gradient(90deg, #38b2ac 0%, #4299e1 100%)', // teal to blue
    color: '#fff',
    fontWeight: 500,
    borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(56,178,172,0.15)',
  },
};

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, backendurl } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
    // eslint-disable-next-line
  }, [dToken]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/cancel-appointment`,
        { id },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.success) {
        toast.success("Appointment cancelled", toastOptions);
        getAppointments();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel appointment', toastOptions);
    }
  };

  const handleComplete = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/complete-appointment`,
        { id },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.success) {
        toast.success("Appointment marked as completed", toastOptions);
        getAppointments();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to complete appointment', toastOptions);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-white min-h-screen">
      <ToastContainer />
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-700">MY APPOINTMENTS</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments available.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {appointments.map((app) => (
            <div
              key={app._id}
              className={`bg-white p-5 rounded-2xl shadow-md border border-teal-100 flex flex-col gap-2 transition-all ${
                app.cancelled ? 'opacity-60' : 'hover:shadow-lg'
              }`}
            >
              {/* Patient Info */}
              <div className="flex items-center gap-4">
                <img
                  src={app.userData?.image}
                  alt={app.userData?.fullName}
                  className="w-14 h-14 rounded-full object-cover border border-teal-200"
                />
                <div>
                  <p className="font-semibold text-teal-800">{app.userData?.fullName}</p>
                  <p className="text-sm text-gray-500">{app.userData?.email}</p>
                </div>
              </div>

              {/* Appointment Info */}
              <div className="text-sm mt-2 space-y-1">
                <p><span className="font-medium text-teal-700">Date:</span> {app.slotDate}</p>
                <p><span className="font-medium text-teal-700">Time:</span> {app.slotTime}</p>
                <p><span className="font-medium text-teal-700">Amount:</span> ₹{app.amount}</p>
                <p>
                  <span className="font-medium text-teal-700">Completed:</span>{' '}
                  <span className={app.isCompleted ? 'text-green-600' : 'text-gray-500'}>
                    {app.isCompleted ? 'Yes' : 'No'}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-teal-700">Cancelled:</span>{' '}
                  <span className={app.cancelled ? 'text-red-500' : 'text-gray-500'}>
                    {app.cancelled ? 'Yes' : 'No'}
                  </span>
                </p>
              </div>

              {/* Payment Status */}
              <div className="mt-2">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    app.paymentStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-teal-100 text-teal-700'
                  }`}
                >
                  {app.paymentStatus === 'pending' ? 'Payment Pending' : 'Paid'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleCancel(app._id)}
                  disabled={app.cancelled || app.isCompleted}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    app.cancelled || app.isCompleted
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {app.cancelled ? 'Cancelled' : 'Cancel'}
                </button>

                <button
                  onClick={() => handleComplete(app._id)}
                  disabled={app.cancelled || app.isCompleted}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    app.isCompleted
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                >
                  {app.isCompleted ? 'Completed' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
