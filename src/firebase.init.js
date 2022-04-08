// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7_LKcYf8u0YkdSWWgBJRu7PW4COUMIfU",
  authDomain: "simple-firebase-practice-bbdb5.firebaseapp.com",
  projectId: "simple-firebase-practice-bbdb5",
  storageBucket: "simple-firebase-practice-bbdb5.appspot.com",
  messagingSenderId: "52849649450",
  appId: "1:52849649450:web:4c8e3c744013d22e106053"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;