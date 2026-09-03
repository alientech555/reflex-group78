// models/Order.js
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    item: String, items: [{ productId: String, name: String, qty: Number, unitPrice: Number }],
    qty: Number, unitPrice: Number, value: Number,
    customer: String, phone: String, email: String, address: String, landmark: String,
    status: { type: String, enum: ['draft', 'pending', 'assigned', 'picked_up', 'delivered'], default: 'draft' },
    rider: String, riderId: String, time: String, payment: String, podCode: String,
    createdAt: { type: Date, default: Date.now }, confirmedAt: Date
});
module.exports = mongoose.model('Order', OrderSchema);