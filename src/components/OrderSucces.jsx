import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId; // Assuming you pass orderId via location.state

  return (
    <div className="flex justify-center items-center h-screen  p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-orange-600">Thank You for Your Order!</h1>
        <p className="text-xl text-gray-700 mt-4">
          Your order has been successfully placed. 
          <strong className="text-purple-700">{orderId}</strong>.
        </p>
        <p className="text-lg text-purple-600 mt-4">
          Thank you for shopping with us!
        </p>
        <div className="mt-8">
          <button
            className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-500 transition duration-300"
            onClick={() => window.location.href = '/'}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
