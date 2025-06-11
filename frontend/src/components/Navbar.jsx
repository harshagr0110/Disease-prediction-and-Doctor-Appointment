import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { token, setToken, setUserId, userData } = useContext(AppContext);
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
    { name: 'Admin/Doctor', to: '/admin' },
  ];

  return (
    <nav className="w-full shadow-lg fixed top-0 z-50 bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src={assets.logo} 
            alt="Logo" 
            className="h-12 w-12 rounded-full border-2 border-green-400 shadow cursor-pointer"
            onClick={() => navigate('/')} 
          />
          <span 
            className="font-bold text-3xl text-blue-800 tracking-wide hidden sm:block cursor-pointer"
            onClick={() => navigate('/')}
          >
            MEDIMIND
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm ${
                  isActive
                    ? 'text-blue-700 bg-blue-100 ring-2 ring-blue-200'
                    : 'text-gray-700 hover:text-green-700 hover:bg-green-100 hover:ring-2 hover:ring-green-200'
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
              className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-green-500 hover:to-blue-500 transition-all"
            >
              Create Account
            </button>
          ) : (
            <div 
              className="relative"
              onMouseEnter={() => setProfileMenu(true)}
              onMouseLeave={() => setProfileMenu(false)}
            >
              <img
                src={userData?.image || assets.profile_pic || 'https://i.pravatar.cc/40'}
                alt="Profile"
                className="h-12 w-12 rounded-full cursor-pointer border-2 border-blue-400 shadow"
              />
              {profileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-blue-100">
                  <button 
                    onClick={() => navigate('/my-profile')} 
                    className="block w-full px-5 py-3 text-left hover:bg-blue-50 rounded-xl font-medium text-gray-700"
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => navigate('/my-appointments')} 
                    className="block w-full px-5 py-3 text-left hover:bg-blue-50 rounded-xl font-medium text-gray-700"
                  >
                    My Appointments
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="block w-full px-5 py-3 text-left text-red-600 hover:bg-green-50 rounded-xl font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setSidebar(true)} 
            aria-label="Open menu" 
            className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition"
          >
            <Menu className="w-7 h-7 text-green-700" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex" onClick={() => setSidebar(false)}>
          <div className="bg-white w-72 h-full p-6 flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-2">
                <img 
                  src={assets.logo} 
                  alt="Logo" 
                  className="h-10 w-10 rounded-full border-2 border-green-400 cursor-pointer"
                  onClick={() => {
                    navigate('/');
                    setSidebar(false);
                  }}
                />
                <span className="font-bold text-xl text-green-700">MEDIMIND</span>
              </div>
              <button 
                onClick={() => setSidebar(false)} 
                aria-label="Close menu" 
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
              >
                <X className="w-6 h-6 text-blue-700" />
              </button>
            </div>
            <nav className="flex flex-col space-y-3">
              {navLinks.map(link => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => setSidebar(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-full text-base font-semibold transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'text-blue-700 bg-blue-100 ring-2 ring-blue-200'
                        : 'text-gray-700 hover:text-green-700 hover:bg-green-100 hover:ring-2 hover:ring-green-200'
                    }`
                  }
                  end
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="mt-6">
                {!token ? (
                  <button
                    onClick={() => {
                      navigate('/login');
                      setSidebar(false);
                    }}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-3 rounded-full font-semibold shadow hover:from-green-500 hover:to-blue-500 transition-all"
                  >
                    Create Account
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => { 
                        navigate('/my-profile'); 
                        setSidebar(false); 
                      }} 
                      className="w-full text-left px-5 py-3 hover:bg-blue-50 rounded-xl font-medium text-gray-700"
                    >
                      My Profile
                    </button>
                    <button 
                      onClick={() => { 
                        navigate('/my-appointments'); 
                        setSidebar(false); 
                      }} 
                      className="w-full text-left px-5 py-3 hover:bg-blue-50 rounded-xl font-medium text-gray-700"
                    >
                      My Appointments
                    </button>
                    <button 
                      onClick={() => { 
                        handleLogout(); 
                        setSidebar(false); 
                      }} 
                      className="w-full text-left px-5 py-3 text-red-600 hover:bg-green-50 rounded-xl font-medium"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;