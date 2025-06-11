import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// Custom Toastify options
const toastOptions = {
  position: 'top-center',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: Slide,
  theme: 'colored',
};

const MyAppointments = () => {
  const { backendurl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendurl}/api/user/appointments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch appointments', toastOptions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAppointments();
    // eslint-disable-next-line
  }, [token]);

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message, toastOptions);
        fetchAppointments();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel appointment', toastOptions);
    }
  };

  const handlePayOnline = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/create-stripe-session`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Could not initiate payment", toastOptions);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment processing failed", toastOptions);
    }
  };

  const formatDate = (dateString) => {
    return dateString?.replace(/_/g, '/') || 'N/A';
  };

  return (
    <div className=" min-h-screen bg-gray-200 flex flex-col items-center py-10 px-2">
      <ToastContainer />
      <div className="w-full bg-white/90 rounded-2xl shadow-xl p-6 md:p-10 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-2 text-center tracking-tight">
          My Appointments
        </h2>
        <p className="text-blue-700 mb-8 text-center text-lg font-medium">
          Manage your doctor appointments easily
        </p>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <svg className="animate-spin h-10 w-10 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <p className="text-blue-700 font-semibold">Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <img src="/empty-appointments.svg" alt="No appointments" className="w-32 h-32 mb-6 opacity-80" />
            <p className="text-gray-500 text-lg mb-4">No appointments found.</p>
            <button
              onClick={() => navigate('/doctors')}
              className="bg-indigo-400 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-green-500 hover:to-blue-500 transition"
            >
              Book an Appointment
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            {appointments.map((appt) => {
              const doc = appt.docData || {};
              return (
                <div
                  key={appt._id}
                  className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl p-5 gap-6 md:gap-10 transition hover:scale-[1.01] hover:shadow-2xl"
                >
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <img
                      src={doc.image || '/default-doctor.png'}
                      alt={doc.fullName}
                      className="w-48 h-48 rounded-full object-cover border-4 border-green-300 shadow"
                      onError={(e) => {
                        e.target.src = '/default-doctor.png';
                      }}
                    />
                    <span className="mt-2 text-xs text-blue-600 font-semibold  bg-blue-100 px-2 py-0.5 rounded-full">
                      {doc.speciality || 'General'}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center md:items-start">
                    <p className="text-2xl font-bold text-green-800">{doc.fullName || 'Doctor'}</p>
        
                    <div className="mt-2 flex flex-col gap-1 text-sm w-full">
                      <div>
                        <span className="font-semibold text-blue-700">Date & Time:</span>{' '}
                        <span className="text-gray-700">{formatDate(appt.slotDate)} | {appt.slotTime || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-green-700">Fees:</span>{' '}
                        <span className="text-gray-700">₹{appt.amount || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      {appt.cancelled ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
                          Cancelled
                        </span>
                      ) : appt.paymentStatus === 'paid' ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
                          Paid
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
                          Payment Pending
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-auto items-center">
                    {!appt.cancelled && appt.paymentStatus !== 'paid' && (
                      <button
                        onClick={() => handlePayOnline(appt._id)}
                        className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-green-500 hover:to-blue-500 transition w-full"
                      >
                        Pay Online
                      </button>
                    )}
                    {!appt.cancelled && (
                      <button
                        onClick={() => cancelAppointment(appt._id)}
                        className={`bg-gradient-to-r from-red-400 to-red-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-red-500 hover:to-red-600 transition w-full ${
                          appt.paymentStatus === 'paid' ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                        disabled={appt.paymentStatus === 'paid'}
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Decorative background shapes */}
      <div className="fixed top-0 left-0 w-40 h-40 bg-green-200 rounded-full opacity-30 -z-10 blur-2xl" />
      <div className="fixed bottom-0 right-0 w-56 h-56 bg-blue-200 rounded-full opacity-30 -z-10 blur-2xl" />
    </div>
  );
};

export default MyAppointments;