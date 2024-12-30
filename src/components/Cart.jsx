import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after checkout

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const navigate = useNavigate(); // For navigation after successful checkout

  useEffect(() => {
    // Fetch cart data from the backend
    axios
      .get("https://squiirshop-server.vercel.app/api/v1/process/cart")
      .then((response) => {
        setCartItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load cart data. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleRemoveItem = (productId) => {
    axios
      .delete(`https://squiirshop-server.vercel.app/api/v1/process/cart/${productId}`)
      .then(() => {
        setCartItems(cartItems.filter((item) => item.product._id !== productId));
      })
      .catch((error) => {
        alert("Failed to remove item. Please try again.");
      });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product?.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + price * quantity;
    }, 0);
  };

  const handleCheckout = () => {
    setIsProcessingCheckout(true); // Start loading state for checkout process

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // If no token is found, alert the user
    if (!token) {
      setIsProcessingCheckout(false);
      alert("You need to be logged in to checkout.");
      return;
    }

    // Prepare the data to send to the backend
    const orderData = {
      cartItems,
      total: calculateTotal(),
    };

    // Sending cart data to backend for checkout process with the Bearer token in headers
    axios
      .post("https://squiirshop-server.vercel.app/api/v1/process/checkout", {
        headers: {
          Authorization: `Bearer ${token}`,  // Add token here
        },
      })
      .then((response) => {
        setIsProcessingCheckout(false);
        alert("Checkout successful!"); // Show success message
        navigate("/ordersuccess"); // Redirect to order confirmation page
      })
      .catch((error) => {
        setIsProcessingCheckout(false);
        alert("Failed to complete checkout. Please try again.");
      });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-orange-500 text-center mb-8">Your Cart</h1>
      <div className="container mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-40 w-full object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.product.name}</h2>
                <p className="text-gray-600 mb-1">Price: ${parseFloat(item.product?.price) || 0}</p>
                <p className="text-gray-600 mb-1">Quantity: {parseInt(item.quantity, 10) || 0}</p>
                <p className="text-gray-600 mb-1">Description: {item.product.description || "No description"}</p>

                <p className="font-bold text-gray-800 mb-3">
                  Total: ${parseFloat(item.product?.price) * parseInt(item.quantity, 10) || 0}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.product._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-8 p-6 bg-white shadow-lg rounded-lg flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold text-orange-500">
                Grand Total: ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isProcessingCheckout}
              className={`bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors ${
                isProcessingCheckout ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isProcessingCheckout ? "Processing..." : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
