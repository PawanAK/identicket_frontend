import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';

const Ticket = () => {
  const [ticket, setTicket] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await fetch(`http://localhost:3000/ticket/${id}`);
      if (response.ok) {
        const ticketData = await response.json();
        setTicket(ticketData);
      } else {
        console.error('Failed to fetch ticket');
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
    }
  };

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const ticketData = JSON.stringify(ticket);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-10 p-8 rounded-xl shadow-lg backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Your Ticket</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4 space-y-2">
            <p className="text-gray-800"><span className="font-semibold">From:</span> {ticket.start}</p>
            <p className="text-gray-800"><span className="font-semibold">To:</span> {ticket.end}</p>
            <p className="text-gray-800"><span className="font-semibold">Type:</span> {ticket.dailyPass ? 'Daily Pass' : 'Single Journey'}</p>
            <p className="text-gray-800"><span className="font-semibold">Price:</span> ₹{ticket.price}</p>
            <p className="text-gray-800"><span className="font-semibold">Status:</span> 
              <span className={ticket.validationStatus ? 'text-green-600' : 'text-red-600'}>
                {ticket.validationStatus ? 'Validated' : 'Not Validated'}
              </span>
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <QRCode value={ticketData} size={200} level="H" renderAs="svg" />
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