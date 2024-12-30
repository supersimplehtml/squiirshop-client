import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [business, setBusiness] = useState(false); // Track business status

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://squiirshop-server.vercel.app/api/v1/process/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 

        setProfileData(response.data);
        setBusiness(response.data.Business || false); // Set business status
        setFormData({
          name: response.data.name,
          address: response.data.address,
          phone: response.data.phone,
        });
      } catch (err) {
        setError('Failed to fetch profile data. You are forbidden to enter this page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleBusinessButtonClick = () => {
    if (business) {
      window.location.replace("/business/profile");
    } else {
      window.location.replace("/start-business");
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put('https://squiirshop-server.vercel.app/api/v1/process/edit-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(response.data);
      window.location.reload();
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-900 text-white flex-col">
        <div className="loader border-t-4 border-[#FF7A00] w-16 h-16 rounded-full animate-spin mb-4"></div>
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-900 text-white flex-col">
        <p className="text-4xl font-bold mb-4">Forbidden</p>
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center h-[100%] z-[-1000]"
      style={{
        background: 'linear-gradient(270deg, #240046 0%, #ff6d00 100%)',
      }}
    >
      <div className="max-w-lg mx-auto p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg mt-12 mb-6">
        <h1 className="text-3xl font-semibold text-center text-[#240046] mb-6">Profile</h1>
        <div className="flex justify-center mb-6">
          <img
            src={profileData.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#FF7A00] transform transition-all hover:scale-110"
          />
        </div>

        {!isEditing ? (
          <>
            <div className="space-y-4 text-[#240046]">
              <p className="text-xl font-medium"><strong>Name:</strong> <span className="ml-7">{profileData.name}</span></p>
              <p className="text-xl font-medium"><strong>Email:</strong><span className="ml-8"> {profileData.email}</span></p>
              <p className="text-xl font-medium"><strong>Address:</strong> <span className="ml-2">{profileData.address}</span></p>
              <p className="text-xl font-medium"><strong>Phone:</strong> <span className="ml-7">{profileData.phone}</span></p>
            </div>
            <div className="mt-6 flex flex-col justify-center space-y-4">
              <button
                onClick={handleBusinessButtonClick}
                className="bg-[#FF7A00] text-white py-2 px-6 rounded-lg hover:bg-[#FF9100] transition duration-300 transform hover:scale-105"
              >
                {business ? "Go to Business Account" : "Start Business"}
              </button>
              <button
                onClick={toggleEditMode}
                className="bg-[#FF7A00] text-white py-2 px-6 rounded-lg hover:bg-[#FF9100] transition duration-300 transform hover:scale-105"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-[#FF7A00] text-white py-2 px-6 rounded-lg hover:bg-[#FF9100] transition duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 text-[#240046] mt-6">
            <div>
              <label className="block text-lg font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-between space-x-4">
              <button
                type="submit"
                className="w-full bg-[#FF7A00] text-white py-2 px-4 rounded-lg hover:bg-[#FF9100] transition duration-300 transform hover:scale-105"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={toggleEditMode}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
