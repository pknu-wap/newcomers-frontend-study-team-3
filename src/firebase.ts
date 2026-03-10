// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtxXxv-52YzOuewoZ1knDbzGojEjl25XE",
  authDomain: "wap-twitter.firebaseapp.com",
  projectId: "wap-twitter",
  storageBucket: "wap-twitter.firebasestorage.app",
  messagingSenderId: "80545043288",
  appId: "1:80545043288:web:a5b3b4aaf77f471dd10b2d",
  measurementId: "G-3E7KHW9Y1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);