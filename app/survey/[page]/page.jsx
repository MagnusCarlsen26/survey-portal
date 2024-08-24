"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { db,functions } from '@/firebase/confing'
import { useState } from 'react'

let page,uuid

const DoctorCard = ({ doctor }) => {

    const submitResponse = async() => {
        try {
            result = await httpsCallable(functions, 'isAccess')({
                uuid,
                option : 'response',
                payload : { 
                    uuid,
                    qid : page,
                    respo : doctor.id
                }
            });
        } catch (error) {

        }
    }   

    return (
        <div className="card">
            <div className="image-container">
                <img className="image" src={doctor.image} alt={doctor.name} width="120" height="120" loading="lazy" />
            </div>
            <div className="info-container">
                <h3>{doctor.name}</h3>
                <span className="biggerSpan">{doctor.specialty}</span><br />
                <span>{doctor.experience} years of experience</span><br />
                <span> ₹{doctor.consultationFees} Consultation fees</span><br />
                <span>{doctor.distance} kms from me</span><br />
                <div className="rating-widget">
                    <div className="rating">{doctor.rating}</div>
                    <span className="biggerSpan">{doctor.ratingsCount} ratings provided</span>
                </div>
            </div>
            <div className="button-container">
                <button 
                    className="button-4"
                    onClick={submitResponse}
                >
                    Book a visit now
                </button>
            </div>
        </div>
    );
}

const Survey = ({ params }) => {

    const router = useRouter()
    uuid = 'tb0GBAAlERPZXf9t638ZQMC30hW2'
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
    page = params.page

    useEffect( () => {
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
                setDoctors(prev => response.data.doctors)
                console.log(doctors)
            } catch(error) {
                
            }
        }
        doo()
    } , [] )
    
    return (
        <div className="flex items-center justify-center px-12">
            <br></br>
            <div>
                <div className="flex">
                    <DoctorCard doctor={doctors[0]} />
                    <DoctorCard doctor={doctors[1]} />
                </div>
                <div className="flex">
                    <DoctorCard doctor={doctors[2]} />
                    <DoctorCard doctor={doctors[3]} />
                </div>
                <div className="flex">
                    <DoctorCard doctor={doctors[4]} />
                    <DoctorCard doctor={doctors[5]} />
                </div>
            </div>

        </div>
    );
}

export default Survey;
