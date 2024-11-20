// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYHAt8dUjjyHR6lLWNa_g7gdgNDCDFhUM",
  authDomain: "email-password-auth-23c09.firebaseapp.com",
  projectId: "email-password-auth-23c09",
  storageBucket: "email-password-auth-23c09.firebasestorage.app",
  messagingSenderId: "24601788637",
  appId: "1:24601788637:web:05d322c89c8383bc681b34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth}