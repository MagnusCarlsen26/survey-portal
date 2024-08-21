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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={signInWithGoogle}>
                Sign Up with Google
            </button>
            <p className="mt-2 text-red-500">{err}</p>
        </div>
    );
    
};

export default Auth;
