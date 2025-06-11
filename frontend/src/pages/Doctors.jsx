// src/pages/Doctors.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { specialityData } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Theme colors (minimal, formal)
const THEME = {
  primary: 'bg-gray-50',
  accent: 'bg-gray-700 text-white',
  accentHover: 'hover:bg-gray-800',
  border: 'border-gray-200',
  textPrimary: 'text-gray-800',
  textAccent: 'text-gray-600',
  card: 'bg-white shadow border border-gray-200',
  cardHover: 'hover:shadow-lg hover:border-gray-300',
};

const Doctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const { speciality: initialSpeciality } = useParams();

  // Unique, sorted specialties
  const allSpecialities = Array.from(
    new Set(specialityData.map((item) => item.speciality))
  ).sort();

  // State
  const [selectedSpecs, setSelectedSpecs] = useState(() =>
    initialSpeciality ? [decodeURIComponent(initialSpeciality)] : []
  );
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter doctors
  useEffect(() => {
    if (selectedSpecs.length === 0) {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(
        doctors.filter((doc) => selectedSpecs.includes(doc.speciality))
      );
    }
  }, [selectedSpecs, doctors]);

  // Toggle specialty
  const toggleSpeciality = (spec) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
    toast.info(`Filter updated: ${spec}`, {
      position: 'top-center',
      autoClose: 1200,
      hideProgressBar: true,
      theme: 'colored',
    });
  };

  // Toggle description
  const toggleDescription = (docId) => {
    setExpandedDescriptions((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  // Truncate helper
  const truncate = (text, length = 100) =>
    text.length <= length ? text : text.slice(0, length).trimEnd() + '…';

  // Sidebar classes (wider, formal, straight list)
  const sidebarClasses = `
    ${THEME.primary} ${THEME.border}
    w-full md:w-80 p-8 space-y-6
    fixed top-0 left-0 h-full z-30
    transform transition-transform duration-200
    ${filterOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:static md:h-auto md:w-80
    flex flex-col
    shadow
  `;

  return (
    <div className={`${THEME.primary} min-h-screen w-full`}>
      <ToastContainer />
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-end px-4 py-4">
        <button
          onClick={() => setFilterOpen((prev) => !prev)}
          className={`${THEME.accent} ${THEME.accentHover} px-5 py-2 rounded font-medium transition`}
        >
          {filterOpen ? 'Close Filters' : 'Filter'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <aside className={sidebarClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-left">
            Filter by Specialty
          </h2>
          <ul className="space-y-1 w-full max-h-[70vh] overflow-y-auto">
            {allSpecialities.map((spec) => (
              <li key={spec} className="flex">
                <label className="inline-flex items-center w-full cursor-pointer py-2 px-2 rounded hover:bg-gray-100 transition">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-700"
                    checked={selectedSpecs.includes(spec)}
                    onChange={() => toggleSpeciality(spec)}
                  />
                  <span className="ml-3 text-gray-700 font-normal">{spec}</span>
                </label>
              </li>
            ))}
          </ul>
          {selectedSpecs.length > 0 && (
            <button
              onClick={() => {
                setSelectedSpecs([]);
                toast.success('All filters cleared!', {
                  position: 'top-center',
                  autoClose: 1200,
                  hideProgressBar: true,
                  theme: 'colored',
                });
              }}
              className="mt-6 text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center px-2 pt-8 pb-10 md:pl-0">
          <h1 className="text-3xl font-bold text-left text-gray-800 mb-8 w-full px-2">
            {selectedSpecs.length > 0
              ? `Doctors: ${selectedSpecs.join(', ')}`
              : 'Our Doctors'}
          </h1>

          {filteredDoctors.length === 0 ? (
            <div className="flex flex-col items-center mt-20">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
                alt="No doctors"
                className="w-20 h-20 opacity-60 mb-4"
              />
              <p className="text-lg text-gray-600 font-medium">
                No doctors match your filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 w-full px-2">
              {filteredDoctors.map((doc) => {
                const isExpanded = expandedDescriptions.includes(doc._id);
                return (
                  <div
                    key={doc._id}
                    onClick={() => navigate(`/appointment/${doc._id}`)}
                    className={`
                      ${THEME.card} ${THEME.cardHover}
                      rounded-xl overflow-hidden flex flex-col items-stretch
                      cursor-pointer transition-all duration-200
                      group w-full max-w-2xl 
                    `}
                    style={{
                      borderTop: '5px solid #6b7280', // gray-500
                    }}
                  >
                    {/* Doctor Image */}
                    <div className="h-52 w-full bg-gray-100 flex items-center justify-center">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-32 h-32 object-cover object-top rounded-full border-2 border-gray-200 shadow mt-4 group-hover:scale-105 transition"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-6 flex-1 flex flex-col items-start w-full">
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        {doc.name}
                      </h2>
                      <p className="text-base text-gray-600 font-normal mb-2">
                        {doc.speciality}
                      </p>
                      <div className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Degree:</span> {doc.degree}
                        <br />
                        <span className="font-medium">Experience:</span> {doc.experience}
                      </div>
                      <p className="mt-2 text-gray-700 text-sm">
                        {isExpanded ? doc.about : truncate(doc.about, 120)}
                      </p>
                      {doc.about.length > 120 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDescription(doc._id);
                          }}
                          className="mt-1 text-gray-700 text-xs font-medium hover:underline focus:outline-none"
                        >
                          {isExpanded ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                      <div className="mt-auto w-full flex flex-col items-start">
                        <p className="mt-4 text-base text-gray-800 font-semibold">
                          ₹{doc.fees}{' '}
                          <span className="text-sm text-gray-500 font-normal">
                            Consultation Fee
                          </span>
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
    </div>
  );
};

export default Doctors;
