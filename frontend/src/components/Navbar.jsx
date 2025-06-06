import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [token, setToken] = useState(true); // Replace with real auth check later
  const [profileMenu, setProfileMenu] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(false);
    setProfileMenu(false);
    // Optionally clear localStorage or cookies
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'All Doctors', to: '/doctors' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  // Handle profile menu for accessibility and mobile
  const handleProfileMenu = (open) => setProfileMenu(open);

  return (
    <nav className="w-full bg-white shadow-md my-0.5 left-0 z-50 fixed top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-lg font-medium transition duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-100 font-semibold shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`
              }
              end
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side Auth/Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!token ? (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              Create Account
            </button>
          ) : (
            <div className="relative">
              <img
                src={assets.profile_pic || 'https://i.pravatar.cc/40'}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-blue-600"
                onClick={() => handleProfileMenu(!profileMenu)}
                onMouseEnter={() => handleProfileMenu(true)}
                onMouseLeave={() => handleProfileMenu(false)}
              />
              {profileMenu && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
                  onMouseEnter={() => handleProfileMenu(true)}
                  onMouseLeave={() => handleProfileMenu(false)}
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      handleProfileMenu(false);
                      navigate('/my-profile');
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      handleProfileMenu(false);
                      navigate('/my-appointments');
                    }}
                  >
                    My Appointments
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setSidebar(true)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Open menu"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebar && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setSidebar(false)}
          ></div>

          {/* Sidebar Panel */}
          <div className="relative bg-white w-64 h-full shadow-lg flex flex-col p-6 space-y-6 transition-transform duration-300 ease-in-out transform translate-x-0">
            <button
              className="absolute top-4 right-4 text-gray-700"
              onClick={() => setSidebar(false)}
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img src={assets.logo} alt="Logo" className="h-10 w-auto mb-6" />

            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-base font-medium transition duration-200 ${
                      isActive
                        ? 'text-blue-700 bg-blue-100 font-semibold'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setSidebar(false)}
                  end
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto">
              {!token ? (
                <button
                  onClick={() => {
                    setSidebar(false);
                    navigate('/login');
                  }}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
                >
                  Create Account
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <button
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded text-left"
                    onClick={() => {
                      setSidebar(false);
                      navigate('/my-profile');
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded text-left"
                    onClick={() => {
                      setSidebar(false);
                      navigate('/my-appointments');
                    }}
                  >
                    My Appointments
                  </button>
                  <button
                    className="px-4 py-2 text-red-600 hover:bg-gray-100 rounded text-left"
                    onClick={() => {
                      setSidebar(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
