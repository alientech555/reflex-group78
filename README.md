# ⚡ Reflex: Last-Mile Logistics for Kenya

> **Replacing opaque WhatsApp coordination with a verifiable, real-time, multi-persona logistics ecosystem.**

[![Node.js](https://img.shields.io/badge/Backend-Node.js_&_Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Frontend](https://img.shields.io/badge/Frontend-Vanilla_JS_&_Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 🎯 The Executive Summary

**The Problem:** Small Kenyan retailers coordinate deliveries via WhatsApp and phone calls. This results in zero record of assignment, no status visibility, and no cryptographic proof of delivery. 
**The Solution:** Reflex is a unified, cloud-native platform connecting four distinct personas (Retailer, Dispatcher, Rider, Buyer) into a single source of truth. It replaces manual coordination with drag-and-drop fleet assignment, live GPS tracking, and QR/POD-verified delivery confirmations.

---

## 🏗️ System Architecture

Reflex utilizes a **Client-Server-Realtime** architecture designed for low-latency logistics tracking:

1. **The Presentation Layer (Frontend):** A highly responsive, mobile-first Single Page Application (SPA) built with Vanilla JS and Tailwind CSS. It handles complex UI states (e.g., simulated mobile frames for riders, drag-and-drop zones for dispatchers).
2. **The API & Realtime Layer (Backend):** A Node.js/Express server serving both the REST API for CRUD operations and a **Socket.io** event bus. 
3. **The Persistence Layer (Database):** MongoDB Atlas handles relational data modeling (Users, Orders, Products, Claims) with atomic operations for inventory management.

**Real-Time Flow:** When a Retailer submits an order, the frontend emits a `order:created` event via Socket.io. The server instantly broadcasts this to the Dispatcher's room, updating the Leaflet map and queue without a single HTTP polling request.

---

## 📂 Final Repository Structure

```text
reflex-logistics/
├── config/
│   └── db.js               # MongoDB Atlas connection handler
├── models/                 # Mongoose Schemas (User, Order, Product, Claim)
├── routes/                 # REST API Endpoints (Auth, Users, Orders, Products, Claims)
├── seeds/
│   └── seed.js             # Automated demo data seeder for Kenyan retail context
├── public/
│   ├── index.html          # The 1196-line Frontend SPA (All 4 Personas)
│   ├── api.js              # REST API wrapper for state fetching
│   └── socket-client.js    # WebSocket event listener for real-time syncing
├── server.js               # Express & Socket.io entry point
├── socket.js               # Real-time event routing engine (Room-based broadcasting)
├── package.json            # Dependencies & Scripts
├── render.yaml             # Infrastructure as Code (1-Click Render Deployment)
├── .env.example            # Environment variables template
└── README.md               # You are here.
