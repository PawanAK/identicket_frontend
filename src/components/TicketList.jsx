import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await fetch(`http://localhost:3000/tickets?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else {
        console.error('Failed to fetch tickets');
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tickets.map((ticket) => (
        <Link to={`/ticket/${ticket.ticketId}`} key={ticket.ticketId} className="block">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
            <h3 className="text-lg font-semibold mb-2">{ticket.start} to {ticket.end}</h3>
            <p className="text-gray-600">Type: {ticket.dailyPass ? 'Daily Pass' : 'Single Journey'}</p>
            <p className="text-gray-600">Price: ${ticket.price}</p>
            <p className="text-gray-600">Status: {ticket.validationStatus ? 'Validated' : 'Not Validated'}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TicketList;