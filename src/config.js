// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_cDBmLRnx_tZ7P0lXe0xAWc76TD7E32U",
  authDomain: "react-chess-656bf.firebaseapp.com",
  projectId: "react-chess-656bf",
  storageBucket: "react-chess-656bf.appspot.com",
  messagingSenderId: "1069182025153",
  appId: "1:1069182025153:web:b1d32e7ccd0f899e550340",
  measurementId: "G-72R7R6NP2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
