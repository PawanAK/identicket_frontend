import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TicketBooking from './components/TicketBooking';
import Ticket from './components/Ticket';
import InstallPWA from './components/InstallPWA';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import PassList from './components/PassList';
import Profile from './components/Profile';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="/dashboard/booking" replace />} />
            <Route path="booking" element={<TicketBooking />} />
            <Route path="tickets" element={<TicketList />} />
            <Route path="passes" element={<PassList />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/ticket/:id" element={<Ticket />} />
        </Routes>
        <InstallPWA />
      </div>
    </Router>
  );
}

export default App;