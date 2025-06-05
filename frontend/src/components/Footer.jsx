import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-12 pb-6 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-12 md:gap-8">
        {/* Brand */}
        <div className="flex-1 min-w-[220px]">
          <img src={assets.logo} alt="Logo" className="h-12 mb-4" />
          <p className="text-gray-600 text-sm">
            Your trusted healthcare partner. Providing quality care and support for your well-being.
          </p>
        </div>
        {/* Links */}
        <div className="flex flex-1 justify-between gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/about" className="hover:text-gray-900 transition">About Us</a></li>
              <li><a href="/careers" className="hover:text-gray-900 transition">Careers</a></li>
              <li><a href="/blog" className="hover:text-gray-900 transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/contact" className="hover:text-gray-900 transition">Contact</a></li>
              <li><a href="/faq" className="hover:text-gray-900 transition">FAQ</a></li>
              <li><a href="/help" className="hover:text-gray-900 transition">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/privacy" className="hover:text-gray-900 transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-gray-900 transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        {/* Social */}
        <div className="flex-1 min-w-[180px]">
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <img src={assets.facebook} alt="Facebook" className="h-7 w-7" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <img src={assets.twitter} alt="Twitter" className="h-7 w-7" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <img src={assets.instagram} alt="Instagram" className="h-7 w-7" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Doctor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
