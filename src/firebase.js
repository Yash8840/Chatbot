// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzWuO-AV0rZa1bLIzAUo12dfKIS1x6Sh0",
  authDomain: "wysa-f2df2.firebaseapp.com",
  projectId: "wysa-f2df2",
  storageBucket: "wysa-f2df2.appspot.com",
  messagingSenderId: "709424850088",
  appId: "1:709424850088:web:a273450cf32208775cce9d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();