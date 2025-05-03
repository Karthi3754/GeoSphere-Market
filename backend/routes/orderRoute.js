import express from 'express';
import { 
    allOrders, 
    placeOrder, 
    placeOrderRazorpay, 
    placeOrderStripe, 
    updateStatus, 
    userOrders, 
    verifyRazorpay, 
    verifyStripe
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
import sellerAuth from '../middleware/sellerAuth.js';

const orderRouter = express.Router();

// Admin routes
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status/update/admin', adminAuth, updateStatus);

// Seller routes
orderRouter.post('/orders', sellerAuth, allOrders);
orderRouter.post('/status', sellerAuth, updateStatus);

// User routes
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);


export default orderRouter;