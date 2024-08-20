import {onRequest} from "firebase-functions/v2/https";
import functions from 'firebase-functions'
import admin from 'firebase-admin'
import {
    beforeUserCreated,
    beforeUserSignedIn,
} from "firebase-functions/v2/identity";
  
admin.initializeApp();
const db = admin.firestore();

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
 
  console.log(`New user signed up with email: ${email} and UID: ${uuid}`);
  let docRef = db.collection('users').doc(user.uid);
  await docRef.set({
    email,
    uuid,
    name,
    cat: admin.firestore.FieldValue.serverTimestamp(),
    surveyStatus : false,
    isAccess : false
  });
  return 0
});

export const beforesignedin = beforeUserSignedIn((event) => {
    const user = event.data;
 
    if (!user?.email?.includes('@iitj.ac.in')) {
      throw new functions.https.HttpsError('Please signin with IITJ email', "Unauthorized email");
    }
});

export const isAccess = onRequest(async(req,res) => {
  const uuid = req.query.uuid
  try {
    const docRef = db.collection('users').doc(uuid);
    const docSnap = await docRef.get();
    res.send(docSnap.data())
    // if (docSnap.exists) {
    //   res.status(200).send("Document data:", docSnap.data());
    // } else {
    //   res.status(404).send("No such document!");
    // }
  } catch (error) {
    res.status(500).send(error,uuid)
  }
}) 

export const helloWorld = onRequest((req, res) => {

    res.send("Hello from Firebase!");
});
