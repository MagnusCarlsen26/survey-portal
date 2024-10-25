import admin from 'firebase-admin'

admin.initializeApp({
    storageBucket: "survey-portal-3b2b0.appspot.com",
});

export const db = admin.firestore();
export const bucket = admin.storage().bucket();