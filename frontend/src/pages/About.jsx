import React from 'react';
import { assets } from '../assets/assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const About = () => {
  // Example toast on mount (optional)
  React.useEffect(() => {
    toast.info('Welcome to our AI Health Assistant!', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-blue-100 py-10 px-2">
      <ToastContainer />
      <div className="w-full max-w-4xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <img
            src={assets.about_image}
            alt="About"
            className="w-36 md:w-48 rounded-2xl shadow-lg border-4 border-green-200 mb-6"
          />
          <h1 className="text-3xl md:text-5xl font-extrabold text-green-700 mb-2 text-center drop-shadow-sm">
            About Our AI Health Assistant
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-blue-300 rounded-full mb-2" />
        </div>
        <p className="text-lg md:text-xl text-blue-900 text-center leading-relaxed mb-8 font-medium">
          Welcome to our intelligent healthcare platform! Our mission is to make healthcare more accessible and efficient by leveraging the power of Artificial Intelligence.
        </p>
        <ul className="w-full max-w-2xl flex flex-col gap-5 text-base md:text-lg text-blue-800 mb-10">
          <li className="flex items-start gap-3">
            <span className="inline-block mt-1 text-green-500">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6EE7B7"/><path d="M8 12.5l2.5 2.5 5-5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span>
              <span className="font-semibold text-green-700">AI-Powered Disease Detection:</span> Instantly analyze your symptoms and get accurate disease predictions.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-block mt-1 text-green-500">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6EE7B7"/><path d="M8 12.5l2.5 2.5 5-5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span>
              <span className="font-semibold text-green-700">Personalized Doctor Recommendations:</span> Find the right specialists based on your diagnosis and location.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-block mt-1 text-green-500">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6EE7B7"/><path d="M8 12.5l2.5 2.5 5-5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span>
              <span className="font-semibold text-green-700">Seamless Appointment Booking:</span> Book slots with top doctors in just a few clicks.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-block mt-1 text-green-500">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#6EE7B7"/><path d="M8 12.5l2.5 2.5 5-5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span>
              <span className="font-semibold text-green-700">Secure &amp; Private:</span> Your health data is encrypted and handled with utmost confidentiality.
            </span>
          </li>
        </ul>
        <div className="w-full bg-gradient-to-r from-green-100 via-blue-100 to-blue-50 rounded-2xl p-6 md:p-8 text-center shadow-md border border-green-200">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-3">Why Choose Us?</h2>
          <p className="text-blue-800 mb-2 font-medium">
            Our platform combines advanced AI with a user-friendly interface to empower you to take control of your health journey.
          </p>
          <p className="text-green-700 font-semibold">
            Start your path to better health today—fast, easy, and reliable!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
