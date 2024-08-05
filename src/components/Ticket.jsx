import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';

const Ticket = () => {
  const location = useLocation();
  const { start, end, dailyPass, price } = location.state;

  const ticketData = JSON.stringify({
    start,
    end,
    dailyPass,
    price,
    timestamp: new Date().toISOString(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Your Ticket</h2>
        <div className="bg-white p-6 rounded-lg">
          <div className="mb-4">
            <p className="text-gray-700"><strong>From:</strong> {start}</p>
            <p className="text-gray-700"><strong>To:</strong> {end}</p>
            <p className="text-gray-700"><strong>Type:</strong> {dailyPass ? 'Daily Pass' : 'Single Journey'}</p>
            <p className="text-gray-700"><strong>Price:</strong> ${price}</p>
          </div>
          <div className="flex justify-center">
            <QRCode value={ticketData} size={200} />
          </div>
        </div>
        <p className="text-sm text-gray-300 text-center mt-4">
          Please show this QR code to the conductor when requested.
        </p>
      </div>
    </div>
  );
};

export default Ticket;