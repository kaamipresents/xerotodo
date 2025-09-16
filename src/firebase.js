// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjQci43mAtlk681NG2TY1l4-JKcZvKLM8",
  authDomain: "xerotodo-3f303.firebaseapp.com",
  projectId: "xerotodo-3f303",
  storageBucket: "xerotodo-3f303.firebasestorage.app",
  messagingSenderId: "306911664914",
  appId: "1:306911664914:web:3781b6e1d177869741b1cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ export auth instance
export const db = getFirestore(app); // ✅ Firestore instance