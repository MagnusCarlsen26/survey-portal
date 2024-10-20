import functions from 'firebase-functions'
import {
        beforeUserCreated,
        beforeUserSignedIn,
} from "firebase-functions/v2/identity";
import { db } from './../config.js'
 
export const beforecreated = beforeUserCreated((event) => {
    const user = event.data;

    if (!user?.email?.includes('@iitj.ac.in')) {
        throw new functions.https.HttpsError('Please signup with IITJ email', "Unauthorized email");
    } 
});

export const onUserSignup = functions.auth.user().onCreate(async(user) => {
    const email = user.email;
    const uuid = user.uid;
    const name = user.displayName
 
    let docRef = db.collection('users').doc(user.uid);
    await docRef.set({
        email,
        uuid,
        name,
        cat: Date.now(),
        surveyStatus : false,
        isAccess : false,
        isDenyPhoto : false
    });
    return 0
});

export const beforesignedin = beforeUserSignedIn((event) => {
    const user = event.data;
 
    if (!user?.email?.includes('@iitj.ac.in')) {
      throw new functions.https.HttpsError('Please signin with IITJ email', "Unauthorized email");
    }
});