/* eslint-disable @next/next/no-img-element */
"use client"

import { auth, GoogleAuthProvider, signInWithPopup } from '@/confing';
import { useRouter } from 'next/navigation';
import React , { useState } from 'react'
import Google from '@/components/svg/Google'

const LoginButton = ({onClick}) => {
    return (
        <button
            aria-label="Sign in with Google"
            className="flex bg-white items-center gap-3 bg-google-button-dark rounded-full p-0.5 pr-4 transition-colors duration-300 hover:bg-google-button-dark-hover"
            onClick={onClick}
        >
            <div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
                <Google />
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
            router.push('/survey/instructions')
        } catch (error) {
            setErr(`Please use an ${process.env.NEXT_PUBLIC_EMAIL_DOMAIN} Email.`)
        }
    };

    console.log(process.env.NEXT_PUBLIC_EMAIL_DOMAIN,'ff')

    return (
        <div 
            className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat"
            style={{backgroundImage : 'url(/1.png)'}}
        >
            <div 
                className="rounded-xl bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8"
                style={{backgroundColor : "#ffffff20"}}
            >

                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <img src={process.env.NEXT_PUBLIC_LOGO} width="150" alt="" />
                        {/* ! Example */}
                        <h1 className="mb-2 text-2xl text-black">{process.env.NEXT_PUBLIC_TITLE}</h1>
                    </div>
                    <LoginButton 
                        onClick={signInWithGoogle}
                    />
                    <br></br>
                    <div className='text-center bg-red-600 rounded-xl'>{err}</div>
                </div>
            </div>
        </div>
    );
    
};

export default Auth;
