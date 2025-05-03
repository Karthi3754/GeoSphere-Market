import axios from "axios";
import { backendUrl, currency } from "../App";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove/",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 shadow-lg bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-xl">
      <h2 className="mb-6 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        All Products List
      </h2>
      
      <div className="flex flex-col gap-3">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>
        
        {list.length === 0 ? (
          <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-inner">
            <p className="text-lg text-gray-500">No products found</p>
          </div>
        ) : (
          list.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-indigo-500"
              key={index}
            >
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 p-1 overflow-hidden bg-gray-100 rounded-lg shadow-inner">
                  <img 
                    className="object-cover w-full h-full rounded" 
                    src={item.image[0]} 
                    alt={item.name} 
                  />
                </div>
              </div>
              
              <div className="overflow-hidden">
                <p className="font-medium text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-500">ID: {item._id.substring(0, 10)}...</p>
              </div>
              
              <div className="px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full w-fit">
                {item.category}
              </div>
              
              <div className="font-bold text-indigo-700">
                {currency}{item.price}
              </div>
              
              <div className="flex items-center justify-center">
                <button
                  onClick={() => removeProduct(item._id)}
                  className="flex items-center justify-center w-8 h-8 text-white transition-all duration-300 rounded-full shadow-sm bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:shadow focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List;