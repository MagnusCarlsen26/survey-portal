"use client"

import { db,functions } from '@/firebase/confing'
import { httpsCallable } from 'firebase/functions';
const { useState, useEffect } = require("react")

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

const SurveyForm = () => {

    const [userResponse, setUserResponse] = useState({
        lastTimeWhichDoctor : "",
        doMaleDoctorPrefer : "",
        doMaleDoctorMoreSkilled : "",
        doMaleDoctorMoreExperienced : ""
    })

    const [uuid,setUuid] = useState()

    useEffect( () => {
        setUuid(localStorage.getItem('userUuid'))
    } ,[])

    const onSubmit = async() => {
        await httpsCallable(functions, 'isAccess')({
            uuid,
            option : 'done',
            payload : { 
                uuid,
                page : 3,
                form : userResponse
            }
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-center">Belief</h1>
                {/* <form> */}
                    <RadioButton
                        heading={"Think of the last time you had to see a doctor. Was it a male or female doctor?"} 
                        options={["Male Doctor","Female Doctor","Not seen a doctor ever"]}
                        onChange={(lastTimeWhichDoctor) => setUserResponse( prev => ({
                            ...prev,    ...prev,
                            lastTimeWhichDoctor

                        }) )}
                    />
                    <RadioButton
                        heading={"Do you think that people in general prefer male doctors over female doctors?*"} 
                        options={["Yes","No"]}
                        onChange={(doMaleDoctorPrefer) => setUserResponse( prev => ({
                            ...prev,
                            doMaleDoctorPrefer
                        }) )}
                    />
                    <RadioButton
                        heading={"Do you think that people in general feel male doctors are more skilled than female doctors?"} 
                        options={["Yes","No"]}
                        onChange={(doMaleDoctorMoreSkilled) => setUserResponse( prev => ({
                            ...prev,
                            doMaleDoctorMoreSkilled
                        }) )}
                    />
                    <RadioButton
                        heading={"Do you think that people in general feel male doctors are more experienced than female doctors?"} 
                        options={["Yes","No"]}
                        onChange={(doMaleDoctorMoreExperienced) => setUserResponse( prev => ({
                            ...prev,
                            doMaleDoctorMoreExperienced
                        }) )}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                {/* </form> */}
            </div>
        </div>
    )
}

export default SurveyForm