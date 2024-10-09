"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import userServerCall from '@/components/utils/userServerCall'

const Instructions = () =>{

    const router = useRouter()
    const [instructions, setInstructions] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect( () => {
        const doo = async() => {
            try {
                const result = await userServerCall('getInstructions',{
                    level : "survey"
                })

                if ( result.data === "You don't have access to survey" ) {
                    alert("you don't have access to survey")
                } else setInstructions(prev => result.data.instructions)

            } catch(error) {
                console.error(error)
                alert("You might not be logged in or you might not have survey access. Login here - https://survey-portal.vercel.app/login")
            }
            setLoading(false)
        }
        doo()
    } , [])

    return (
        <div 
            className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat" 
            style={{backgroundImage : 'url(/1.jpg)'}}
        >
            <div className="flex flex-col items-center justify-between min-h-screen p-16">
                <h1 className="text-4xl instructions-card">Instructions</h1>
                <div className="instructions-card">
                    {
                        console.log(instructions)
                    }
                    {
                        instructions.map( (instruction,index) => (
                            <>
                                <p key={index}>{index+1}. {instruction}</p>
                                <br/>
                            </>
                        ))
                    }
                </div>
                {
                    loading ? <p>Loading...</p> :
                    <button 
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                        onClick={() => router.push('/survey/question/1')}
                        >
                        <span className="relative px-24 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Start Survey</span>
                    </button>
                }
            </div>
        </div>
    )
}

export default Instructions