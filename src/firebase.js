// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_KDdHRKx4ub0puG1MQ921cPvkeXmoXYI",
  authDomain: "artha-viz.firebaseapp.com",
  projectId: "artha-viz",
  storageBucket: "artha-viz.firebasestorage.app",
  messagingSenderId: "165719322194",
  appId: "1:165719322194:web:d1cff64dc7456e0623b98b",
  measurementId: "G-225GH89NVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);