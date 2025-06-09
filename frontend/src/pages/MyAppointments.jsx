import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendurl, token } = useContext(AppContext);
  const [appointment, setAppointment] = useState([]);

  // Fetch appointments
  const getuserappointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/user/appointments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) setAppointment(data.appointments.reverse());
    } catch (err) {
      toast.error(err.message || 'Failed to fetch appointments');
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) getuserappointments();
  }, [token]);

  // Cancel appointment function
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getuserappointments(); // Refresh the list after cancel
      }
    } catch (err) {
      toast.error('Failed to cancel appointment');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mt-20 mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
      <div className="grid gap-6">
        {appointment.length === 0 && (
          <p className="text-center text-gray-500">No appointments found.</p>
        )}

        {appointment.map((appt, index) => {
          const doc = appt.docData || {};
          const apptDate = appt.slotDate?.replace(/_/g, '/'); // "15_6_2025" → "15/6/2025"
          const apptTime = appt.slotTime;

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 gap-6"
            >
              <div className="flex-shrink-0">
                <img
                  src={doc.image}
                  alt={doc.fullName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">{doc.fullName}</p>
                <p className="text-blue-600">{doc.speciality}</p>
                <p className="text-gray-600">{doc.address}</p>
                <p className="mt-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Date &amp; Time:</span>{' '}
                  {apptDate} | {apptTime}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Fees:</span> ₹{doc.fees}
                </p>
                {appt.cancelled && (
                  <p className="text-red-500 font-medium mt-1">Cancelled</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {!appt.payment && !appt.cancelled && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Pay Online
                  </button>
                )}

                {!appt.cancelled && (
                  <button
                    onClick={() => cancelAppointment(appt._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
