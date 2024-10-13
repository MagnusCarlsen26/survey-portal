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
        let userResponse = confirm(`Confirm your choice : ${doctor.name}`);
        
        if (userResponse) {
            if (lockedChoice) {
                let userResponse = confirm(`Do you want to change your choice to : ${doctor.name}`)
                if (userResponse) {
                    setLockedChoice({ responseId : doctor.id, doctorName : doctor.name})
                }
            } else {
                setLockedChoice({ responseId : doctor.id, doctorName : doctor.name})
            }
        }
    }
          
    return (
        <div className="card border border-gray-200 p-4 rounded-lg shadow-md" >
            <div className="image-container">
                <img className="image" src={doctor.pfp} alt={doctor.name} width="120" height="120" loading="lazy" />
            </div>
            <div className="info-container">
                <h3>{doctor.name}</h3>
                <span className="biggerSpan">{doctor.specialty}</span><br />
                <span>{doctor.experience} years of experience</span><br />
                <span> ₹{doctor.consultationFees} Consultation fees</span><br />
                <div className="rating-widget">
                    <div className="rating">{doctor.rating}⭐</div>
                </div>
            </div>
            <div className="button-container">
                <button 
                    className="button-4"
                    onClick={showConfirmation}
                >
                    Book a visit now
                </button>
            </div>
        </div>
    );
}

function routeToNextPage(router) {
    if (parseInt(page,10) === 12) router.push('/survey/done/instructions')
    else router.push(`/survey/question/${parseInt(page,10) + 1}`)
}

const Survey = ({ params }) => {

    const router = useRouter()

    const [doctors,setDoctors] = useState( Array.from({ length: 6 }, () => 
        [{
        name: '',
        specialty: '',
        experience: '',
        consultationFees: '',
        distance: '',
        rating: '',
        ratingsCount: '',
        image: ''
    }]))
    const [lockedChoice,setLockedChoice] = useState(false)
    const [loading,setLoading] = useState(true)
    const [time1,setTime1] = useState()
    const [isAccess,setIsAccess] = useState(false)
    // const [noAccess, setNoACess] = 
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
            } else if (result.data === "Please submit response for previous quesitons first.") {
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

                if (response.data === 'Please attempt previous questions first.') {
                    console.error('Please attempt previous questions first.')
                    alert("Please attempt previous questions first.")
                } else {
                    setDoctors(prev => response.data.doctors)
                    console.log("first")
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
                    isAccess ?                 <div>
                    <div className="flex">
                        <DoctorCard lockedChoice={lockedChoice} setLockedChoice={setLockedChoice} doctor={doctors[0]} />
                        <DoctorCard lockedChoice={lockedChoice} setLockedChoice={setLockedChoice} doctor={doctors[1]} />
                    </div>
                    <div className="flex">
                        <DoctorCard lockedChoice={lockedChoice} setLockedChoice={setLockedChoice} doctor={doctors[2]} />
                        <DoctorCard lockedChoice={lockedChoice} setLockedChoice={setLockedChoice} doctor={doctors[3]} />
                    </div>
                    <div className="flex">
                        <DoctorCard lockedChoice={lockedChoice} setLockedChoice={setLockedChoice} doctor={doctors[4]} />
                        <DoctorCard lockedChoice={lockedChoice} setLockedChoice={setLockedChoice} doctor={doctors[5]} />
                    </div>
                </div> : ( loading ? "Loading..." : "You don't have access to the survey." )
                }

                
                {lockedChoice && 
                    <div className='flex items-center justify-center'>
                        <div>
                            <div className='bg-white rounded-r-md py-2 border-l px-3'>
                                <p>{lockedChoice?.doctorName}</p>
                            </div>
                            <button 
                                type="button" 
                                class="bg-green-600 text-white disabled: rounded-r-md py-2 border-l border-gray-200 hover:bg-green-800 hover:text-white px-3"
                                onClick={() => submitResponse(lockedChoice.responseId)}
                                disabled = { loading }
                            >
                            <div class="flex flex-row align-middle">
                                <span class="mr-2 text-base">Next</span>
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
           