"use client"

import { useRouter } from "next/navigation"

const Instructions = () =>{
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            Instructions
            <button onClick={() => router.push('/survey/1')} >Start Survey</button>
        </div>
    )
}

export default Instructions