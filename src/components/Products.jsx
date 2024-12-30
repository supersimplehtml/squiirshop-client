import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductFeed = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);
  const [cartError, setCartError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://squiirshop-server.vercel.app/api/v1/process/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post("https://squiirshop-server.vercel.app/api/v1/process/addcart", {
        productId,
      });
      setCartMessage("Product added to cart successfully!");
      setCartError(null);
      console.log("Added to cart:", response.data);
    } catch (error) {
      setCartError("Error adding to cart. Please try again.");
      setCartMessage(null);
      console.error("Failed to add to cart:", error);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return <div className="text-center text-red-500 font-bold mt-4">Error: {error}</div>;
  }

  // Render product list
  return (
    <div className="p-6">
      {cartMessage && (
        <div className="text-center text-white bg-green-600 p-4 font-semibold mt-4 mb-5 rounded-lg">{cartMessage}</div>
      )}
      {cartError && (
        <div className="text-center text-red-500 font-semibold mt-4">{cartError}</div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={product.owner.profileImage}
                  className="w-12 h-12 rounded-full object-cover"
                  alt="Owner"
                />
                <div>
                  <p className="text-gray-700 font-medium">{product.owner.name}</p>
                  <p className="text-gray-500 text-sm">Owner</p>
                </div>
              </div>
              <p className="text-orange-500 font-bold text-xl mb-4">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Add To Cart
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 font-medium">No products available.</div>
        )}
      </div>
    </div>
  );
};

export default ProductFeed;
