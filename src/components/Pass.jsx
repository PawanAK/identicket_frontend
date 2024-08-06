import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';

const Pass = () => {
  const [pass, setPass] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchPass();
  }, [id]);

  const fetchPass = async () => {
    try {
      const response = await fetch(`http://localhost:3000/pass/${id}`);
      if (response.ok) {
        const passData = await response.json();
        setPass(passData);
      } else {
        console.error('Failed to fetch pass');
      }
    } catch (error) {
      console.error('Error fetching pass:', error);
    }
  };

  if (!pass) {
    return <div>Loading...</div>;
  }

  const passData = JSON.stringify(pass);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Your Pass</h2>
        <div className="bg-white p-6 rounded-lg">
          <div className="mb-4">
            <p className="text-gray-700"><strong>Type:</strong> Daily Pass</p>
            <p className="text-gray-700"><strong>Valid until:</strong> {new Date(pass.validUntil).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Price:</strong> ${pass.price}</p>
            <p className="text-gray-700"><strong>Status:</strong> {pass.validationStatus ? 'Validated' : 'Not Validated'}</p>
          </div>
          <div className="flex justify-center">
            <QRCode value={passData} size={200} />
          </div>
        </div>
        <p className="text-sm text-gray-300 text-center mt-4">
          Please show this QR code to the conductor when requested.
        </p>
      </div>
    </div>
  );
};

export default Pass;