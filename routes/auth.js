// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });
    if (!user || user.password !== password) return res.status(400).json({ msg: 'Invalid credentials' });
    if (user.status === 'rejected') return res.status(403).json({ msg: 'Application rejected', user });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
});

router.post('/signup', async (req, res) => {
    const { email, password, role, name, phone, savedAddress } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });
    const newUser = new User({ id: `U-${Date.now()}`, email, password, role, name, phone, status: role === 'rider' ? 'pending' : 'approved', savedAddress });
    await newUser.save();
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: newUser });
});
module.exports = router;