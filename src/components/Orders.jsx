import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellerOrders = () => {
    const [orders, setOrders] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSellerOrders = async () => {
            try {
                setLoading(true);
                setError('');

                // Fetch orders from the backend
                const response = await axios.get('http://localhost:3000/api/v1/process/seller-orders', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
                    },
                });

                // Check if response contains valid orders data
                if (response.data && response.data.orders) {
                    setOrders(response.data.orders);
                } else {
                    setError('No orders found for your products.');
                }
            } catch (err) {
                setError(
                    err.response?.data?.message || 'Failed to fetch orders. Please try again.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSellerOrders();
    }, []);

    if (loading) {
        return <div className="text-center text-lg font-medium mt-10">Loading orders...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-500 text-lg font-medium mt-10">{error}</div>
        );
    }

    return (
        <div className="p-6  min-h-screen">
            <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">Seller Orders</h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-600">No orders found for your products.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
                        >
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">
                                Order ID: {order.userId}
                            </h3>
                            <p className="text-gray-600 mb-2">
                                <span className="font-medium">Customer Name:</span>{' '}
                                {order.userName}
                            </p>
                            <ul className="space-y-4">
                                {order.items.map((item, itemIndex) => (
                                    <li
                                        key={itemIndex}
                                        className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-700">
                                                Product: {item.productName}
                                            </p>
                                            <p className="text-gray-600">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="text-gray-800 font-semibold">
                                            ${item.price}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SellerOrders;
