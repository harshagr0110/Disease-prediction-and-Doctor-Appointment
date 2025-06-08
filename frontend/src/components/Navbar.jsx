import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { token, setToken, setUserId } = useContext(AppContext);
  const [profileMenu, setProfileMenu] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    setUserId('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setProfileMenu(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'All Doctors', to: '/doctors' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img src={assets.logo} alt="Logo" className="h-10" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-lg font-medium transition duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-100'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`
              }
              end
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Auth Buttons / Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!token ? (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Account
            </button>
          ) : (
            <div className="relative">
              <img
                src={assets.profile_pic || 'https://i.pravatar.cc/40'}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-blue-600"
                onClick={() => setProfileMenu(o => !o)}
              />
              {profileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                  <button onClick={() => navigate('/my-profile')} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                    My Profile
                  </button>
                  <button onClick={() => navigate('/my-appointments')} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                    My Appointments
                  </button>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setSidebar(true)} aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40" onClick={() => setSidebar(false)}>
          <div className="bg-white w-64 h-full p-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <img src={assets.logo} alt="Logo" className="h-10" />
              <button onClick={() => setSidebar(false)} aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => setSidebar(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-base font-medium transition duration-200 ${
                      isActive ? 'text-blue-700 bg-blue-100' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`
                  }
                  end
                >
                  {link.name}
                </NavLink>
              ))}
              {!token ? (
                <button
                  onClick={() => {
                    navigate('/login');
                    setSidebar(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Create Account
                </button>
              ) : (
                <>
                  <button onClick={() => { navigate('/my-profile'); setSidebar(false); }} className="text-left px-4 py-2 hover:bg-gray-100">
                    My Profile
                  </button>
                  <button onClick={() => { navigate('/my-appointments'); setSidebar(false); }} className="text-left px-4 py-2 hover:bg-gray-100">
                    My Appointments
                  </button>
                  <button onClick={() => { handleLogout(); setSidebar(false); }} className="text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;