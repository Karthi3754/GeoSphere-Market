# 🚚 Smart Delivery with Real-Time Integration

Smart Delivery with Real-Time Integration is a full-stack delivery system that enables users to select their delivery location through Google Maps, integrates real-time location tracking, and offers seamless delivery management for users, admins, and delivery partners.

## 📌 Features

- 🌍 **Google Maps Integration** – Users can select their precise delivery location on a map.
- 🛒 **E-commerce Integration** – Add products to cart and proceed to checkout with location selection.
- 🔐 **Authentication** – Secure login/signup for Users, Admins, and Sellers.
- 💬 **Admin Dashboard** – View orders and Add Products.
- 💬 **Seller Dashboard** – View orders with mapped delivery locations.
- ☁️ **Cloud Storage** – Images and product data stored via Cloudinary.
- 📡 **MongoDB Integration** – Persistent storage of user data, delivery info, and coordinates.
- 🗺️ **Separate Map Tab** – Map opens in a new tab, allowing easy Access of location coordinates from the user.

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS or Bootstrap
- Axios
- Google Maps JavaScript API

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- Cloudinary (for image storage)
- JWT for Authentication

---

## 📍 How Google Maps Integration Works

1. The user fills in their delivery address (e.g., street, city, state, pincode) during checkout.
2. A button labeled **"Get Coordinates"** is provided below the address form.
3. When clicked, the app sends the address to the **Google Maps Geocoding API**.
4. The API returns the corresponding **latitude and longitude**.
5. These coordinates are automatically stored along with the delivery details.
6. Only the **seller** has access to view the exact delivery location (lat/lng) for dispatch purposes.

Happy Coding 🚀🎯
