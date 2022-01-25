// firebaseSetup.js - src folder

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBCQz7F4t6v-jDqS8Xk5NVPkhluU15J5ew",

    authDomain: "binge-fest-c0da0.firebaseapp.com",

    projectId: "binge-fest-c0da0",

    storageBucket: "binge-fest-c0da0.appspot.com",

    messagingSenderId: "432347755804",

    appId: "1:432347755804:web:a1942cfe3bc9398f1336d9"

};


// Initialize Firebase

const bingeFest = initializeApp(firebaseConfig);

export default bingeFest;