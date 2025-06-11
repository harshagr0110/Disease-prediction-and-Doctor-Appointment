import React, { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.reset();
    toast.success('Your message has been sent! We will get back to you soon.', {
      position: 'top-center',
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      style: {
        background: 'linear-gradient(90deg, #b2f7ef 0%, #a0e9fd 100%)',
        color: '#155724',
        fontWeight: 500,
      },
      icon: '💬',
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-2">
      <ToastContainer />
      <div className="w-full max-w-4xl mx-auto my-12 p-6 md:p-12 bg-white/90 rounded-3xl shadow-2xl border border-blue-100">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 min-w-[300px] flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-green-700 text-center md:text-left">
              Contact <span className="text-blue-500">Us</span>
            </h1>
            <p className="text-lg mb-8 text-blue-900 text-center md:text-left">
              Have questions about disease detection or want to book an appointment? Fill out the form or reach us directly!
            </p>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full max-w-md"
            >
              <input
                type="text"
                placeholder="Your Name"
                required
                className="p-3 rounded-xl border border-green-200 bg-green-50 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="p-3 rounded-xl border border-green-200 bg-blue-50 text-base focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="p-3 rounded-xl border border-blue-200 bg-green-50 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              />
              <textarea
                placeholder="How can we help you?"
                rows={4}
                required
                className="p-3 rounded-xl border border-blue-200 bg-blue-50 text-base resize-none focus:outline-none focus:ring-2 focus:ring-green-200 transition"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white py-3 rounded-xl text-lg font-bold mt-2 shadow-md transition-all"
              >
                Send Message
              </button>
            </form>
            <div className="mt-8 text-blue-900 text-base space-y-1 w-full max-w-md">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z" />
                </svg>
                <strong>Email:</strong> support@healthdetect.com
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  <path d="M16 3v4a1 1 0 001 1h4" />
                </svg>
                <strong>Phone:</strong> +1 234 567 8901
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[260px] flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              alt="Contact illustration"
              className="rounded-2xl w-full max-w-xs object-cover shadow-lg border-4 border-blue-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
