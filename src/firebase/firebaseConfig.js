import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyCjX3qoJCXwXYXD_qOM7a6US_0O08a3RQg",
  authDomain: "blog-web-app-45228.firebaseapp.com",
  projectId: "blog-web-app-45228",
  storageBucket: "blog-web-app-45228.appspot.com",
  messagingSenderId: "599556931232",
  appId: "1:599556931232:web:4a7c771f4c217065b1d3c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);