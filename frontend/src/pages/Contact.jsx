import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto my-24 p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-10">
        <div className="flex-1 min-w-[300px]">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Contact Us</h1>
          <p className="text-lg mb-8 text-gray-600">
            Have questions about disease detection or want to book an appointment with our doctors? Fill out the form below or reach us directly!
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="p-3 rounded-lg border border-slate-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="p-3 rounded-lg border border-slate-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="p-3 rounded-lg border border-slate-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="How can we help you?"
              rows={5}
              required
              className="p-3 rounded-lg border border-slate-300 text-base resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold mt-2 transition-colors"
            >
              Send Message
            </button>
          </form>
          <div className="mt-8 text-gray-600 text-base space-y-1">
            <div>
              <strong>Email:</strong> support@healthdetect.com
            </div>
            <div>
              <strong>Phone:</strong> +1 234 567 8901
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[280px] flex justify-center items-center">
          {/* You can add an image or illustration here if you want */}
          {/* Example placeholder: */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="Contact illustration"
            className="rounded-xl w-full max-w-xs object-cover shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
