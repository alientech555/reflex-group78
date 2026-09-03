// public/api.js
class ReflexAPI {
    constructor() { this.base = '/api'; }
    async fetchState() {
        const [users, orders, products, claims] = await Promise.all([
            fetch(`${this.base}/users`).then(r => r.json()),
            fetch(`${this.base}/orders`).then(r => r.json()),
            fetch(`${this.base}/products`).then(r => r.json()),
            fetch(`${this.base}/claims`).then(r => r.json())
        ]);
        return { users, orders, products, claims };
    }
    async syncOrder(order) {
        await fetch(`${this.base}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
    }
}
window.api = new ReflexAPI();