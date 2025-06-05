// src/pages/Appointment.jsx

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Appointment = () => {
  const daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);      // flat array of { date: Date, time: "hh:mm AM/PM" }
  const [groupedSlots, setGroupedSlots] = useState({}); // { "2025-06-05": { label: "Thursday, Jun 5", slots: [...] } , ... }
  const [selectedSlot, setSelectedSlot] = useState(null); // { date: Date, time: string }

  // 1. Fetch doctor info once `doctors` is available
  useEffect(() => {
    if (doctors.length > 0) {
      const found = doctors.find(d => d._id === docId);
      setDocInfo(found || null);
    }
  }, [doctors, docId]);

  // 2. Generate slots whenever docInfo becomes non-null
  useEffect(() => {
    if (!docInfo) return;

    const generateSlots = () => {
      const allSlots = [];
      const today = new Date();

      for (let i = 0; i < 7; i++) {
        // Clone today's date and add i days
        const currDate = new Date(today);
        currDate.setDate(currDate.getDate() + i);

        // Set end‐of‐day boundary at 9:00 PM of currDate
        const endTime = new Date(currDate);
        endTime.setHours(21, 0, 0, 0);

        // If it's “the same day as today”, start from the next half‐hour (or now rounded to next 30 minutes)
        if (currDate.toDateString() === today.toDateString()) {
          const minutes = today.getMinutes();
          if (minutes < 30) {
            currDate.setHours(today.getHours(), 30, 0, 0);
          } else {
            currDate.setHours(today.getHours() + 1, 0, 0, 0);
          }
        } else {
          // For future days, start at 10:00 AM
          currDate.setHours(10, 0, 0, 0);
        }

        // Build half‐hour slots from “currDate” until 9:00 PM
        while (currDate < endTime) {
          const timestr = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          allSlots.push({
            date: new Date(currDate), // capture a copy
            time: timestr,
          });
          // Move forward by 30 minutes
          currDate.setMinutes(currDate.getMinutes() + 30);
        }
      }

      return allSlots;
    };

    const slots = generateSlots();
    setDocSlots(slots);
  }, [docInfo]);

  // 3. Whenever `docSlots` changes, group them by date-string (YYYY-MM-DD)
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
      const key = `${year}-${month}-${day}`; // e.g. "2025-06-05"

      if (!groups[key]) {
        // e.g. "Thursday, Jun 5"
        const dayLabel = daysofweek[slot.date.getDay()];
        const monthName = slot.date.toLocaleString('default', { month: 'short' });
        const dateLabel = `${dayLabel}, ${monthName} ${slot.date.getDate()}`;
        groups[key] = { label: dateLabel, slots: [] };
      }
      groups[key].slots.push(slot);
    });

    setGroupedSlots(groups);
    //console.log(groupedSlots);
  }, [docSlots]);

  if (!docInfo) {
    // You could show a spinner/loader here
    
    return null;
  }
 
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 mt-20">
      {/* --- Doctor Info Section --- */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <img
          src={docInfo.image}
          alt={docInfo.name}
          className="w-48 h-48 rounded-full object-cover object-top shadow-md border-4 border-blue-100"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">{docInfo.name}</h1>
          <p className="text-blue-600 text-lg font-medium">{docInfo.speciality}</p>
          <p className="text-gray-600 mt-2">
            {docInfo.degree} • {docInfo.experience}
          </p>
          <p className="text-gray-500 mt-1">
            ₹{docInfo.fees} Consultation Fee
          </p>
          <div className="mt-4 text-sm text-gray-700">
            <p>{docInfo.address.line1}</p>
            <p>{docInfo.address.line2}</p>
          </div>
        </div>
        <div className='max-w-sm font-medium text-blue-950'>
          {docInfo.about}
        </div>
      </div>

      {/* --- Slots Section --- */}
      <div className="mt-10 bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Available Slots
        </h2>

        {Object.keys(groupedSlots).length === 0 ? (
          <p className="text-gray-500">No slots available.</p>
        ) : (
          Object.entries(groupedSlots).map(([dateKey, info]) => (
            <div key={dateKey} className="mb-6">
              {/* Day Label */}
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                {info.label}
              </h3>
              {/* Time Slots as grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {info.slots.map((slotObj, idx) => {
                  const slotIdentifier = `${dateKey}-${slotObj.time}`;
                  const isSelected =
                    selectedSlot &&
                    selectedSlot.date.toDateString() ===
                      slotObj.date.toDateString() &&
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
                        px-3 py-2 text-sm rounded-lg border 
                        ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'
                        }
                        focus:outline-none
                      `}
                    >
                      {slotObj.time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- Selected Slot & Confirmation --- */}
      {selectedSlot && (
        <div className="mt-8 bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-medium text-gray-800 mb-2">
            Selected Appointment:
          </h4>
          <p className="text-gray-700">
            <span className="font-semibold">Date:</span>{' '}
            {selectedSlot.date.toLocaleDateString([], {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Time:</span> {selectedSlot.time}
          </p>
          <button
            className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none transition"
            onClick={() => {
              // Replace this stub with your “confirm appointment” logic (API call, navigation, etc.)
              alert(
                `Appointment confirmed on ${selectedSlot.date.toLocaleDateString()} at ${selectedSlot.time}`
              );
            }}
          >
            Confirm Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointment;
