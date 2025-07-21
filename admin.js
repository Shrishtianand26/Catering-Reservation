import { auth, db } from './firebase.js';
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Elements
const adminEmail = document.getElementById("admin-email");
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const orderList = document.getElementById("order-list");
const profileEmail = document.getElementById("profile-email");
const profileUid = document.getElementById("profile-uid");

let cart = [];

// Auth listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    adminEmail.textContent = `Logged in as: ${user.email}`;
    profileEmail.textContent = user.email;
    profileUid.textContent = user.uid;
    loadProducts();
    loadOrders();
  } else {
    window.location.href = "login.html";
  }
});

// Section switcher
window.showSection = function (section) {
  const sections = ['products', 'cart', 'place', 'orders', 'profile'];
  sections.forEach(s => {
    document.getElementById(`${s}-section`).style.display = (s === section) ? 'block' : 'none';
  });

  if (section === 'products') loadProducts();
  if (section === 'orders') loadOrders();
  if (section === 'cart') renderCart();
};

// Logout
window.logoutAdmin = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

// Load products from Firestore
async function loadProducts() {
  productList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.name} - ₹${data.price}`;
    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.onclick = () => addToCart(data);
    li.appendChild(btn);
    productList.appendChild(li);
  });
}

// Add to cart
function addToCart(product) {
  cart.push(product);
  alert(`${product.name} added to cart.`);
}

// Render cart items
function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      renderCart();
    };
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
}

// Place order
window.placeOrder = async function () {
  const user = auth.currentUser;
  if (!user || cart.length === 0) {
    alert("Cart is empty or user not logged in.");
    return;
  }

  try {
    for (const item of cart) {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,
        productName: item.name,
        amount: item.price
      });
    }
    alert("✅ Order placed successfully!");
    cart = [];
    renderCart();
    loadOrders();
  } catch (error) {
    console.error("Order error:", error);
    alert("❌ Failed to place order.");
  }
};

// Load orders
async function loadOrders() {
  orderList.innerHTML = "";
  const q = query(collection(db, "orders"), where("userId", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.productName} - ₹${data.amount}`;
    orderList.appendChild(li);
  });
  document.getElementById("product-list").innerHTML = "";

}
