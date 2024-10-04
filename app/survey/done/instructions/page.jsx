"use client"

import { useRouter, useSearchParams } from "next/navigation"

const Instructions = () =>{

    const router = useRouter()

    return (
        <div
            className="bg-fixed w-full h-full bg-cover"
            style={{backgroundImage : 'url(/1.jpg)'}}
        >
            <div className="flex flex-col items-center justify-between min-h-screen p-16">
                <div className="instructions-card"><h1 className="text-4xl">Instructions for Post survey</h1></div>
                <div className="instructions-card">
                <p>
                        1. Check the exam timetable carefully. Make sure you know the time and locations
                    of your exams. Check whether you should go directly to an exam hall or a waiting
                    room.
                    </p>
                    <br></br>
                    <p>
                        2. Bring your Student ID Card. You will not be allowed into the exam hall without
                    these.
                    </p>
                    <br></br>
                    <p>
                        3. Do not bring any unauthorised material (e.g. written notes, notes in dictionaries,
                    paper, and sticky tape eraser). Pencil cases and glasses cases must not be taken to
                    your desks. These will be checked and confiscated.
                    </p>
                    <br></br>
                    <p>
                        4. You are allowed to bring tissues and a drink (but not food) into the exam.

                    </p>
                    <br></br>   
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