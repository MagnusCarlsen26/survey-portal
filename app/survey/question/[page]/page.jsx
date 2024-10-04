/* eslint-disable @next/next/no-img-element */
"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { db,functions } from '@/firebase/confing'
import { useState } from 'react'

let page
let uuid = localStorage.getItem('userUuid')

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
    const [loading,setLoading] = useState(false)
    const [userName,setUserName] = useState("")

    page = params.page

    const submitResponse = async(responseId) => {
        try {
            setLoading(true)
            const result = await httpsCallable(functions, 'isAccess')({
                uuid,
                option : 'response',
                payload : { 
                    uuid,
                    qid : page,
                    responseId
                }
            });
            if (result.data === "You have already attempted the question.") {
                alert("Your current response won't be considered as you have already attempted the question.")
                if (parseInt(page,10) === 12) router.push('/survey/done/instructions')
                else router.push(`/survey/question/${parseInt(page,10) + 1}`)
            } else if (result.data === "Please submit response for previous quesitons first.") {
                alert(result.data)
            } else if (result.data === "response") {
                if (parseInt(page,10) === 12) router.push('/survey/done/instructions')
                else router.push(`/survey/question/${parseInt(page,10) + 1}`)
            }
        } catch (error) {

        }
        setLoading(false)
    } 

    useEffect( () => {
        console.log(uuid)
        const doo = async() => {
            try {
                const response = await httpsCallable(functions, 'isAccess')({
                    uuid,
                    option : 'getQuestion',
                    payload : {
                        uuid,
                        page,
                    }
                })
                if (response.data === 'Please attempt previous questions first.') {
                    console.error('Please attempt previous questions first.')
                } else {
                    setDoctors(prev => response.data.doctors)
                }
            } catch(error) {
                alert("You might not be logged in or you might not have survey access. Login here - localhost:3000/login")
                console.error(error)
            }

            try {
                const response = await httpsCallable(functions, 'isAccess')({
                    uuid,
                    option : 'getUserName',
                    payload : {
                        uuid,
                    }
                })
                setUserName(response.data)
            } catch(error) {
                console.error(error)
            }
        }
        doo()

    } , [] )
    
    return (
        <div 
            className="bg-cover bg-no-repeat h-full" 
            style={{backgroundImage : 'url(/1.jpg)'}}
        >

            <nav class="bg-black border-gray-200 relative">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
  fill="#00c9cc"
  width="24px   "
  height="24px  "
  viewBox="0 0 512.00 512.00"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  stroke="#00c9cc"
  strokeWidth="26.624"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="3.072"></g>
  <g id="SVGRepo_iconCarrier">
    <g id="_x35_94_x2C__Hospital_x2C__medical_x2C__plus">
      <g>
        <g>
          <g>
            <g>
              <path d="M326.348,490.956h-140c-5.523,0-10-4.478-10-10v-145h-145c-5.523,0-10-4.478-10-10v-140c0-5.523,4.477-10,10-10h145 v-145c0-5.523,4.477-10,10-10h140c5.522,0,10,4.477,10,10v145h145c5.522,0,10,4.477,10,10v140c0,5.522-4.478,10-10,10h-145v145 C336.348,486.479,331.87,490.956,326.348,490.956z M196.347,470.956h120v-145c0-5.522,4.478-10,10-10h145v-120h-145 c-5.522,0-10-4.477-10-10v-145h-120v145c0,5.523-4.477,10-10,10h-145v120h145c5.523,0,10,4.478,10,10V470.956z"></path>
            </g>
            <g>
              <path d="M286.348,450.956h-60c-5.523,0-10-4.478-10-10v-140h-150c-5.523,0-10-4.478-10-10v-70c0-5.523,4.477-10,10-10h150v-140 c0-5.523,4.477-10,10-10h60c5.522,0,10,4.477,10,10v140h150c5.522,0,10,4.477,10,10v70c0,5.522-4.478,10-10,10h-150v140 C296.348,446.479,291.87,450.956,286.348,450.956z M236.347,430.956h40v-140c0-5.522,4.478-10,10-10h150v-50h-150 c-5.522,0-10-4.477-10-10v-140h-40v140c0,5.523-4.477,10-10,10h-150v50h150c5.523,0,10,4.478,10,10V430.956z"></path>
            </g>
          </g>
        </g>
      </g>
    </g>
    <g id="Layer_1"></g>
  </g>
</svg>

                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MySwasthya</span>
                    </a>
                    
                    <p class="text-blue-300 text-center absolute inset-0 flex justify-center items-center text-xl">
                        Choice Set {page}
                    </p>
                
                    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <p className='text-white'>{userName}</p>
                    </div>
                </div>
            </nav>

            <br></br>
            <div className="flex items-center justify-center px-12">
                <div>
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
                </div>
                
                {lockedChoice && 
                    <div className='flex items-center justify-center'>
                        <div>
                            <p>{lockedChoice?.doctorName}</p>
                            <button 
                                type="button" 
                                class="bg-green-600 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-green-800 hover:text-white px-3"
                                onClick={() => submitResponse(lockedChoice.responseId)}
                            
                            >
                            <div class="flex flex-row align-middle">
                                <span class="mr-2 text-base">Next</span>
                                {loading ? 
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                        <g transform="rotate(0 50 50)"><circle cx="50" cy="50" r="40" stroke="#fff" stroke-width="8" fill="none"><animate attributeName="stroke-dasharray" values="0, 200; 100, 200; 200, 200" dur="1.5s" repeatCount="indefinite"/><animate attributeName="stroke-dashoffset" values="0; -40; -100" dur="1.5s" repeatCount="indefinite" /></circle></g>
                                    </svg> 
                                    : 
                                    <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                    </svg>
                                }

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
           