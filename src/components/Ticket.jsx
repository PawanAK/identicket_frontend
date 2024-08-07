import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import ggwave from 'ggwave';

const Ticket = () => {
  const [ticket, setTicket] = useState(null);
  const [audioWaveform, setAudioWaveform] = useState(null);
  const { id } = useParams();
  const audioContext = useRef(null);
  const audioBuffer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchTicket();
    initAudioContext();
  }, [id]);

  const initAudioContext = () => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
  };

  const fetchTicket = async () => {
    try {
      const response = await fetch(`https://ticket-backend-j37d.onrender.com/ticket/${id}`);
      if (response.ok) {
        const ticketData = await response.json();
        setTicket(ticketData);
        generateAudioWaveform(ticketData);
      } else {
        console.error('Failed to fetch ticket');
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
    }
  };

  const generateAudioWaveform = async (ticketData) => {
    try {
      const ggwaveInstance = await ggwave();
      const parameters = ggwaveInstance.getDefaultParameters();
      const instance = ggwaveInstance.init(parameters);

      const payload = JSON.stringify({
        from: ticketData.start,
        to: ticketData.end,
        price: ticketData.price,
        status: ticketData.validationStatus ? 'Validated' : 'Not Validated'
      });

      // Check if TxProtocolId exists, if not, use a fallback value
      const protocolId = ggwaveInstance.TxProtocolId ? 
        ggwaveInstance.TxProtocolId.GGWAVE_TX_PROTOCOL_AUDIBLE_FAST : 
        1; // Use 1 as a fallback, or another appropriate value

      const waveform = ggwaveInstance.encode(instance, payload, protocolId, 10);
      setAudioWaveform(waveform);
    } catch (error) {
      console.error('Error generating audio waveform:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  const playAudio = () => {
    if (audioWaveform && !isPlaying) {
      setIsPlaying(true);
      const arrayBuffer = audioContext.current.createBuffer(1, audioWaveform.length, 48000);
      const channelData = arrayBuffer.getChannelData(0);
      channelData.set(audioWaveform);

      const source = audioContext.current.createBufferSource();
      source.buffer = arrayBuffer;
      source.connect(audioContext.current.destination);
      source.onended = () => setIsPlaying(false);
      source.start();
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
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className={`mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isPlaying
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            } transition duration-300`}
          >
            {isPlaying ? 'Playing Audio...' : 'Play Audio Details'}
          </button>
        </div>
        <p className="text-sm text-gray-300 text-center mt-4">
          Please show this QR code to the conductor when requested.
        </p>
      </div>
    </div>
  );
};

export default Ticket;