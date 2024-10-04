import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import  { getFunctions } from 'firebase/functions';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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

// export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// export const auth = getAuth(app)
// export const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app)
const functions = getFunctions(app);
const storage = getStorage(app);

export { auth, GoogleAuthProvider, signInWithPopup, db,functions, storage };