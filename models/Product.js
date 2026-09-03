// models/Product.js
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true }, category: String,
    price: { type: Number, required: true }, stock: { type: Number, default: 0 }, image: String
});
module.exports = mongoose.model('Product', ProductSchema);