import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BusinessProfile = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentComments, setRecentComments] = useState([]);

  useEffect(() => {
    // Fetch recent products and comments from the API
    const fetchRecentData = async () => {
      try {
        // Assuming you have an endpoint to fetch recent products and comments
        const productResponse = await axios.get('http://localhost:3000/api/v1/process/recentproducts'); // replace with your actual endpoint
        const commentResponse = await axios.get('http://localhost:3000/api/v1/process/recentcomments'); // replace with your actual endpoint
        
        setRecentProducts(productResponse.data);
        setRecentComments(commentResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecentData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-purple-800 text-white p-6">
        <div className="text-2xl font-bold mb-8">Business Profile</div>
        <ul>
          <li>
            <Link to="/orders" className="block py-2 text-lg hover:bg-purple-700 px-4 rounded">Orders</Link>
          </li>
          <li>
            <Link to="/comments" className="block py-2 text-lg hover:bg-purple-700 px-4 rounded">Comments</Link>
          </li>
          <li>
            <Link to="/profile" className="block py-2 text-lg hover:bg-purple-700 px-4 rounded">Profile</Link>
          </li>
          <li>
            <Link to="/product-manager" className="block py-2 text-lg hover:bg-purple-700 px-4 rounded">Product Manager</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-white p-4 shadow-md mb-6">
          <div className="text-xl font-semibold">SquirShop</div>
        </nav>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recently Added Products */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Recently Added Products</h2>
            <ul>
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <li key={product._id} className="border-b py-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">{product.name}</span>
                      <span className="text-sm text-gray-600">${product.price}</span>
                    </div>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No recent products added.</p>
              )}
            </ul>
          </div>

          {/* Recent Comments */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Recent Comments</h2>
            <ul>
              {recentComments.length > 0 ? (
                recentComments.map((comment) => (
                  <li key={comment._id} className="border-b py-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">{comment.userName}</span>
                      <span className="text-sm text-gray-600">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-500">{comment.text}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No recent comments.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
