// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASs1QYUOCfAzb6MBr3DhX0zrSMtTQtN44",
  authDomain: "binge-fest.firebaseapp.com",
  projectId: "binge-fest",
  storageBucket: "binge-fest.appspot.com",
  messagingSenderId: "562103674808",
  appId: "1:562103674808:web:008ccd1c9ad4f80aa6514d"
};

// Initialize Firebase
const bingeFestApp = initializeApp(firebaseConfig);

export default bingeFestApp;