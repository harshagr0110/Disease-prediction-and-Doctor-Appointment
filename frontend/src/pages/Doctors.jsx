// src/pages/Doctors.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doctors as allDoctors, specialityData } from '../assets/assets';

const Doctors = () => {
  const Navigate = useNavigate();
  // Grab the optional “:speciality” param from the URL
  const { speciality: initialSpeciality } = useParams();

  // Build a sorted, unique list of specialties
  const allSpecialities = Array.from(
    new Set(specialityData.map((item) => item.speciality))
  ).sort();

  // State: which specialties are currently selected for filtering
  const [selectedSpecs, setSelectedSpecs] = useState(() => {
    return initialSpeciality
      ? [decodeURIComponent(initialSpeciality)]
      : [];
  });

  // State: filtered list of doctors based on selectedSpecs
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // State: which doctor IDs have their description expanded
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);

  // State: control mobile filter panel visibility
  const [filterOpen, setFilterOpen] = useState(false);

  // Recompute filteredDoctors whenever selectedSpecs changes
  useEffect(() => {
    if (selectedSpecs.length === 0) {
      setFilteredDoctors(allDoctors);
    } else {
      setFilteredDoctors(
        allDoctors.filter((doc) =>
          selectedSpecs.includes(doc.speciality)
        )
      );
    }
  }, [selectedSpecs]);

  // Toggle a specialty on/off in selectedSpecs
  const toggleSpeciality = (spec) => {
    setSelectedSpecs((prev) => {
      if (prev.includes(spec)) {
        return prev.filter((s) => s !== spec);
      } else {
        return [...prev, spec];
      }
    });
  };

  // Toggle “Read More” expansion for a given doctor ID
  const toggleDescription = (docId) => {
    setExpandedDescriptions((prev) => {
      if (prev.includes(docId)) {
        return prev.filter((id) => id !== docId);
      } else {
        return [...prev, docId];
      }
    });
  };

  // Helper to get truncated text (first 100 chars + “…”)
  const truncate = (text, length = 100) => {
    if (text.length <= length) return text;
    return text.slice(0, length).trimEnd() + '…';
  };

  return (
    <div className="flex flex-col md:flex-row my-20 mx-20">
      {/* ======================= */}
      {/* Mobile: “Filter” Button */}
      {/* ======================= */}
      <div className="md:hidden flex justify-end px-4 py-2">
        <button
          onClick={() => setFilterOpen((prev) => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          {filterOpen ? 'Close Filters' : 'Filter'}
        </button>
      </div>

      {/* ======================= */}
      {/* Sidebar Filter Panel */}
      {/* ======================= */}
      <aside
        className={`
          bg-white border-r border-gray-200 
          w-64 p-4 space-y-4
          fixed top-0 left-0 h-full z-30
          transform transition-transform duration-200
          ${filterOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:h-auto md:w-64
        `}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Filter by Specialty
        </h2>
        <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
          {allSpecialities.map((spec) => (
            <li key={spec}>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={selectedSpecs.includes(spec)}
                  onChange={() => toggleSpeciality(spec)}
                />
                <span className="ml-2 text-gray-700 hover:text-blue-600">
                  {spec}
                </span>
              </label>
            </li>
          ))}
        </ul>
        {selectedSpecs.length > 0 && (
          <button
            onClick={() => setSelectedSpecs([])}
            className="mt-4 text-sm text-red-600 hover:text-red-800"
          >
            Clear All Filters
          </button>
        )}
      </aside>

      {/* ======================= */}
      {/* Main Content: Doctor Cards */}
      {/* ======================= */}
      <main
        className={`
          flex-1 px-4 pt-4 pb-8 
          md:pl-64  /* push right of sidebar on md+ */
        `}
      >
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {selectedSpecs.length > 0
            ? `Showing: ${selectedSpecs.join(', ')}`
            : 'All Doctors'}
        </h1>

        {/* If no doctors match the filter */}
        {filteredDoctors.length === 0 ? (
          <p className="text-gray-600">No doctors match your filter.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => {
              const isExpanded = expandedDescriptions.includes(doc._id);
              return (
                <div
                onClick={() => Navigate(`/appointment/${doc._id}`)}
                  key={doc._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
                >
                  {/* Doctor Image (object-top to keep top visible) */}
                  <div className="h-56 bg-gray-100">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Name & Specialty */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {doc.name}
                      </h2>
                      <p className="text-sm text-blue-600 font-medium">
                        {doc.speciality}
                      </p>
                    </div>

                    {/* Degree & Experience */}
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Degree:</span>{' '}
                      {doc.degree}
                      <br />
                      <span className="font-medium">Experience:</span>{' '}
                      {doc.experience}
                    </div>

                    {/* About: truncated or full */}
                    <p className="mt-3 text-gray-700 text-sm">
                      {isExpanded ? doc.about : truncate(doc.about, 100)}
                    </p>
                    {doc.about.length > 100 && (
                      <button
                        onClick={() => toggleDescription(doc._id)}
                        className="mt-1 text-blue-600 text-sm font-medium hover:underline focus:outline-none"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    )}

                    {/* Fees & Address */}
                    <div className="mt-auto">
                      <p className="mt-4 text-sm text-gray-800">
                        <span className="font-medium">Consultation Fee:</span>{' '}
                        ₹{doc.fees}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">Address:</span>{' '}
                        {doc.address.line1}, {doc.address.line2}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Doctors;
