// ✅ src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCykFj2dLjGCHYDuoCNYdXrn0oWlneexZA",
  authDomain: "ck-home-care.firebaseapp.com",
  projectId: "ck-home-care",
  storageBucket: "ck-home-care.appspot.com",
  messagingSenderId: "586605890705",
  appId: "1:586605890705:web:4f0b6056c9492e6935c330"
};

const app = initializeApp(firebaseConfig); // ✅ ต้องมาก่อน
const db = getFirestore(app);             // ✅ ต่อด้วย Firestore
const storage = getStorage(app);          // ✅ ต่อด้วย Storage

export { db, storage };                   // ✅ ส่งออกไปใช้
