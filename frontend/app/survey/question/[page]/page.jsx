/* eslint-disable @next/next/no-img-element */
"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar'
import Spinner from '@/components/svg/Spinner'
import Arrow from '@/components/svg/Arrow'
import userServerCall from '@/components/utils/userServerCall'
import DisableSS from '../../../DisableSS';

let page

const DoctorCard = ({ doctor, lockedChoice, setLockedChoice }) => {

    const showConfirmation = () => {
        let userResponse = confirm(`Confirm your choice : ${doctor[process.env.NEXT_PUBLIC_PARAM_NAME_0]}`);
        
        if (userResponse) {
            if (lockedChoice) {
                let userResponse = confirm(`Do you want to change your choice to : ${doctor[process.env.NEXT_PUBLIC_PARAM_NAME_0]}`)
                if (userResponse) {
                    setLockedChoice({ responseId : doctor.id, name : doctor[process.env.NEXT_PUBLIC_PARAM_NAME_0]})
                }
            } else {
                setLockedChoice({ responseId : doctor.id, name : doctor[process.env.NEXT_PUBLIC_PARAM_NAME_0]})
            }
        }
    }

    return (
        <div className="card border border-gray-200 p-4 rounded-lg shadow-md" >

            { process.env.NEXT_PUBLIC_IS_IMAGE === 'true' && <div className="image-container">
                <img className="image" src={doctor.pfp} alt={doctor[process.env.NEXT_PUBLIC_PARAM_NAME_0]} width="120" height="120" loading="lazy" />
            </div> }
            <div className="info-container">
                <h3>{doctor[process.env.NEXT_PUBLIC_PARAM_NAME_0]}</h3>
                { process.env.NEXT_PUBLIC_PARAM_NAME_1 !== 'false' && <span className="biggerSpan">{process.env.NEXT_PUBLIC_PARAM_1} : {doctor[process.env.NEXT_PUBLIC_PARAM_NAME_1]} <br /></span>}
                { process.env.NEXT_PUBLIC_PARAM_NAME_2 !== 'false' && <span>{process.env.NEXT_PUBLIC_PARAM_2} : {doctor[process.env.NEXT_PUBLIC_PARAM_NAME_2]} <br /></span>}
                { process.env.NEXT_PUBLIC_PARAM_NAME_3 !=='false' && <span> {process.env.NEXT_PUBLIC_PARAM_3} : {doctor[process.env.NEXT_PUBLIC_PARAM_NAME_3]} <br /></span>}
                {  process.env.NEXT_PUBLIC_PARAM_NAME_4 !== 'false' && <div className="rating-widget">
                    <div className="rating">{doctor[process.env.NEXT_PUBLIC_PARAM_NAME_4]} {process.env.NEXT_PUBLIC_PARAM_4}</div>
                </div> }
            </div>
            <div className="button-container">
                <button 
                    className="button-4"
                    onClick={showConfirmation}
                >
                    Choose
                </button>
            </div>
        </div>
    );
}

function routeToNextPage(router) {
    if (parseInt(page,10) === process.env.NEXT_PUBLIC_NO_OF_QUESTIONS) router.push('/survey/done/instructions')
    else router.push(`/survey/question/${parseInt(page,10) + 1}`)
}

function DoctorRow ({doctor1,doctor2,lockedChoice,setLockedChoice}) {
    return (
        <div className='flex'>
            <DoctorCard lockedChoice={lockedChoice} setLockedChoice={setLockedChoice} doctor={doctor1} />
            <DoctorCard lockedChoice={lockedChoice} setLockedChoice={setLockedChoice} doctor={doctor2} />
        </div>
    )
}

function RenderDoctors({doctors,lockedChoice,setLockedChoice}) {
    return doctors.map( (doctor,index) => {
        if (index >= process.env.NEXT_PUBLIC_NO_OF_CHOICES) return <></>
        if ( index%2 == 0 ) {
            if ( index + 1 < doctors.length && index + 1 < process.env.NEXT_PUBLIC_NO_OF_CHOICES) return <DoctorRow key={index} doctor1 = {doctors[index]} doctor2 = {doctors[index+1]} lockedChoice={lockedChoice} setLockedChoice={setLockedChoice}/>
            return <div className='flex' key={index}>
                    <DoctorCard lockedChoice={lockedChoice} setLockedChoice={setLockedChoice} doctor={doctor} />
                </div>
        } else return <></>
    })
}

const Survey = ({ params }) => {

    const noOfChoices = process.env.NEXT_PUBLIC_NO_OF_CHOICES

    const router = useRouter()
    const [doctors,setDoctors] = useState( Array.from({ length: noOfChoices }, () => [{}]))
    const [lockedChoice,setLockedChoice] = useState(false)
    const [loading,setLoading] = useState(true)
    const [time1,setTime1] = useState()
    const [isAccess,setIsAccess] = useState(false)

    page = params.page

    const submitResponse = async(responseId) => {
        try {
            console.log(Date.now() - time1)
            setLoading(true)

            const result = await userServerCall('response', { 
                qid : page,
                responseId,
                timeToAttempt : Date.now() - time1,
            },false)
            if (result.data === "You have already attempted the question.") {
                alert("Your current response won't be considered as you have already attempted the question.")
                routeToNextPage(router)
            } else if (result.data === "Please submit response for previous quesitons firsprocess.env.") {
                alert(result.data)
            } else if (result.data === "response") {
                routeToNextPage(router)
            }
        } catch (error) {
            console.error(error)
            // TODO : Do something about error
        }
        setLoading(false)
    } 

    useEffect( () => {
        const doo = async() => {
            try {

                const response = await userServerCall('getQuestion',{
                    page,
                },false)

                if (response.data === 'Please attempt previous questions firsprocess.env.') {
                    console.error('Please attempt previous questions firsprocess.env.')
                    alert("Please attempt previous questions firsprocess.env.")
                } else {
                    setDoctors(prev => response.data.doctors)
                    setTime1(Date.now())
                }

                const checkAccess = await userServerCall('checkAccess',{})
                if (checkAccess.data  === "No valid option selected") 
                    setIsAccess(true)
                
            } catch(error) {
                alert("You might not be logged in or you might not have survey access. Login here - https://survey-portal.vercel.app/login")
                console.error(error)
            }
            setLoading(false)

        }
        doo()
    } , [] )
    
    return (
        <div
            className="bg-fixed w-full min-h-screen bg-cover"
            style={{backgroundImage : 'url(/1.png)'}}
        >
            <Navbar heading={`Choice set ${page}`} />
            <DisableSS />

            <br></br>
            <div className="flex items-center justify-center px-12" style={{zIndex : "-1"}}>
                {
                    isAccess ? <div><RenderDoctors doctors={doctors} lockedChoice={lockedChoice} setLockedChoice={setLockedChoice}/></div> : 
                    ( loading ? "Loading..." : "You don't have access to the survey." )
                }
                
                {lockedChoice && 
                    <div className='flex items-center justify-center'>
                        <div>
                            <div className='bg-white rounded-r-md py-2 border-l px-3'>
                                <p>{lockedChoice?.name}</p>
                            </div>
                            <button 
                                type="button" 
                                className="bg-green-600 text-white disabled: rounded-r-md py-2 border-l border-gray-200 hover:bg-green-800 hover:text-white px-3"
                                onClick={() => submitResponse(lockedChoice.responseId)}
                                disabled = { loading }
                            >
                            <div className="flex flex-row align-middle">
                                <span className="mr-2 text-base">Next</span>
                                { loading ? <Spinner /> : <Arrow /> }

                            </div>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Survey;
           