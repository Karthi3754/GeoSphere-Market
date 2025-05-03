import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import PropTypes from "prop-types";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = useCallback(async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [token]);

  const [updatingStatus, setUpdatingStatus] = useState(null);

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    setUpdatingStatus(orderId);
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status/update/admin",
        { orderId, status: newStatus },
        { 
          headers: { 
            token,
            'Content-Type': 'application/json'
          } 
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Order Place': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Packing': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Out for Delivery': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Order Page
          </h3>
          <div className="px-4 py-2 text-sm text-gray-600 bg-white rounded-lg shadow-md">
            {orders.length} Orders Found
          </div>
        </div>
        
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 bg-white shadow-md rounded-xl">
            <img src={assets.parcel_icon} alt="" className="w-20 h-20 opacity-50" />
            <p className="mt-4 text-lg text-gray-500">No orders found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 bg-white border-l-4 border-indigo-500 shadow-md rounded-xl hover:shadow-lg"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 p-6">
                  <div className="flex items-center justify-center">
                    <div className="p-3 bg-indigo-100 rounded-full">
                      <img className="w-12 h-12" src={assets.parcel_icon} alt="" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-gray-50">
                      {order.items.map((item, idx) => {
                        if (idx === order.items.length - 1) {
                          return (
                            <p className="mb-1 font-medium text-gray-800" key={idx}>
                              <span className="text-indigo-600">{item.name}</span>
                              <span className="text-gray-500"> × {item.quantity}</span>
                              {item.size && <span className="ml-1 text-gray-500">({item.size})</span>}
                            </p>
                          );
                        } else {
                          return (
                            <p className="mb-1 font-medium text-gray-800" key={idx}>
                              <span className="text-indigo-600">{item.name}</span>
                              <span className="text-gray-500"> × {item.quantity}</span>
                              {item.size && <span className="ml-1 text-gray-500">({item.size})</span>},
                            </p>
                          );
                        }
                      })}
                    </div>
                    
                    <div className="pl-3 border-l-4 border-indigo-300">
                      <p className="font-semibold text-gray-800">
                        {order.address.firstName + " " + order.address.lastName}
                      </p>
                      <div className="text-sm text-gray-600">
                        <p>{order.address.street + ", "}</p>
                        <p>
                          {order.address.city +
                            ", " +
                            order.address.state +
                            ", " +
                            order.address.zipcode +
                            ", " +
                            order.address.country}
                        </p>
                      </div>
                      <p className="font-medium text-indigo-600">{order.address.phone}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-500">Items:</span>
                        <span className="font-medium text-gray-800">{order.items.length}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Payment:</span>
                        <span className={`font-medium ${order.payment ? "text-green-600" : "text-orange-600"}`}>
                          {order.payment ? "Done" : "Pending"}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Method:</span>
                        <span className="font-medium text-gray-800">{order.paymentMethod}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium text-gray-800">{new Date(order.date).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <p className="mb-2 text-gray-500">Total Amount</p>
                      <p className="text-2xl font-bold text-indigo-700">
                        {currency}{order.amount}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-2 text-gray-500">Order Status</p>
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className={`w-full px-3 py-2 font-medium rounded-md border transition-all duration-300 cursor-pointer ${getStatusColor(order.status)} ${updatingStatus === order._id ? 'opacity-50' : ''}`}
                      disabled={updatingStatus === order._id}
                    >
                      <option value="Order Place">Order Place</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    {updatingStatus === order._id && (
                      <div className="mt-2 text-xs text-indigo-600">Updating...</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Orders;