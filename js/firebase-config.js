import { initializeApp } from "https://gstatic.com";
import { getFirestore } from "https://gstatic.com";
import { getAuth } from "https://gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyDB23_RXxyJtmrKP161fHNiW5AeSRcDyu0",
  authDomain: "://firebaseapp.com",
  projectId: "warissports-dbdf1",
  storageBucket: "warissports-dbdf1.firebasestorage.app",
  messagingSenderId: "641574298549",
  appId: "1:641574298549:web:b2153537ff4695148c6ffc",
  measurementId: "G-XV4Q8PVJRM"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };