import { auth, db } from './firebase.js';
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const emailDisplay = document.getElementById("user-email");
const uploadSection = document.getElementById("upload-section");
const ordersSection = document.getElementById("orders-section");
const ordersList = document.getElementById("orders-list");

onAuthStateChanged(auth, user => {
  if (user) {
    emailDisplay.textContent = `Logged in as: ${user.email}`;
  } else {
    window.location.href = "login.html";
  }
});

window.logoutUser = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

window.showSection = function (section) {
  uploadSection.style.display = section === 'upload' ? 'block' : 'none';
  ordersSection.style.display = section === 'orders' ? 'block' : 'none';

  if (section === 'orders') {
    loadOrders();
  }
};

window.uploadProduct = async function () {
  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  const price = parseFloat(document.getElementById("productPrice").value);

  if (!name || !description || isNaN(price)) {
    alert("Please fill all product details correctly.");
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      name,
      description,
      price,
      userId: auth.currentUser.uid,
      email: auth.currentUser.email
    });
    alert("✅ Product uploaded successfully!");
    document.getElementById("productName").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("productPrice").value = "";
  } catch (error) {
    alert(`❌ Upload failed: ${error.message}`);
  }
};

async function loadOrders() {
  ordersList.innerHTML = "";
  const q = query(collection(db, "orders"), where("userId", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.productName} - ₹${data.amount}`;
    ordersList.appendChild(li);
  });
  const profileSection = document.getElementById("profile-section");
const profileEmail = document.getElementById("profile-email");
const profileUid = document.getElementById("profile-uid");

window.showSection = function (section) {
  uploadSection.style.display = 'none';
  ordersSection.style.display = 'none';
  profileSection.style.display = 'none';

  if (section === 'upload') {
    uploadSection.style.display = 'block';
  } else if (section === 'orders') {
    ordersSection.style.display = 'block';
    loadOrders();
  } else if (section === 'profile') {
    profileSection.style.display = 'block';
    const user = auth.currentUser;
    if (user) {
      profileEmail.textContent = user.email;
      profileUid.textContent = user.uid;
    }
  }
};
}