import React, { useState, useEffect } from "react";
import axios from "axios";

// Axios configuration to include Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://squiirshop-server.vercel.app/api/v1/process/product");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage({ text: "Error fetching products.", type: "error" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    if (formData.image) form.append("image", formData.image);

    try {
      if (editMode) {
        // Update product
        await axios.put(
          `https://squiirshop-server.vercel.app/api/v1/process/editproduct:${formData.id}`,
          form
        );
        setMessage({ text: "Product updated successfully!", type: "success" });
      } else {
        // Add product
        await axios.post(
          "https://squiirshop-server.vercel.app/api/v1/process/product",
          form
        );
        setMessage({ text: "Product added successfully!", type: "success" });
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      setMessage({ text: "Error saving product.", type: "error" });
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: null,
    });
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://squiirshop-server.vercel.app/api/v1/process/delproduct:${id}`);
      fetchProducts();
      setMessage({ text: "Product deleted successfully!", type: "success" });
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage({ text: "Error deleting product.", type: "error" });
    }
  };

  const resetForm = () => {
    setFormData({ id: "", name: "", description: "", price: "", image: null });
    setEditMode(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-orange-500 to-purple-950 text-transparent bg-clip-text">
        Product Manager
      </h1>

      {message.text && (
        <div
          className={`mb-4 text-center py-3 px-6 rounded-lg ${
            message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 mb-8 border-t-4 border-orange-500"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Product Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Product Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Product Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-purple-950 text-white font-bold rounded-lg shadow hover:from-purple-950 hover:to-orange-500 transition-transform transform hover:scale-105 focus:outline-none"
          >
            {editMode ? "Update" : "Add"} Product
          </button>
          {editMode && (
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-gray-400 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition-transform transform hover:scale-105 focus:outline-none"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-orange-500 font-bold mt-2">${product.price}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-950 text-white font-bold rounded-lg shadow hover:from-purple-950 hover:to-orange-500 transition-transform transform hover:scale-105 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
