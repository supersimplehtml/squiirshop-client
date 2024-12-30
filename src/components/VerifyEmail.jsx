
import React from 'react';

const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <svg 
            className="mx-auto h-12 w-12 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">User Verified!</h2>
          <p className="mt-2 text-lg text-gray-600">
            Your email has been successfully verified.
          </p>
          <p className="mt-1 text-gray-500">
            You can now proceed to login with your credentials.
          </p>
          <a
            href="/login"
            className="mt-6 inline-block px-6 py-3 bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-900 transition duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
