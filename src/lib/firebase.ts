// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtJF_kPfHSOdzv8o0rnzT6MHB7X49LZgU",
    authDomain: "my-visionary.firebaseapp.com",
    projectId: "my-visionary",
    storageBucket: "my-visionary.firebasestorage.app",
    messagingSenderId: "135360692874",
    appId: "1:135360692874:web:6faf98aa9a2d23e90a6373",
    measurementId: "G-8EPMKLGY9B"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Analytics is only supported in browser environments
const analytics = typeof window !== 'undefined' ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export { app, auth, analytics };
