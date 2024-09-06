"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { db,functions } from '@/firebase/confing'
import { useRouter } from 'next/navigation';

function RadioButton({ heading, options, onChange }) {

    return (
        <>
            <p>{heading}</p>
            {
                options.map( option => (

                    <div className="flex gap-10">
                        <div className="inline-flex items-center">
                            <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={option} data-ripple-dark="true">
                                <input 
                                    name={heading}
                                    type="radio"
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                    id={option} 
                                    value={option}
                                    onChange={() => onChange(option)}
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
                ) )
            }
        </>
    )   
}

function InputField({text, onChange, type}) {
    return (
        <div className="w-full max-w-sm min-w-[200px] mt-4">
            <label className="block mb-1 text-sm text-black font-bold">
                {text}
            </label>
            <input
                type={type}
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md border-black border-2"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

const SurveyForm = () => {

    const router = useRouter()
    const [userResponse, setUserResponse] = useState({
        gender : "",
        age : "",
        familarity : "",
        isFamilyDoctor : ""
    })
    const [uuid,setUuid] = useState()
    const [lockedChoice,setLockedChoice] = useState(false)
    useEffect( () => {
        setUuid(localStorage.getItem('userUuid'))
    } ,[])

    const onSubmit = async() => {
        await httpsCallable(functions, 'isAccess')({
            uuid,
            option : 'done',
            payload : { 
                uuid,
                page : "1",
                form : userResponse
            }
        });

        router.push('/survey/done/2')
    }

    const showConfirmation = () => {
        const userResponse = confirm("Confirm your choice");
        
        if (userResponse) {
            if (lockedChoice) {
                alert("You have already selected a choice, please proceed to next question.")
            } else {
                setLockedChoice(true)
                onSubmit()
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
                {/* <form> */}
                    <RadioButton 
                        heading={'Gender'}
                        options={ ['male','female','prefer not to say','other'] }
                        onChange={(gender) => setUserResponse( prev => ({
                                ...prev,
                                gender,
                            }))
                        }
                    />

                    <InputField
                        text={"Age (in nearest years) *"} 
                        onChange={(age) => setUserResponse( prev => ({
                                ...prev,
                                age : age
                            }) 
                        )}
                        type={"number"}
                    />
                    
                    <RadioButton 
                        heading={"Rate your familiarity with digital health platforms. *"}
                        options={[
                            "1 (Never used one before.)",
                            "2","3","4",
                            "5 (Very familiar. Use frequently for yourself or your family.)"
                        ]}
                        onChange={(familarity) => setUserResponse( prev => ({
                            ...prev,
                            familarity,
                        }))
                    }
                    />

                    <RadioButton 
                        heading={"Do you have any doctors in the family *"}
                        options={["Yes","No"]}
                        onChange={(isFamilyDoctor) => setUserResponse( prev => ({
                                ...prev,
                                isFamilyDoctor,
                        }))}
                    />

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                        onClick={showConfirmation}
                    >
                        Next
                    </button>
                {/* </form> */}
            </div>
        </div>
    );
};

export default SurveyForm;
