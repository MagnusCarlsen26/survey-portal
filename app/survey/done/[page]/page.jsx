/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '@/components/Navbar'
import { RadioButton, InputField, CheckboxGroup} from '@/components/inputComponents'
import routeNextDonePage from '@/components/utils/routeNextDonePage'
import userServerCall from '@/components/utils/userServerCall'
import { useRouter } from 'next/navigation';
import questions from '@/components/configs/questions.json'
import Spinner from '@/components/svg/Spinner'

const SurveyForm = ({ params }) => {

    const page = params.page
    const [userResponse, setUserResponse] = useState({})
    const [uuid,setUuid] = useState()
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    useEffect( () => {
        setUuid(localStorage.getItem('userUuid'))
    } ,[])
    
    const onSubmit = async() => {
        setLoading(true)
        try {
            const result = await userServerCall( 'done',{ 
                page,
                form : userResponse,
            },false)

            routeNextDonePage(result,page,router)
        } catch(error) {
            console.error(error)
            // TODO : Handle error
        }
        setLoading(false)
    }
        
    return (
        <div
            className="h-screen w-full items-center justify-center bg-cover bg-no-repeat"
            style={{backgroundImage : 'url(/1.jpg)'}}
        >
            <Navbar heading={"Post Experiment Survey"} />

            <div className="min-h-screen flex items-center justify-center">
                <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
                    {
                        questions[page].questions.map( (question,index) => {
                            if ( question.inputType === "InputField" ) {
                                return (<InputField
                                    key = {index}
                                    text = {question.text}
                                    type = {question.type}
                                    onChange={ (val) => setUserResponse( prev => ({
                                        ...prev,
                                        [question.attribute] : val
                                    }))} 
                                />)
                            } else if (question.inputType === "RadioButton") {
                                return (<RadioButton 
                                    key = {index}
                                    heading = {question.heading}
                                    options = {question.options}
                                    onChange = { (val) => setUserResponse( prev => ({
                                        ...prev,
                                        [question.attribute] : val
                                    }))}
                                />)
                            } else if (question.inputType === "CheckBoxGroup") {
                                return (<CheckboxGroup 
                                    key = {index}
                                    heading = { question.heading }
                                    options = { question.options }
                                    onChange = { ( option,isChecked ) => setUserResponse( prev => ({
                                        ...prev,
                                        [option] : isChecked
                                    })) }
                                />)
                            }

                        })
                    }
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                        onClick={onSubmit}
                    >
                        <p  className='flex justify-center'>Next &nbsp;
                        {loading && <Spinner />}</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SurveyForm;
