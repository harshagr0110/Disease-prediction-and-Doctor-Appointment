import React from 'react';
import { useContext } from 'react';
import { AdminContext } from '../context/Admincontext';
import { DoctorContext } from '../context/Doctorcontext';
// Import a toast library (react-hot-toast is popular and works well with Tailwind)
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const { setAToken } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);

    const handleLogout = () => {
        setAToken('');
        setDToken('');
        toast.success('Logged out successfully!', {
            style: {
                background: 'blue',
                color: '#fff',
            },
            iconTheme: {
                primary: '#38b2ac',
                secondary: '#fff',
            },
        });
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-blue-900 shadow-lg mt-0">
            <div className="font-extrabold text-3xl tracking-wide text-white drop-shadow-lg select-none">
                {AdminContext ? 'Admin' : 'Doctor'} Panel
            </div>
            <button
                className="bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onClick={handleLogout}
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;