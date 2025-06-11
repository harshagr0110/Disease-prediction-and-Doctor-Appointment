// src/pages/Appointment.jsx

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaMapMarkerAlt, FaUserMd, FaGraduationCap, FaMoneyBillWave } from 'react-icons/fa';

const Appointment = () => {
  const daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const { docId } = useParams();
  const { doctors, backendurl, token } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [groupedSlots, setGroupedSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);

  const navigate = useNavigate();

  // Fetch doctor info
  useEffect(() => {
    if (doctors.length > 0) {
      const found = doctors.find(d => d._id === docId);
      setDocInfo(found || null);
    }
  }, [doctors, docId]);

  // Generate slots
  useEffect(() => {
    if (!docInfo) return;

    const generateSlots = () => {
      const allSlots = [];
      const today = new Date();

      for (let i = 0; i < 7; i++) {
        const currDate = new Date(today);
        currDate.setDate(currDate.getDate() + i);

        const endTime = new Date(currDate);
        endTime.setHours(21, 0, 0, 0);

        if (currDate.toDateString() === today.toDateString()) {
          const minutes = today.getMinutes();
          if (minutes < 30) {
            currDate.setHours(today.getHours(), 30, 0, 0);
          } else {
            currDate.setHours(today.getHours() + 1, 0, 0, 0);
          }
        } else {
          currDate.setHours(10, 0, 0, 0);
        }

        while (currDate < endTime) {
          const timestr = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          allSlots.push({
            date: new Date(currDate),
            time: timestr,
          });
          currDate.setMinutes(currDate.getMinutes() + 30);
        }
      }
      return allSlots;
    };

    setDocSlots(generateSlots());
  }, [docInfo]);

  // Group slots by date
  useEffect(() => {
    if (docSlots.length === 0) {
      setGroupedSlots({});
      return;
    }
    const groups = {};
    docSlots.forEach((slot) => {
      const year = slot.date.getFullYear();
      const month = (slot.date.getMonth() + 1).toString().padStart(2, '0');
      const day = slot.date.getDate().toString().padStart(2, '0');
      const key = `${year}-${month}-${day}`;
      if (!groups[key]) {
        const dayLabel = daysofweek[slot.date.getDay()];
        const monthName = slot.date.toLocaleString('default', { month: 'short' });
        const dateLabel = `${dayLabel}, ${monthName} ${slot.date.getDate()}`;
        groups[key] = { label: dateLabel, slots: [] };
      }
      groups[key].slots.push(slot);
    });
    setGroupedSlots(groups);
  }, [docSlots]);

  if (!docInfo) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-400"></div>
    </div>
  );

  const bookAppointment = async () => {
    if (!selectedSlot) {
      toast.info("Please select a slot", { position: "top-center", theme: "colored" });
      return;
    }
    if (!token) {
      toast.warning("Please login to book an appointment", { position: "top-center", theme: "colored" });
      return navigate("/login");
    }
    try {
      const date = selectedSlot.date;
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;
      const userId = localStorage.getItem("userId");
      const { data } = await axios.post(`${backendurl}/api/user/book-appointment`, {
        userId, docId, slotDate, slotTime: selectedSlot.time
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        toast.success("Appointment Booked Successfully!", { position: "top-center", theme: "colored", autoClose: 2000 });
        navigate("/my-appointments");
      } else {
        toast.error(data.message, { position: "top-center", theme: "colored" });
      }
    } catch (err) {
      toast.error("Oh no, something went wrong!", { position: "top-center", theme: "colored" });
    }
  };

  // Custom theme colors
  const theme = {
    primary: "bg-gradient-to-br from-green-100 via-blue-100 to-white",
    card: "bg-white border border-blue-100 shadow-lg rounded-2xl",
    accent: "text-green-700",
    accentBg: "bg-green-100",
    button: "bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white",
    slot: "bg-blue-50 border-blue-200 text-blue-900 hover:bg-green-100 hover:text-green-900",
    slotSelected: "bg-gradient-to-r from-green-400 to-blue-400 text-white border-green-500",
    slotDisabled: "bg-gray-200 text-gray-400 cursor-not-allowed",
    label: "text-blue-700 font-semibold",
    section: "mb-10",
  };

  return (
    <div className={`min-h-screen ${theme.primary} py-10 px-2 flex flex-col items-center`}>
      {/* Doctor Info */}
      <div className={`${theme.card} w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-8 p-8 mt-10`}>
        <img
          src={docInfo.image}
          alt={docInfo.name}
          className="w-40 h-40 rounded-full object-cover border-4 border-green-200 shadow-lg mx-auto md:mx-0"
        />
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-1">{docInfo.fullName}</h1>
          <div className="flex items-center gap-2 text-lg mb-2">
            <FaUserMd className="text-green-500" />
            <span className="text-green-700 font-medium">{docInfo.speciality}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 mb-1">
            <FaGraduationCap className="text-blue-400" />
            <span>{docInfo.degree} • {docInfo.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 mb-1">
            <FaMoneyBillWave className="text-green-400" />
            <span className="font-semibold text-blue-700">₹{docInfo.fees} Consultation Fee</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <FaMapMarkerAlt className="text-blue-400" />
            <span>
              {docInfo.address}
            </span>
          </div>
          <div className="mt-4 text-sm text-gray-700 italic text-center md:text-left">
            {docInfo.about}
          </div>
        </div>
      </div>

      {/* Slots Section */}
      <div className={`${theme.card} w-full max-w-4xl mt-8 p-8 ${theme.section}`}>
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Available Slots</h2>
        {Object.keys(groupedSlots).length === 0 ? (
          <p className="text-gray-500 text-center">No slots available.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {Object.entries(groupedSlots).map(([dateKey, info]) => (
              <div key={dateKey}>
                <h3 className={`mb-3 ${theme.label} text-lg text-center`}>{info.label}</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {info.slots.map((slotObj, idx) => {
                    const slotIdentifier = `${dateKey}-${slotObj.time}`;
                    const isSelected =
                      selectedSlot &&
                      selectedSlot.date.toDateString() === slotObj.date.toDateString() &&
                      selectedSlot.time === slotObj.time;
                    return (
                      <button
                        key={slotIdentifier}
                        onClick={() =>
                          setSelectedSlot({
                            date: new Date(slotObj.date),
                            time: slotObj.time,
                          })
                        }
                        className={`
                          px-4 py-2 rounded-xl border font-semibold transition-all duration-150
                          ${isSelected ? theme.slotSelected : theme.slot}
                          focus:outline-none
                        `}
                      >
                        {slotObj.time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Slot & Confirmation */}
      {selectedSlot && (
        <div className={`${theme.card} w-full max-w-2xl mt-6 p-6 flex flex-col items-center`}>
          <h4 className="text-lg font-bold text-blue-800 mb-2">Selected Appointment</h4>
          <div className="flex flex-col md:flex-row gap-4 items-center mb-2">
            <span className="text-green-700 font-semibold">
              {selectedSlot.date.toLocaleDateString([], {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="text-blue-700 font-semibold">
              {selectedSlot.time}
            </span>
          </div>
          <button
            className={`mt-4 px-8 py-3 rounded-xl font-bold shadow-md ${theme.button} transition-all duration-150`}
            onClick={bookAppointment}
          >
            Confirm Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointment;
