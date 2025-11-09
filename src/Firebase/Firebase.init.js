// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzuqQB4W25pY0Ka2rFuSR_WFXaAdGqezc",
  authDomain: "book-haven-app.firebaseapp.com",
  projectId: "book-haven-app",
  storageBucket: "book-haven-app.firebasestorage.app",
  messagingSenderId: "1010763351774",
  appId: "1:1010763351774:web:84de04f29b315dcb4b244f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);