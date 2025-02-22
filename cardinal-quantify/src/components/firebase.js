// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbGytIFFKrYa_f1Ci04zeck7UEctO7ucQ",
  authDomain: "cardinal-quantify.firebaseapp.com",
  projectId: "cardinal-quantify",
  storageBucket: "cardinal-quantify.firebasestorage.app",
  messagingSenderId: "631378685314",
  appId: "1:631378685314:web:ea73d7cd5c1b5c18cdf39b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db = getFirestore(app);
export default app;