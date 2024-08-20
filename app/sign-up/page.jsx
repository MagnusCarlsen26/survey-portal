"use client"

import { auth, GoogleAuthProvider, signInWithPopup } from '@/firebase/confing';
import React , { useState } from 'react'
const Auth = () => {

    const [err,setErr] = useState("")

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;
            console.log('User info:', user);
        } catch (error) {
            setErr("Please use an IITJ Email.")
        }
    };

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign Up with google</button>
            <p>{err}</p>
        </div>
    );
};

export default Auth;
