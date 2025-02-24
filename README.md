
# Headless E-Commerce Store with WordPress & WooCommerce API

## 🚀 Project Overview
This project is a **Headless E-Commerce Store** built using **WordPress** as a backend and **WooCommerce REST APIs** for handling e-commerce functionalities. The frontend is developed using **React.js**, providing a modern, fast, and interactive user experience.

## 📌 Features Implemented
### ✅ Backend (WordPress & WooCommerce)
- **WordPress & WooCommerce Setup** using Local by Flywheel.
- **WooCommerce REST API Integration** for product management, orders, and authentication.
- **Custom Endpoints & API Testing** using Postman.

### ✅ Frontend (React.js)
- **React Project Initialization** with modern development setup.
- **React Router Integration** for seamless navigation.
- **User Authentication** (Signup, Login, Logout) using WooCommerce APIs.
- **Core Pages Developed:**
  - Homepage
  - Product Listing Page
  - Product Detail Page
  - Cart Page
  - My Account Page
  - My Orders Page
- **State Management** for handling cart and user authentication.

## 🛠️ Tech Stack
- **Backend:** WordPress, WooCommerce, WooCommerce REST APIs
- **Frontend:** React.js, React Router, Axios
- **Tools:** Local by Flywheel, Postman

## 📌 Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/headless-woo-store.git
cd headless-woo-store
```

### 2️⃣ Backend Setup (WordPress & WooCommerce)
1. Install **Local by Flywheel** and create a new WordPress site.
2. Install the **WooCommerce plugin** and configure it.
3. Generate **WooCommerce API keys**:
   - Go to `WooCommerce > Settings > Advanced > REST API`
   - Create a new API key with `Read/Write` permissions.
4. Enable **Permalinks** in `Settings > Permalinks` (set to "Post Name").
5. Add your local site to the `hosts` file if needed:
   ```sh
   127.0.0.1 headless-store.local
   ```

### 3️⃣ Frontend Setup (React.js)
1. Navigate to the frontend folder and install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Create a `.env` file and add:
   ```env
   REACT_APP_API_BASE_URL=http://headless-store.local/wp-json/wc/v3
   REACT_APP_CONSUMER_KEY=your_consumer_key
   REACT_APP_CONSUMER_SECRET=your_consumer_secret
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## 🛠 API Endpoints Used
- **Products:** `/wp-json/wc/v3/products`
- **Orders:** `/wp-json/wc/v3/orders`
- **Authentication:** `/wp-json/jwt-auth/v1/token`

## 🚀 Next Steps
- Implement payment gateway integration.
- Optimize performance and improve UI/UX.
- Deploy the application.

---
💡 **Contributions & Feedback:** Feel free to open issues or contribute to this project!

