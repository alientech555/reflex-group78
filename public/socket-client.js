// public/socket-client.js
const socket = io();
if (typeof currentUser !== 'undefined' && currentUser) {
    socket.emit('join_room', currentUser.role);
    if (currentUser.role === 'dispatcher') {
        socket.on('new_order', (order) => { state.orders.unshift(order); renderDispatchQueue(); refreshApprovalBadge(); showToast('📦 New order received!', 'inbox'); });
        socket.on('rider_location', (data) => { const rider = state.riders.find(r => r.id === data.riderId || r.userId === data.riderId); if (rider) { rider.lat = data.lat; rider.lng = data.lng; updateMapMarkers(); } });
    }
    if (currentUser.role === 'rider') {
        socket.on('new_assignment', (data) => { state.orders.unshift(data.order); renderCurrentRiderTab(); showToast('🏍️ New delivery assigned!', 'bike'); });
    }
    if (currentUser.role === 'retailer') {
        socket.on('order_update', (updatedOrder) => { const idx = state.orders.findIndex(o => o.id === updatedOrder.id); if (idx !== -1) { state.orders[idx] = updatedOrder; renderOrdersTable(); renderRetailerStats(); } });
    }
}