import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800">
      <nav className="bg-gray-800 p-4">
        <ul className="flex justify-center space-x-4">
          <li><Link to="/dashboard/booking" className="text-white hover:text-indigo-300">Book Ticket</Link></li>
          <li><Link to="/dashboard/tickets" className="text-white hover:text-indigo-300">My Tickets</Link></li>
          <li><Link to="/dashboard/passes" className="text-white hover:text-indigo-300">My Passes</Link></li>
          <li><Link to="/dashboard/profile" className="text-white hover:text-indigo-300">Profile</Link></li>
          <li><button onClick={handleLogout} className="text-white hover:text-indigo-300">Logout</button></li>
        </ul>
      </nav>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;