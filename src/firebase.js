import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1Hy5JPGcQxTSESgOJp7ZWFiQaBtiUTxQ",
    authDomain: "chat-app-d62c7.firebaseapp.com",
    projectId: "chat-app-d62c7",
    storageBucket: "chat-app-d62c7.appspot.com",
    messagingSenderId: "1045813172338",
    appId: "1:1045813172338:web:55828b5e911efbb2c3caeb"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()