/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '@/components/Navbar'
import { RadioButton, InputField, CheckboxGroup} from '@/components/inputComponents'
// import routeNextDonePage from '@/components/utils/routeNextDonePage'
import userServerCall from '@/components/utils/userServerCall'
import { useRouter } from 'next/navigation';
import Spinner from '@/components/svg/Spinner'
import DisableSS from '../../../DisableSS';

function returnThankyou( currPage ) {
    if ( currPage == process.env.NEXT_PUBLIC_NO_OF_POST_SURVEY_QUESTIONS + 1 ) return 'thankyou'
    else return currPage + 1
}

const SurveyForm = ({ params }) => {

    const page = params.page
    const [userResponse, setUserResponse] = useState({})
    const [loading,setLoading] = useState(false)
    const router = useRouter()
    const [questions,setQuestions] = useState([])
    const [time1,setTime1] = useState()

    useEffect( () => {
        
        const doo = async() => {
            try {
                setLoading(true)
                const result = await userServerCall("getPostSurveyQuestions",{
                    page
                })
                if ( result.data === "Please answer all the post survey questions." ) {
                    alert("Please answer all the previous questions.")
                    router.push('/survey/done/1')
                } else if ( result.data === "Please answer all the survey questions." ) {
                    alert("Please answer all the previous questions.")
                    router.push('/survey/done/1')
                } else {
                    setQuestions( prev => result.data.question)
                    setTime1(Date.now())
                }
            } catch (error) {
                console.error(error)
                alert("You might not be logged in or you might not have survey access. Login here - https://survey-portal.vercel.app/login")
            }
            setLoading(false)
        } 

        doo()
    } ,[])
    
    const onSubmit = async() => {
        setLoading(true)
        try {
            const result = await userServerCall( 'done',{ 
                page,
                form : {
                    ...userResponse,
                    timeToAttempt : Date.now() - time1  
                },
            },false)

            const currPage = parseInt( page,10 )
    
            if (result.data === "You have already attempted the question.") {
                alert("Your current response won't be considered as you have already attempted the question.")
                router.push(`/survey/done/${returnThankyou( currPage )}`)
            } else if ( result.data === "Please answer all the post survey questions." ) {
                alert("Please answer all the previous questions.")
                router.push('/survey/done/1')
            } else if ( result.data === "Please answer all the survey questions." ) {
                alert("Please answer all the previous questions.")
                router.push('/survey/done/1')
            } else if ( result.data === "All questions are compulsory. Please attempt all the questions." ) {
                alert("All questions are compulsory. Please attempt all the questions.")
            } else if ( result.data === "done" ) {                
                router.push(`/survey/done/${returnThankyou( currPage )}`)
            }

        } catch(error) {
            console.error(error)
            alert("You might not be logged in or you might not have survey access. Login here - https://survey-portal.vercel.app/login")
        }
        setLoading(false)
    }
    return (
        <div
            className="bg-fixed w-full bg-cover"
            style={{backgroundImage : 'url(/1.png)'}}
        >
            <Navbar heading={"Post Experiment Survey"} />
            <DisableSS />
            <div className="min-h-screen flex items-center justify-center">
                <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
                    <p className='text-center text-blue-500 font-bold text-xl' >{questions?.heading}</p>
                    <br></br>
                    {
                        questions?.questions?.map( (question,index) => {
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
                    {
                        questions?.questions?.length ? 

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                                onClick={onSubmit}
                            >
                            <p  className='flex justify-center'>Next &nbsp;{loading && <Spinner />}</p>
                        </button> : <p className='text-center'>
                            {
                                loading ? "Loading..." : "You don't have access to the survey."
                            }
                        </p>
                    }
                </div>
            </div>
        </div>
    );
};

export default SurveyForm;
