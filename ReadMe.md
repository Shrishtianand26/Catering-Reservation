#  Catering Reservation System

This is a responsive web-based application that helps rural caterers promote and sell their food services online. The system allows both **Users** and **Admins** to register, log in, and perform actions based on their roles.
Built with Firebase for real-time database and authentication.

---

##  Project Objective

- Help rural towns sell their catering services globally
- Promote traditional Indian culture through local cuisine
- Provide a simple portal for users to place orders and for admins to manage products

---

## 🔧 Technologies Used

- **HTML, CSS, JavaScript**
- **Firebase Authentication**
- **Firestore Database**

---

## 👥 System Roles

### Admin
-  View all products
- Add items to cart
- Place orders
- View all user orders
- View admin profile
- Logout functionality

### User
- Upload food product details
- View and manage your orders
- View profile (email & user ID)
- Logout functionality

---

## 📁 Project Files
CATERING RESERVATION/
│
├── admin-dashboard.html       # Admin UI
├── admin.js                   # Admin logic
├── auth.js                    # Auth/login logic
├── dashboard.css              # Combined Admin/User dashboard styles
├── firebase.js                # Firebase config
├── index.html                 # Homepage (optional)
├── login.html                 # Login screen
├── orders.html                # (Deprecated if dashboard is unified)
├── upload.html                # (Deprecated if dashboard is unified)
├── package.json               # Node config (if using tools)
├── ReadMe.md                  # Project documentation ✅
├── style.css / style1.css     # Old or separate stylesheets
├── user-dashboard.html        # User dashboard
├── user.js                    # User logic
└── node_modules/              # (if used with npm or local dev tools)

---

## Workflow & Execution Guide
 1. User Authentication
- Users and Admins log in using Email/Password.
- Authentication is handled via Firebase Authentication.

 2. User Uploads Product
- After login, the user is redirected to user-dashboard.html.
- Users can submit:
    - Product Name
    - Description
    - Price
- Data is saved to Firebase Realtime Database under /products.

 3. Admin Views & Orders Products
- Admin logs in via the same login.html.
- Admin dashboard (admin-dashboard.html) allows:
    - Viewing all products
    - Adding selected products to cart
    - Placing an order
- Order details saved to /orders.
 4. View Orders
- Users and Admins can view orders placed using the "My Orders" section.
- Orders are fetched dynamically from Firebase.

 5. Profile Section
 - Displays authenticated user's email and UID (via Firebase).

---

##  Logging

Every important action (like login, registration, order placement) is logged in the browser using `console.log()` for tracking.

---

##  Getting Started

1. Clone or download this project  
2. Replace the Firebase config in `firebase.js` with your own from Firebase Console  
3. Open `index.html` in your browser  
4.  Open with Live Server or Python.
5. Register or login to try the app

---

##  Features To Improve

- Password reset option
- Image upload support
- Better order tracking
- Admin analytics dashboard
- Real-time notifications for orders
- Payment gateway integration

---

> Created with &hearts;
