// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

router.get('/', async (req, res) => res.json(await Order.find().sort({ createdAt: -1 })));
router.post('/', async (req, res) => {
    if (req.body.items) { for (let item of req.body.items) await Product.findOneAndUpdate({ id: item.productId }, { $inc: { stock: -item.qty } }); }
    res.status(201).json(await new Order(req.body).save());
});
router.put('/:id/assign', async (req, res) => {
    const { riderId, riderName, podCode } = req.body;
    await User.findOneAndUpdate({ id: riderId }, { status: 'en_route' });
    res.json(await Order.findOneAndUpdate({ id: req.params.id }, { status: 'assigned', riderId, rider: riderName, podCode }, { new: true }));
});
router.put('/:id/status', async (req, res) => res.json(await Order.findOneAndUpdate({ id: req.params.id }, { status: req.body.status }, { new: true })));
module.exports = router;