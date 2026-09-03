// models/Claim.js
const mongoose = require('mongoose');
const ClaimSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, orderId: { type: String, required: true },
    action: { type: String, enum: ['refund', 'repurchase'] }, reason: String, otherReason: String, notes: String,
    returnDate: Date, status: { type: String, enum: ['pending', 'approved', 'picked_up', 'collected', 'verified', 'resolved'], default: 'pending' },
    assignedRiderId: String, createdAt: { type: Date, default: Date.now }, resolvedAt: Date
});
module.exports = mongoose.model('Claim', ClaimSchema);