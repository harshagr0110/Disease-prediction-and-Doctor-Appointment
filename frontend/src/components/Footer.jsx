import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="flex flex-col min-h-[40vh]">
      <div className="flex-grow"></div>
      <footer className="bg-white w-full border-t border-green-800 text-green-900 pt-12 pb-6 px-4 md:px-16 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center md:items-start gap-12 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start flex-1 min-w-[220px]">
            <img src={assets.logo} alt="Logo" className="h-32 mb-4 rounded-lg shadow-md bg-white p-2" />
            <p className="text-green-800 text-sm text-center md:text-left">
              Your trusted healthcare partner.<br />
              Providing quality care and support for your well-being.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-1 justify-center md:justify-between gap-8 w-full md:w-auto">
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-3 text-blue-700">Company</h4>
              <ul className="space-y-2 text-green-800">
                <li>
                  <a href="/about" className="hover:text-blue-600 transition font-medium">About Us</a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-blue-600 transition font-medium">Careers</a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-blue-600 transition font-medium">Blog</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-3 text-blue-700">Support</h4>
              <ul className="space-y-2 text-green-800">
                <li>
                  <a href="/contact" className="hover:text-blue-600 transition font-medium">Contact</a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-blue-600 transition font-medium">FAQ</a>
                </li>
                <li>
                  <a href="/help" className="hover:text-blue-600 transition font-medium">Help Center</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-3 text-blue-700">Legal</h4>
              <ul className="space-y-2 text-green-800">
                <li>
                  <a href="/privacy" className="hover:text-blue-600 transition font-medium">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-blue-600 transition font-medium">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end flex-1 min-w-[180px]">
            <h4 className="text-lg font-bold mb-3 text-blue-700">Follow Us</h4>
            <div className="flex space-x-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                <img src={assets.facebook} alt="Facebook" className="h-8 w-8 rounded-full bg-white p-1 shadow" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                <img src={assets.twitter} alt="Twitter" className="h-8 w-8 rounded-full bg-white p-1 shadow" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                <img src={assets.instagram} alt="Instagram" className="h-8 w-8 rounded-full bg-white p-1 shadow" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-200 mt-10 pt-6 text-center text-green-700 text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-blue-700">Doctor</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;