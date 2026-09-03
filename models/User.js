// models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['retailer', 'dispatcher', 'rider', 'buyer'], required: true },
    name: String, phone: String,
    status: { type: String, enum: ['pending', 'pending_review', 'approved', 'rejected'], default: 'approved' },
    vehicle: String, vehicleModel: String, vehicleReg: String, vehicleYear: Number,
    insuranceProvider: String, insurancePolicy: String, insuranceExpiry: Date, insuranceCoverage: String,
    documents: { dl: String, insurance: String, vehicle: String }, // Base64 strings
    rejectionReason: String, rejectedAt: Date, savedAddress: String,
    lat: Number, lng: Number, deliveries: { type: Number, default: 0 },
    rating: { type: Number, default: 5.0 }, earnings: { type: Number, default: 0 },
    successfulPurchases: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);