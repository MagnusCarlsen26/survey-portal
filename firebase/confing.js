import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import  { getFunctions } from 'firebase/functions';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBowmiDJ9xRrZvKeU8MhMTOQ8w7dSTZ6ZI",
    authDomain: "khushal-test3-123.firebaseapp.com",
    projectId: "khushal-test3-123",
    storageBucket: "khushal-test3-123.appspot.com",
    messagingSenderId: "866179934772",
    appId: "1:866179934772:web:80605323d0c273bc7bf861"
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