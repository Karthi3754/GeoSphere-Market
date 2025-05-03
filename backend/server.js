import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import { Server } from 'socket.io'; 
import { createServer } from 'http'; 

const app = express();
const port = process.env.PORT || 5000; 
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Existing chat functionality
    socket.on('joinRoom', (role) => {
        console.log(`Received joinRoom event with role: ${role}`);
        socket.join(role);
        console.log(`${role} joined the room: ${role}`);
        const roomClients = io.sockets.adapter.rooms.get(role);
        console.log(`Number of clients in ${role} room: ${roomClients ? roomClients.size : 0}`);
    });

    socket.on('sendMessage', ({ sender, recipient, message }) => {
        console.log(`Message from ${sender} to ${recipient}: ${message}`);
        if (!['admin', 'seller', 'user'].includes(sender) || !['admin', 'seller', 'user'].includes(recipient)) {
            console.log(`Invalid sender or recipient: ${sender} -> ${recipient}`);
            return;
        }
        if (
            (sender === 'admin' && recipient === 'seller') ||
            (sender === 'seller' && (recipient === 'admin' || recipient === 'user')) ||
            (sender === 'user' && recipient === 'seller')
        ) {
            console.log(`Sending message to ${recipient}`);
            io.to(recipient).emit('receiveMessage', { sender, message });
            io.to(sender).emit('receiveMessage', { sender, message });
        } else {
            console.log(`Communication not allowed: ${sender} -> ${recipient}`);
        }
    });

    // New: Join a room for a specific order to receive location updates
    socket.on('joinOrderRoom', (orderId) => {
        console.log(`Client joined order room: ${orderId}`);
        socket.join(`order_${orderId}`);
        const roomClients = io.sockets.adapter.rooms.get(`order_${orderId}`);
        console.log(`Number of clients in order_${orderId} room: ${roomClients ? roomClients.size : 0}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Make io accessible to routes/controllers
app.set('io', io);

server.listen(port, () => console.log('Server Started on PORT:' + port));