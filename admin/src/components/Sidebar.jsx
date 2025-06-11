import React, { useContext } from 'react';
import { AdminContext } from '../context/Admincontext';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/Doctorcontext';

// Navigation links
const adminNavLinks = [
    { to: '/admin-dashboard', label: 'Dashboard' },
    { to: '/add-doctor', label: 'Add Doctor' },
    { to: '/doctor-list', label: 'Doctors List' },
];

const doctorNavLinks = [
    { to: '/doctor-dashboard', label: 'Dashboard' },
    { to: '/doctor-profile', label: 'Profile' },
    { to: '/doctor-appointment', label: 'Appointments' },
];

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    // Choose nav links based on token
    const navLinks = dToken ? doctorNavLinks : aToken ? adminNavLinks : [];

    return (
        <aside className="w-full md:w-64 bg-white rounded-3xl p-0 shadow-xl h-full min-h-full border-r border-blue-100">
            <div className="p-6 border-b border-blue-200">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <span role="img" aria-label="logo">🩺</span>
                    {dToken ? 'Doctor Panel' : aToken ? 'Admin Panel' : 'Welcome'}
                </h2>
            </div>
            {navLinks.length > 0 && (
                <ul className="flex flex-col gap-2 p-4">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg transition-colors duration-200
                                    ${
                                        isActive
                                            ? 'bg-blue-950 text-white font-semibold shadow'
                                            : 'text-blue-800 hover:bg-blue-100 hover:text-green-700'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
};

export default Sidebar;
