"use client"

import { auth, GoogleAuthProvider, signInWithPopup } from '@/firebase/confing';
import { signOut , onAuthStateChanged  } from 'firebase/auth';
import React , { useState } from 'react'
import { useRouter } from 'next/navigation' 

const Auth = () => {

    const [err,setErr] = useState("")
    const router = useRouter()

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;
            console.log('User info:', user.uid);
            localStorage.setItem("userUid",user.uid)
            router.push('/instructions')
        } catch (error) {
            console.log(error)
        }
    };

    const handleSignOut = async () => {
        try {

            await signOut(auth);
            localStorage.removeItem("userUid")
            console.log("signed out")
        } catch(error) {
            console.log(error)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button className="px-flex flex-col items-center justify-center min-h-screen4 py-2 bg-blue-500 text-white rounded" onClick={signInWithGoogle}>
                Sign Up with Google
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleSignOut}>
                    Sign Out
            </button>
            <p className="mt-2 text-red-500">{err}</p>
        </div>
    );
    
};

export default Auth;
