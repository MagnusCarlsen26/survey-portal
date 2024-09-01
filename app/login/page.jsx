"use client"

import { auth, GoogleAuthProvider, signInWithPopup } from '@/firebase/confing';
import { useRouter } from 'next/navigation';
import React , { useState } from 'react'

const LoginButton = ({onClick}) => {
    return (
        <button
        aria-label="Sign in with Google"
        className="flex bg-white items-center gap-3 bg-google-button-dark rounded-full p-0.5 pr-4 transition-colors duration-300 hover:bg-google-button-dark-hover"
        onClick={onClick}
        >
            <div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <title>Sign in with Google</title>
                <desc>Google G Logo</desc>
                <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="fill-google-logo-blue"
                ></path>
                <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="fill-google-logo-green"
                ></path>
                <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    className="fill-google-logo-yellow"
                ></path>
                <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="fill-google-logo-red"
                ></path>
                </svg>
            </div>
            <span className="text-sm text-black tracking-wider">Sign in with Google</span>
        </button>
    )
}

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
            localStorage.setItem("userUuid",user.uid)
            console.log('User info:', user.uid);
            router.push('/survey/instructions')
        } catch (error) {
            setErr("Please use an IITJ Email.")
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{backgroundImage : 'url("https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80")'}}>
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <img src="https://erp.iitj.ac.in/favicon.ico" width="150" alt="" srcset="" />
                        {/* ! Example */}
                        <h1 className="mb-2 text-2xl text-white">IITJ Survey</h1>
                    </div>
                    <LoginButton 
                        onClick={signInWithGoogle}
                    />
                </div>
            </div>
        </div>
    );
    
};

export default Auth;
