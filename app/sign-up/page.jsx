"use client"

import { auth, GoogleAuthProvider, signInWithPopup } from '@/firebase/confing';

const Auth = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log('User info:', user);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in  Google</button>
    </div>
  );
};

export default Auth;
