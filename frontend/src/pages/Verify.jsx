import { useContext, useEffect, useCallback } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = useCallback(async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } });
      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        navigate('/cart');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl, token, navigate, setCartItems, success, orderId]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <p>Verifying payment...</p>
    </div>
  )
}

export default Verify;