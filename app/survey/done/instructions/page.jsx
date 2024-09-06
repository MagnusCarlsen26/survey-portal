"use client"

import { useRouter, useSearchParams } from "next/navigation"

const Instructions = () =>{

    const router = useRouter()

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{backgroundImage : 'url("https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80")'}}>
            <div className="flex flex-col items-center justify-between min-h-screen p-16">
                <h1 className="text-6xl">Instructions for Post survey</h1>
                <div>
                    <p>1. Instruction One</p>
                    <p>2. Instruction Two</p>
                    <p>3. Instruction Three</p>
                </div>
                <button 
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    onClick={() => router.push('/survey/done/1')}
                >
                    <span className="relative px-24 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Start Survey</span>
                </button>
            </div>
        </div>
    )
}

export default Instructions