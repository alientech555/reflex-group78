// socket.js
const socketio = require('socket.io');
let io;
module.exports = {
    init: (server) => {
        io = socketio(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
        io.on('connection', (socket) => {
            socket.on('join_room', (role) => socket.join(role));
            socket.on('order:created', (order) => { io.to('dispatcher').emit('new_order', order); io.to('retailer').emit('order_update', order); });
            socket.on('order:assigned', (data) => { io.to('rider').emit('new_assignment', data); io.to('retailer').emit('order_update', data.order); });
            socket.on('status:update', (data) => { io.to('dispatcher').emit('fleet_update', data); io.to('retailer').emit('order_update', data.order); });
            socket.on('rider:move', (data) => socket.to('dispatcher').emit('rider_location', data));
        });
        return io;
    },
    getIO: () => io
};