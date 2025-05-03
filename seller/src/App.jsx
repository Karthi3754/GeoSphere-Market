import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Orders from "./pages/Orders";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./components/Chat";
import ChatWithUser from "./components/ChatWithUser";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [sellerToken, setSellerToken] = useState(
    localStorage.getItem("sellerToken") ? localStorage.getItem("sellerToken") : ""
  );

  useEffect(() => {
    localStorage.setItem("sellerToken", sellerToken);
  }, [sellerToken]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {sellerToken === "" ? (
        <Login setToken={setSellerToken} />
      ) : (
        <>
          <Navbar setToken={setSellerToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/orders" element={<Orders token={sellerToken} />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat-with-user" element={<ChatWithUser />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
