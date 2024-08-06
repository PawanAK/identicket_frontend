import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stations = ['A', 'B', 'C', 'D'];
const prices = {
  A: { B: 1, C: 2, D: 3 },
  B: { A: 1, C: 1, D: 2 },
  C: { A: 2, B: 1, D: 1 },
  D: { A: 3, B: 2, C: 1 },
};

const TicketBooking = () => {
  const [selectedStart, setSelectedStart] = useState(stations[0]);
  const [selectedEnd, setSelectedEnd] = useState(stations[stations.length - 1]);
  const [ticketType, setTicketType] = useState('onetime');
  const navigate = useNavigate();

  const handleStartChange = (event) => {
    setSelectedStart(event.target.value);
  };

  const handleEndChange = (event) => {
    setSelectedEnd(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = localStorage.getItem('username');
    const ticketDetails = {
      username,
      start: selectedStart,
      end: selectedEnd,
      dailyPass: ticketType === 'daily',
      price: ticketType === 'daily' ? 5 : prices[selectedStart][selectedEnd],
    };

    try {
      console.log('Sending ticket details:', ticketDetails);
      const response = await fetch('http://localhost:3000/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketDetails),
      });

      if (response.ok) {
        const newTicket = await response.json();
        console.log('Ticket created successfully:', newTicket);
        navigate(`/ticket/${newTicket.id}`);
      } else {
        const errorData = await response.json();
        console.error('Failed to purchase ticket:', errorData);
      }
    } catch (error) {
      console.error('Error purchasing ticket:', error);
    }
  };

  const calculatePrice = () => {
    if (ticketType === 'daily') return 5;
    return prices[selectedStart][selectedEnd];
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-white text-center mb-6">Book a Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="ticketType" className="block text-sm font-medium text-gray-300">
              Ticket Type
            </label>
            <select
              id="ticketType"
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="onetime">One-Time Ticket</option>
              <option value="daily">Daily Pass</option>
            </select>
          </div>
          {ticketType === 'onetime' && (
            <>
              <div>
                <label htmlFor="startStation" className="block text-sm font-medium text-gray-300">
                  Start Station
                </label>
                <select
                  id="startStation"
                  value={selectedStart}
                  onChange={handleStartChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {stations.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="endStation" className="block text-sm font-medium text-gray-300">
                  End Station
                </label>
                <select
                  id="endStation"
                  value={selectedEnd}
                  onChange={handleEndChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {stations.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-300">
          <div>{ticketType === 'daily' ? 'Daily Pass' : 'One-Time Ticket'}</div>
          <div>Price: ${calculatePrice()}</div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Buy Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketBooking;