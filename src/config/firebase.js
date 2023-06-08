// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBDPv76-6lRxkNmquQj6RNhNNyjEwvrQK0",
  authDomain: "helex-b55e4.firebaseapp.com",
  projectId: "helex-b55e4",
  storageBucket: "helex-b55e4.appspot.com",
  messagingSenderId: "518739834700",
  appId: "1:518739834700:web:ccaf3cbac49809a0b841e9",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
