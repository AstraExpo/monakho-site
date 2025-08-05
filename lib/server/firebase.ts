import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSCQ5wbv0_y3wNiUV4nuVtJ5IklZ9ghpc",
  authDomain: "monakho-ministry.firebaseapp.com",
  projectId: "monakho-ministry",
  storageBucket: "monakho-ministry.appspot.com",
  messagingSenderId: "643564488003",
  appId: "1:643564488003:web:47f7610cc4027f0c14dbf6",
  measurementId: "G-JC7SNWJNTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;