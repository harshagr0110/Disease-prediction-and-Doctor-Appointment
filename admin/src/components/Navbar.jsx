import React from 'react';
import { useContext } from 'react';
import { AdminContext } from '../context/Admincontext';
const Navbar = () => {
    const { setAToken } = useContext(AdminContext);
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg mt-0">
            <div className="font-extrabold text-3xl tracking-wide text-white drop-shadow-lg select-none">
                Admin Panel
            </div>
            <button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => setAToken('')}
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;