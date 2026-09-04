// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const connectDB = require('./config/db');
const socketConfig = require('./socket');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketConfig.init(server);
connectDB();

app.use(cors());
app.use(express.json({ limit: '50mb' })); // High limit for Base64 document uploads
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));
app.use('/api/claims', require('./routes/claims'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Reflex API & Socket Server running on port ${PORT}`));