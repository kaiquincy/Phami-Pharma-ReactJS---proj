import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useOrder from '../hooks/useOrder';

const CheckoutScreen = () => {
  const { orders, clearOrders } = useOrder();
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [showModal, setShowModal] = useState(false);

  // Calculate the total amount for the order
  const total = orders.reduce((acc, item) => acc + parseFloat(item.price), 0);

  const handlePlaceOrder = () => {
    // Optionally integrate with a payment gateway or API call here
    // Clear orders and show the modal
    if (clearOrders) {
      clearOrders();
    }
    setShowModal(true);
  };

  const handleGoHome = () => {
    history.push('/');
  };

  if (orders.length === 0 && !showModal) {
    return (
      <section className="max-w-screen-xl mx-auto px-6 py-24">
        <h1 className="text-3xl text-center text-gray-700">No orders to checkout</h1>
      </section>
    );
  }

  return (
    <section className="max-w-screen-xl mx-auto px-6 py-24 relative">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Checkout</h1>
      
      {/* Order Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="flex justify-between py-2 border-b">
              <span>{order.title}</span>
              <span>${parseFloat(order.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded"
      >
        Place Order
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          {/* Modal Content */}
          <div className="bg-white p-8 rounded shadow-lg z-10 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <p className="mb-6">Your order totaling ${total.toFixed(2)} has been placed using {paymentMethod}.</p>
            <button
              onClick={handleGoHome}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutScreen;
