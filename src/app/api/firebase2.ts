import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDriSVG1tQ0pe82j7zVElcN5UCxtvlWQH8",
  authDomain: "comments-app-46098.firebaseapp.com",
  databaseURL: "https://comments-app-46098-default-rtdb.firebaseio.com",
  projectId: "comments-app-46098",
  storageBucket: "comments-app-46098.appspot.com",
  messagingSenderId: "1051131925936",
  appId: "1:1051131925936:web:1128881cb506ff841a3275",
  measurementId: "G-VBYSE3F3W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, analytics, auth}