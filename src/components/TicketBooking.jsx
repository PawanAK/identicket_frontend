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
  const [walletConnected, setWalletConnected] = useState(false);
  const [ticketType, setTicketType] = useState(null);
  const navigate = useNavigate();

  const handleStartChange = (event) => {
    setSelectedStart(event.target.value);
  };

  const handleEndChange = (event) => {
    setSelectedEnd(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ticketDetails = {
      start: selectedStart,
      end: selectedEnd,
      dailyPass: ticketType === 'daily',
      price: ticketType === 'daily' ? 5 : prices[selectedStart][selectedEnd],
    };
    navigate('/ticket', { state: ticketDetails });
  };

  const connectWallet = () => {
    // Implement wallet connection logic here
    setWalletConnected(true);
  };

  const selectTicketType = (type) => {
    setTicketType(type);
  };

  const calculatePrice = () => {
    if (ticketType === 'daily') return 5;
    return prices[selectedStart][selectedEnd];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">Web3 Ticket Booking</h2>
        </div>
        {!walletConnected ? (
          <button
            onClick={connectWallet}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Connect Wallet
          </button>
        ) : ticketType === null ? (
          <div className="space-y-4">
            <button
              onClick={() => selectTicketType('onetime')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              One-Time Ticket
            </button>
            <button
              onClick={() => selectTicketType('daily')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Daily Pass
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {ticketType === 'onetime' && (
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="startStation" className="sr-only">
                    Start Station
                  </label>
                  <select
                    id="startStation"
                    value={selectedStart}
                    onChange={handleStartChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  >
                    {stations.map((station) => (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="endStation" className="sr-only">
                    End Station
                  </label>
                  <select
                    id="endStation"
                    value={selectedEnd}
                    onChange={handleEndChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  >
                    {stations.map((station) => (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-300">
                {ticketType === 'daily' ? 'Daily Pass' : 'One-Time Ticket'}
              </div>
              <div className="text-sm text-gray-300">
                Price: ${calculatePrice()}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Buy Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TicketBooking;