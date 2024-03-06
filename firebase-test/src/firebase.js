// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9F3u_JhrINw6c49F67RYngmPbZGr2f3U",
    authDomain: "quiztest-3dfe6.firebaseapp.com",
    projectId: "quiztest-3dfe6",
    storageBucket: "quiztest-3dfe6.appspot.com",
    messagingSenderId: "1039654530008",
    appId: "1:1039654530008:web:f33f716fb0bc2e2f50e0ad",
    measurementId: "G-RCSQSMFB9W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
