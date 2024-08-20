import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCZH3kOaXi69bj6vrXNQrns-K-Ny4PJDxY",
    authDomain: "survey-portal-3b2b0.firebaseapp.com",
    projectId: "survey-portal-3b2b0",
    storageBucket: "survey-portal-3b2b0.appspot.com",
    messagingSenderId: "387894139016",
    appId: "1:387894139016:web:3d81e572615e553aa8e73d",
    measurementId: "G-DXDEK1FKYV",
    databaseURL: "https://survey-portal-3b2b0-default-rtdb.asia-southeast1.firebasedatabase.app"
};
console.log(firebaseConfig)

// export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// export const auth = getAuth(app)
// export const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup };