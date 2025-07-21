import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC-28qU_zckkDASq0P5uJ2OnUfRVdK4C6Y",
    authDomain: "catering-reservation-73638.firebaseapp.com",
    projectId: "catering-reservation-73638",
    storageBucket: "catering-reservation-73638.appspot.com",
    messagingSenderId: "196868761894",
    appId: "1:196868761894:web:51932f98cc5e01cd49b9e7",
    measurementId: "G-1ZG7JKG5ML"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
export { auth, db };