import React, { useContext } from 'react';
import { AdminContext } from '../context/Admincontext';
import { NavLink } from 'react-router-dom';

const navLinks = [
    { to: '/admin-dashboard', label: 'Dashboard' },
    { to: '/add-doctor', label: 'Add Doctor' },
    { to: '/all-appointments', label: 'All Appointments' },
    { to: '/doctor-list', label: 'Doctors List' },
];

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);

    return (
        <aside className="w-full md:w-64 bg-white shadow-lg h-full min-h-screen">
            {aToken && (
                <ul className="flex md:flex-col gap-2 p-4">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded transition-colors duration-200
                                    ${
                                        isActive
                                            ? 'bg-blue-600 text-white font-semibold'
                                            : 'text-gray-700 hover:bg-blue-100'
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
