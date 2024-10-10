const admin = require('firebase-admin');
const firebaseConfig = require('./firebase_config.json'); // Adjust the path as needed

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
});

async function enableGoogleAuth() {
    const provider = admin.auth.GoogleAuthProvider;
    const googleAuthProvider = new provider();

    try {
        await admin.auth().updateAuthProvider(googleAuthProvider);
        console.log('Google authentication enabled.');
    } catch (error) {
        console.error('Error enabling Google authentication:', error);
    }
}

enableGoogleAuth();
