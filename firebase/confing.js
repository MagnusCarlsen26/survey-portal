import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import  { getFunctions } from 'firebase/functions';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  "projectId": process.env.projectId,
  "appId": process.env.appId,
  "storageBucket": process.env.storageBucket,
  "apiKey": process.env.apiKey,
  "authDomain": process.env.authDomain,
  "messagingSenderId": process.env.messagingSenderId
}

console.log(firebaseConfig)
// export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// export const auth = getAuth(app)
// export const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app)
const functions = getFunctions(app);
const storage = getStorage(app);

export { auth, GoogleAuthProvider, signInWithPopup, db,functions, storage };