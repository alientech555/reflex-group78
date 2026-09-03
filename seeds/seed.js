// seeds/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const connectDB = require('../config/db');

const seedDatabase = async () => {
    await connectDB();
    await User.deleteMany({}); await Order.deleteMany({}); await Product.deleteMany({});

    await User.insertMany([
        { id:'U-001', email:'retailer@demo.com', password:'demo123', role:'retailer', name:'Nairobi General Store', phone:'0700 000 001', status:'approved' },
        { id:'U-002', email:'dispatch@demo.com', password:'demo123', role:'dispatcher', name:'Dispatch Control', phone:'0700 000 002', status:'approved' },
        { id:'U-003', email:'rider@demo.com', password:'demo123', role:'rider', name:'Kevin Mutua', phone:'0711 111 111', status:'approved', vehicle:'motorcycle', lat:-1.2815, lng:36.8175, deliveries:12, rating:4.9 },
        { id:'U-004', email:'buyer@demo.com', password:'demo123', role:'buyer', name:'Jane Wanjiku', phone:'0712 345 678', savedAddress:'Westlands, Mpaka Rd', status:'approved' }
    ]);
    await Product.insertMany([
        { id:'P-001', name:'Fresh Maize Flour', price:180, category:'Groceries', image:'🌽', stock:50 },
        { id:'P-002', name:'Cooking Oil 2L', price:450, category:'Groceries', image:'🫒', stock:30 },
        { id:'P-003', name:'Sugar 2kg', price:320, category:'Groceries', image:'🍬', stock:40 }
    ]);
    await Order.insertMany([
        { id:'ORD-7829', item:'Maize Flour 2kg', qty:2, unitPrice:180, customer:'Jane Wanjiku', phone:'0712 345 678', address:'Ngong Rd', status:'delivered', rider:'Kevin Mutua', riderId:'U-003', value:360, payment:'mpesa', createdAt:Date.now()-86400000*2 },
        { id:'ORD-7832', item:'Sugar 2kg', qty:3, unitPrice:320, customer:'Peter Kamau', phone:'0744 567 890', address:'Karen, Langata Rd', status:'pending', value:960, payment:'cash', createdAt:Date.now()-1200000 }
    ]);
    console.log('Database seeded successfully'); process.exit(0);
};
seedDatabase().catch(err => { console.error(err); process.exit(1); });