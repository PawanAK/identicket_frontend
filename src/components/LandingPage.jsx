import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Web3 Train Ticketing</h1>
        <p className="text-gray-300 mb-8">Book your train tickets using blockchain technology</p>
        <Link
          to="/booking"
          className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;