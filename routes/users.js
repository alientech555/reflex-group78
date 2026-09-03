// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => res.json(await User.find()));
router.get('/riders', async (req, res) => res.json(await User.find({ role: 'rider', status: 'approved' })));
router.put('/:id/location', async (req, res) => res.json(await User.findOneAndUpdate({ id: req.params.id }, { lat: req.body.lat, lng: req.body.lng }, { new: true })));
router.put('/:id/onboard', async (req, res) => res.json(await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })));
router.put('/:id/approve', async (req, res) => res.json(await User.findOneAndUpdate({ id: req.params.id }, { status: 'approved' }, { new: true })));
router.put('/:id/reject', async (req, res) => res.json(await User.findOneAndUpdate({ id: req.params.id }, { status: 'rejected', rejectionReason: req.body.reason, rejectedAt: Date.now() }, { new: true })));
module.exports = router;