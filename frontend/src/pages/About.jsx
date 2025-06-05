import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto my-20 p-8 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <img
          src={assets.about_image}
          alt="About"
          className="w-44 mx-auto rounded-xl mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          About Our AI Health Assistant
        </h1>
      </div>
      <p className="text-lg text-gray-600 leading-relaxed mb-8">
        Welcome to our intelligent healthcare platform! Our mission is to make healthcare more accessible and efficient by leveraging the power of Artificial Intelligence.
      </p>
      <ul className="list-disc pl-6 space-y-4 text-base md:text-lg text-gray-700 mb-8">
        <li>
          <span className="font-semibold text-blue-600">AI-Powered Disease Detection:</span> Instantly analyze your symptoms and get accurate disease predictions.
        </li>
        <li>
          <span className="font-semibold text-blue-600">Personalized Doctor Recommendations:</span> Find the right specialists based on your diagnosis and location.
        </li>
        <li>
          <span className="font-semibold text-blue-600">Seamless Appointment Booking:</span> Book slots with top doctors in just a few clicks.
        </li>
        <li>
          <span className="font-semibold text-blue-600">Secure & Private:</span> Your health data is encrypted and handled with utmost confidentiality.
        </li>
      </ul>
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Why Choose Us?</h2>
        <p className="text-gray-700 mb-2">
          Our platform combines advanced AI with a user-friendly interface to empower you to take control of your health journey.
        </p>
        <p className="text-gray-700">
          Start your path to better health today—fast, easy, and reliable!
        </p>
      </div>
    </div>
  )
}

export default About
