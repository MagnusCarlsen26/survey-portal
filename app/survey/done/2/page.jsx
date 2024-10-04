/* eslint-disable @next/next/no-img-element */
"use client"

import { db,functions } from '@/firebase/confing'
import { httpsCallable } from 'firebase/functions';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react"

function CheckboxGroup({ heading, options, onChange }) {

    return (
        <>
            <p className='font-bold'>{heading}</p>
            {
                options.map(option => (
                    <div key={option} className="flex gap-10">
                        <div className="inline-flex items-center">
                            <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={option} data-ripple-dark="true">
                                <input 
                                    name={heading}
                                    type="checkbox"
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-black text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                    id={option} 
                                    value={option}
                                    onChange={(e) => onChange(option, e.target.checked)}
                                />
                                <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                    </svg>
                                </span>
                            </label>
                            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor={option}>
                                {option}
                            </label>
                        </div>
                    </div>
                ))
            }
        </>
    )
}



const Survey = () => {

    const router = useRouter()
    const [ checked, setChecked ] = useState({
        "Father" : false,
        "Mother" : false,
        "Brother" : false,
        "Sister" : false,
        "Other member male" : false,
        "Other member female": false
    })
    const [uuid,setUuid] = useState()
    const [loading,setLoading] = useState(false)
    const [userName,setUserName] = useState("")
    useEffect( () => {
        setUuid(localStorage.getItem('userUuid'))
        console.log
        const doo = async() => {
            try {
                const response = await httpsCallable(functions, 'isAccess')({
                    uuid : localStorage.getItem('userUuid'),
                    option : 'getUserName',
                    payload : {
                        uuid : localStorage.getItem('userUuid'),
                    }
                })
                setUserName(response.data)
            } catch(error) {
                alert("You might not be logged in or you might not have survey access. Login here - localhost:3000/login")
                console.error(error)
            }
        }
        doo()
    } ,[])

    const onSubmit = async() => {
        try {

            setLoading(true)
            const result = await httpsCallable(functions, 'isAccess')({
                uuid,
                option : 'done',
                payload : { 
                uuid,
                page : "2",
                form : checked
            }
            });
            if (result.data === "You have already attempted the question.") {
                alert("Your current response won't be considered as you have already attempted the question.")
                router.push('/survey/done/3')
            }
            else if ( result.data === "Please answer all the post survey questions." ) {
                alert("Please answer all the previous questions.")
                router.push('/survey/done/1')
            }else if ( result.data === "All questions are compulsory. Please attempt all the questions." ) {
                alert("All questions are compulsory. Please attempt all the questions.")
            } else if ( result.data === "done" ) {                
                router.push('/survey/done/3')
            }
        } catch(error) {

        }

        setLoading(false)
    }


    return (
        <>
            <nav class="bg-white border-gray-200 dark:bg-gray-900 relative">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MySwasthya</span>
                    </a>
                    
                    <p class="text-blue-300 text-center absolute inset-0 flex justify-center items-center">
                        Post Experiment Survey
                    </p>
                
                    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <p className='text-white'>{userName}</p>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen flex items-center justify-center">
                <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-center">Doctors in the family</h1>
                    <CheckboxGroup 
                        heading={"If yes, what is the relationship with this family member? *"}
                        options={[
                            "Father",
                            "Mother",
                            "Brother",
                            "Sister",
                            "Other member male",
                            "Other member female"
                        ]}
                        onChange={ (option,isChecked) => setChecked( prev => ({
                            ...prev,
                            [option] : isChecked
                        }) ) }
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                        onClick={onSubmit}
                    >
                            <p  className='flex justify-center'>Next &nbsp;
                            {loading &&
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                    <g transform="rotate(0 50 50)"><circle cx="50" cy="50" r="40" stroke="#fff" stroke-width="8" fill="none"><animate attributeName="stroke-dasharray" values="0, 200; 100, 200; 200, 200" dur="1.5s" repeatCount="indefinite"/><animate attributeName="stroke-dashoffset" values="0; -40; -100" dur="1.5s" repeatCount="indefinite" /></circle></g>
                                </svg> 
                            }</p>
                    </button>
                </div>
            </div>
        </>

    )
}

export default Survey