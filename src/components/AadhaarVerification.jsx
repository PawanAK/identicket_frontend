import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInWithAnonAadhaar, useAnonAadhaar } from '@anon-aadhaar/react';

const AadhaarVerification = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    console.log('Anon Aadhaar status:', anonAadhaar.status);
    if (anonAadhaar.status === 'logged-in') {
      // Fetch user details from localStorage
      const username = localStorage.getItem('username');
      const metamaskAddress = localStorage.getItem('metamaskAddress');
      const petraAddress = localStorage.getItem('petraAddress');
      setUserDetails({ username, metamaskAddress, petraAddress });

      // Navigate to booking after a short delay
      setTimeout(() => navigate('/booking'), 3000);
    }
  }, [anonAadhaar, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Verify Aadhaar</h2>
        <div className="mt-8 space-y-6">
          <LogInWithAnonAadhaar nullifierSeed={1234} />
          {anonAadhaar.status === 'logging-in' && (
            <p className="text-center text-white">Verifying your Aadhaar...</p>
          )}
          {anonAadhaar.status === 'logged-in' && (
            <div className="text-white">
              <p className="text-center text-green-500 mb-4">✅ Aadhaar verified successfully!</p>
              {userDetails && (
                <div>
                  <p><strong>Username:</strong> {userDetails.username}</p>
                  <p><strong>Metamask:</strong> {userDetails.metamaskAddress.slice(0, 6)}...{userDetails.metamaskAddress.slice(-4)}</p>
                  <p><strong>Petra:</strong> {userDetails.petraAddress.slice(0, 6)}...{userDetails.petraAddress.slice(-4)}</p>
                </div>
              )}
              <p className="text-center mt-4">Redirecting to booking page...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AadhaarVerification;