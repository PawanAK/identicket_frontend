import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PassBooking = () => {
  const [price] = useState(5); // Fixed price for daily pass
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = localStorage.getItem('username');
    const validUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    try {
      const response = await fetch('http://localhost:3000/passes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, price, validUntil }),
      });

      if (response.ok) {
        const newPass = await response.json();
        console.log('Pass created successfully:', newPass);
        navigate(`/pass/${newPass.passId}`);
      } else {
        const errorData = await response.json();
        console.error('Failed to purchase pass:', errorData);
      }
    } catch (error) {
      console.error('Error purchasing pass:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-white text-center mb-6">Book a Daily Pass</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between text-sm text-gray-300">
          <div>Daily Pass</div>
          <div>Price: ${price}</div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Buy Pass
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassBooking;