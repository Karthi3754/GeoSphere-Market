import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    status: { type: String, required: true, default: 'Order Placed' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true },
})
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)

// Create 2dsphere index for geospatial queries if not exists
orderModel.createIndexes().catch(err => {
  if (err.code !== 85) { // Ignore "index already exists" errors
    console.error('Error creating indexes:', err)
  }
})
export default orderModel;
