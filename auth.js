//  Import Firebase auth & Firestore
import { auth, db } from './firebase.js'; 

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

//  Register User with Role
window.registerUser = async function () {
  const roleSelect = document.getElementById("role");

  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );

    // Store user info with role
    await setDoc(doc(db, "users", userCred.user.uid), {
      email: emailInput.value,
      role: roleSelect.value
    });

    message.textContent = `✅Registered as ${roleSelect.value}`;
  } catch (err) {
    message.textContent = `❌ ${err.message}`;
  }
};

//  Login & Redirect by Role
window.loginUser = async function () {
  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );

    const userDocRef = doc(db, "users", userCred.user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const role = userDoc.data().role;
      message.textContent = `✅ Logged in as ${role}`;

      //  Redirect to dashboard based on role
      if (role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "user-dashboard.html";
      }
    } else {
      message.textContent = "⚠️ No role information found.";
    }
  } catch (err) {
    message.textContent = `❌ ${err.message}`;
  }
};
