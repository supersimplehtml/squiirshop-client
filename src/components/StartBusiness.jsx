import React, { useState } from 'react';
import axios from 'axios';

const StartBusinessForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
  
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // JWT token for authorization

    try {
      const response = await axios.post('http://localhost:3000/api/v1/business', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      setSuccessMessage('Business created successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to create business.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg mt-12 mb-6">
      <h1 className="text-3xl font-semibold text-center text-[#240046] mb-6">Start Your Business</h1>
      {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        
         
        <div>
          <label className="block text-lg font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
       
      
        <button
          type="submit"
          className="w-full bg-[#FF7A00] text-white py-2 px-4 rounded-lg hover:bg-[#FF9100] transition duration-300 transform hover:scale-105"
        >
          Start Business
        </button>
      </form>
    </div>
  );
};

export default StartBusinessForm;
