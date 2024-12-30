import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    
    address: "",
    phone: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      profileImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Create FormData to send in the POST request
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    
    form.append("address", formData.address);
    form.append("phone", formData.phone);
    if (formData.profileImage) {
      form.append("profileImage", formData.profileImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/process/register",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(response.data.message);
      setLoading(false);
      // Reset form data on successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        profileImage: null,
      });
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Create an Account
      </h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-900 focus:outline-none"
          />
        </div>
       <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Password:
          </label>
         <input
           type="password"
           name="password"
           required
           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-900 focus:outline-none"
           autoComplete="current-password"
         />
       </div>

      
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Profile Image
          </label>
          <input
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-900 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-purple-900 text-white rounded-md shadow-md hover:bg-purple-950 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-950"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
