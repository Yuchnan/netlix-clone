// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_2OyjaEEoG64Sf7HYhyXE7rJECUdlGE8",
    authDomain: "netflix-clone-eadc4.firebaseapp.com",
    projectId: "netflix-clone-eadc4",
    storageBucket: "netflix-clone-eadc4.firebasestorage.app",
    messagingSenderId: "786514268095",
    appId: "1:786514268095:web:bc9222d3d23d8248325b0a",
    measurementId: "G-YKB0KX5CS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);