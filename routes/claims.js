// routes/claims.js
const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const Order = require('../models/Order');
const Product = require('../models/Product');

router.get('/', async (req, res) => res.json(await Claim.find().sort({ createdAt: -1 })));
router.post('/', async (req, res) => res.status(201).json(await new Claim(req.body).save()));
router.put('/:id/approve', async (req, res) => res.json(await Claim.findOneAndUpdate({ id: req.params.id }, { status: 'approved' }, { new: true })));
router.put('/:id/verify', async (req, res) => {
    const claim = await Claim.findOneAndUpdate({ id: req.params.id }, { status: 'resolved', resolvedAt: Date.now() }, { new: true });
    const order = await Order.findOne({ id: claim.orderId });
    if (order && order.items) { for (let item of order.items) await Product.findOneAndUpdate({ id: item.productId }, { $inc: { stock: item.qty } }); }
    res.json(claim);
});
module.exports = router;