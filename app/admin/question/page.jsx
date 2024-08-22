"use client"
import { db,functions } from '@/firebase/confing'
import { httpsCallable } from 'firebase/functions';
import { useState } from 'react';

function InputField({text,onChange,value}) {
    console.log(value)
    return (
        <div className="w-72 p-2">
            <div className="relative w-full min-w-[200px] h-10">
                <input className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900" placeholder=" " value={value} onChange={(e) => onChange(e.target.value)}/>
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">{text}</label>
            </div>
        </div>
    )
}

function DoctorCard({ doctor, id, setCurrDoctor, doctors, setIsEdit }) {
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
            <div className="button-container flex flex-col">
                <button className="button-4">Book a visit now</button>
                <br/>
                <button 
                    className="button-4"
                    onClick={() => {
                        setCurrDoctor(prev => doctors[id])
                        setIsEdit(prev => false)
                    }}
                >
                    Edit
                </button>
                
            </div>
        </div>
    );
}

const Question = () => {

    const handleClick = async () => {
        try {
            const result = await httpsCallable(functions, 'isAdminAccess')({uuid : 'tb0GBAAlERPZXf9t638ZQMC30hW2',option : "setQuestion",
                payload : { uuid : 'uuid' , page : "4"}
            });
        } catch (error) {
            console.error('Error calling function:', error);
        }
    };

    const [doctors,setDoctors] = useState([])
    const [isEdit,setIsEdit] = useState(false)
    const [currDoctor,setCurrDoctor] = useState({
        name: '',
        experience: '',
        consultationFees: '',
        distance: '',
        rating: '',
        ratingsCount: ''
    }); 

    return (
        <>
            <div className='flex flex-col items-center'>
                <br/>
                <div className='flex'>
                    { doctors[0]? <DoctorCard id={0} setIsEdit={setIsEdit} setCurrDoctor={setCurrDoctor} doctors={doctors} doctor={doctors[0]}/> : "" }
                    { doctors[1]? <DoctorCard id={1} setIsEdit={setIsEdit} setCurrDoctor={setCurrDoctor} doctors={doctors} doctor={doctors[1]}/> : "" }
                </div>
                <div className='flex'>
                    { doctors[2]? <DoctorCard id={2} setIsEdit={setIsEdit} setCurrDoctor={setCurrDoctor} doctors={doctors} doctor={doctors[2]}/> : "" }
                    { doctors[3]? <DoctorCard id={3} setIsEdit={setIsEdit} setCurrDoctor={setCurrDoctor} doctors={doctors} doctor={doctors[3]}/> : "" }
                </div>
                <div className='flex'>
                    { doctors[4]? <DoctorCard id={4} setIsEdit={setIsEdit} setCurrDoctor={setCurrDoctor} doctors={doctors} doctor={doctors[4]}/> : "" }
                    { doctors[5]? <DoctorCard id={5} setIsEdit={setIsEdit} setCurrDoctor={setCurrDoctor} doctors={doctors} doctor={doctors[5]}/> : "" }
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <InputField value={currDoctor.name} text={"Doctor's Name"} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, name : text })} ) }}/>
                <InputField value={currDoctor.experience} text={"Years of Experience"} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, experience : text })} ) }}/>
                <InputField value={currDoctor.consultationFees} text={"Consultation fees"} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, consultationFees : text })} ) }}/>
                <InputField value={currDoctor.distance} text={"Distance"} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, distance : text })} ) }}/>
                <InputField value={currDoctor.rating} text={"Rating"} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, rating : text })} ) }}/>
                <InputField value={currDoctor.ratingsCount} text={"No. of ratings"} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, ratingsCount : text })} ) }}/>
                <button 
                    onClick={() => { 
                        setDoctors( prev => [...prev,currDoctor] )
                        setCurrDoctor({
                            name: '',
                            experience: '',
                            consultationFees: '',
                            distance: '',
                            rating: '',
                            ratingsCount: ''
                        }); 
                    }}
                    type="button" 
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Purple to Blue
                </button>
            </div>
        </>
    );
}

export default Question