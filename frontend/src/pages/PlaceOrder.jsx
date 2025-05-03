import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });
  const [location, setLocation] = useState(null);

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast.success('Location captured successfully');
        },
        (error) => {
          toast.error(`Error getting location: ${error.message}`);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        if (window.Razorpay) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Razorpay SDK failed to load'));
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript().catch(error => {
      console.error('Failed to load Razorpay script:', error);
      toast.error('Payment gateway initialization failed');
    });
  }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Order Payment',
        description: 'Order Payment',
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response) => {
          try {
            const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', 
              { ...response, userId: token }, 
              { headers: { token } }
            );
            if (data.success) {
              navigate('/orders');
              setCartItems({});
              toast.success('Payment successful');
            } else {
              toast.error(data.message || 'Payment verification failed');
            }
          } catch (error) {
            toast.error(error.message || 'Payment verification failed');
          }
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment canceled');
          }
        }
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error('Payment gateway is not loaded');
      }
    } catch (error) {
      console.error('Razorpay initialization error:', error);
      toast.error('Failed to initialize payment');
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        userId: token,
        location: location ? {
          type: "Point",
          coordinates: [location.lng, location.lat]
        } : null
      };

      switch (method) {
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
            toast.success('Order placed successfully');
          } else {
            toast.error(response.data.error);
          }
          break;
        }
        case 'stripe': {
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }
        case 'razorpay': {
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.error(responseRazorpay.data.message);
          }
          break;
        }
        default:
          toast.error('Invalid payment method');
          break;
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while placing the order');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"DELIVERY "} text2={" INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input 
            required 
            onChange={onChangeHandler} 
            name="firstName" 
            value={formData.firstName} 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
            type="text" 
            placeholder="First Name" 
          />
          <input 
            required 
            onChange={onChangeHandler} 
            name="lastName" 
            value={formData.lastName} 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
            type="text" 
            placeholder="Last Name" 
          />
        </div>
        <input 
          required 
          onChange={onChangeHandler} 
          name="email" 
          value={formData.email} 
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
          type="email" 
          placeholder="Email Address" 
        />
        <input 
          required 
          onChange={onChangeHandler} 
          name="street" 
          value={formData.street} 
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
          type="text" 
          placeholder="Street" 
        />
        <div className="flex gap-3">
          <input 
            required 
            onChange={onChangeHandler} 
            name="city" 
            value={formData.city} 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
            type="text" 
            placeholder="City" 
          />
          <input 
            required 
            onChange={onChangeHandler} 
            name="state" 
            value={formData.state} 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
            type="text" 
            placeholder="State" 
          />
        </div>
        <div className="flex gap-3">
          <input 
            required 
            onChange={onChangeHandler} 
            name="zipcode" 
            value={formData.zipcode} 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
            type="number" 
            placeholder="ZIP Code" 
          />
          <input 
            required 
            onChange={onChangeHandler} 
            name="country" 
            value={formData.country} 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
            type="text" 
            placeholder="Country" 
          />
        </div>
        <input 
          required 
          onChange={onChangeHandler} 
          name="phone" 
          value={formData.phone} 
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
          type="number" 
          placeholder="Phone No" 
        />
        <button 
          type="button"
          onClick={captureLocation}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {location ? 'Location Captured' : 'Capture Delivery Location'}
        </button>
        {location && (
          <p className="text-sm text-green-600">
            Location ready: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </p>
        )}
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT "} text2={" METHOD"} />
          <div className="flex flex-col gap-3 lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 p-2 px-3 border cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 p-2 px-3 border cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 p-2 px-3 border cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="mx-4 text-sm font-medium text-gray-500">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full mt-8 text-end">
            <button type="submit" className="px-16 py-3 text-sm text-white bg-black">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;
