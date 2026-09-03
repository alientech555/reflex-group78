// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => res.json(await Product.find()));
router.post('/', async (req, res) => res.status(201).json(await new Product(req.body).save()));
module.exports = router;