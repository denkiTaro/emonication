// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZj64_b-bzqeEvG23IIdePiH-Iw9P6u2w",
    authDomain: "emonication-i.firebaseapp.com",
    projectId: "emonication-i",
    storageBucket: "emonication-i.appspot.com",
    messagingSenderId: "849174526021",
    appId: "1:849174526021:web:9a9b30221c0eea4f088b2c",
    measurementId: "G-H5QK5M2LMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);