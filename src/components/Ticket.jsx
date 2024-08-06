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
        // You might want to set an error state here and display it to the user
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
      // You might want to set an error state here and display it to the user
    }
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  const ticketData = JSON.stringify(ticket);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Your Ticket</h2>
        <div className="bg-white p-6 rounded-lg">
          <div className="mb-4">
            <p className="text-gray-700"><strong>From:</strong> {ticket.start}</p>
            <p className="text-gray-700"><strong>To:</strong> {ticket.end}</p>
            <p className="text-gray-700"><strong>Type:</strong> {ticket.dailyPass ? 'Daily Pass' : 'Single Journey'}</p>
            <p className="text-gray-700"><strong>Price:</strong> ${ticket.price}</p>
            <p className="text-gray-700"><strong>Status:</strong> {ticket.validationStatus ? 'Validated' : 'Not Validated'}</p>
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