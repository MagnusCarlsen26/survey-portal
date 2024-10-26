"use client"

import { db,functions } from '@/confing'
import { httpsCallable } from 'firebase/functions';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

function InputField({text,onChange,value}) {
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
            <div className="button-container flex flex-col">
                <br/>
                <button 
                    className="button-4"
                    onClick={() => {
                        setCurrDoctor(prev => doctors[id])
                        setIsEdit(prev => id + 1)
                    }}
                >
                    Edit
                </button>
                
            </div>
        </div>
    );
    //     <div className="card border border-gray-200 p-4 rounded-lg shadow-md" >

    //         { process.env.NEXT_PUBLIC_IS_IMAGE === 'true' && <div className="image-container">
    //             <img className="image" src={doctor.pfp} alt={doctor[process.env.NEXT_PUBLIC_PARAM_NAME_0]} width="120" height="120" loading="lazy" />
    //         </div> }
    //         <div className="info-container">
    //             <h3>{doctor[process.env.NEXT_PUBLIC_PARAM_NAME_0]}</h3>
    //             { process.env.NEXT_PUBLIC_PARAM_NAME_1 !== 'false' && <span className="biggerSpan">{process.env.NEXT_PUBLIC_PARAM_1} : {doctor[process.env.NEXT_PUBLIC_PARAM_NAME_1]} <br /></span>}
    //             { process.env.NEXT_PUBLIC_PARAM_NAME_2 !== 'false' && <span>{process.env.NEXT_PUBLIC_PARAM_2} : {doctor[process.env.NEXT_PUBLIC_PARAM_NAME_2]} <br /></span>}
    //             { process.env.NEXT_PUBLIC_PARAM_NAME_3 !=='false' && <span> {process.env.NEXT_PUBLIC_PARAM_3} : {doctor[process.env.NEXT_PUBLIC_PARAM_NAME_3]} <br /></span>}
    //             {  process.env.NEXT_PUBLIC_PARAM_NAME_4 !== 'false' && <div className="rating-widget">
    //                 <div className="rating">{doctor[process.env.NEXT_PUBLIC_PARAM_NAME_4]} {process.env.NEXT_PUBLIC_PARAM_4}</div>
    //             </div> }
    //         </div>
    //         <div className="button-container">
    //             <button 
    //                 className="button-4"
    //                 onClick={showConfirmation}
    //             >
    //                 Choose
    //             </button>
    //         </div>
    //     </div>
    // );
}

function DoctorRow ({doctor1,doctor2}) {
    return (
        <div className='flex'>
            <DoctorCard  doctor={doctor1} />
            <DoctorCard  doctor={doctor2} />
        </div>
    )
}

function RenderDoctors({doctors}) {
    return doctors.map( (doctor,index) => {
        if (index >= process.env.NEXT_PUBLIC_NO_OF_CHOICES) return <></>
        if ( index%2 == 0 ) {
            if ( index + 1 < doctors.length && index + 1 < process.env.NEXT_PUBLIC_NO_OF_CHOICES) return <DoctorRow doctor1 = {doctors[index]} doctor2 = {doctors[index+1]}  setLockedChoice={setLockedChoice}/>
            return <div className='flex'>
                    <DoctorCard  doctor={doctor} />
                </div>
        } else return <></>
    })
}

const Question = () => {

    const saveToDB = async (uuid) => {
        let result
        setServerResponse("")
        try {
            setIsSaving(prev => true)
            result = await httpsCallable(functions, 'isAdminAccess')({
                uuid ,
                option : "setQuestion",
                payload : { 
                    page : page,
                    doctors
                }
            });
        } catch (error) {
            console.log(result)
        }
        setServerResponse(JSON.stringify(result))
        setIsSaving(prev => false)

    };

    const saveDoctor = () => {
        console.log(isEdit)
        if (isEdit) {
            setDoctors( prev => {
                let newDoc = [...prev]
                newDoc[isEdit - 1] = currDoctor
                return newDoc
            })
        } else {
            setDoctors( prev => [...prev,currDoctor] )
        }
        setIsEdit(false)
        setCurrDoctor({}); 
    }

    const [isSaving,setIsSaving] = useState(false)
    const [doctors,setDoctors] = useState([])
    const [page,SetPage] = useState()
    const [isEdit,setIsEdit] = useState(false)
    const [currDoctor,setCurrDoctor] = useState({}); 
    const [uuid,setUuid] = useState("")
    const [serverResponse,setServerResponse] = useState("")

    useEffect( () => {
        setUuid( localStorage.getItem('userUuid') )
    } , [])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setCurrDoctor( prev => ({
                ...prev,
                pfp : reader.result
            }))
          };
          reader.readAsDataURL(file);
        }
    };

    const noOfChoices = process.env.NEXT_PUBLIC_NO_OF_CHOICES

    return (
        <div
            className="bg-fixed w-full min-h-screen bg-cover"
            style={{backgroundImage : 'url(/1.png)'}}
        >
            <Navbar heading={"Create Questions"}/>
            <div className='flex flex-col items-center'>
                <br/>
                <div><RenderDoctors doctors={doctors} /></div>
            </div>
            <div className='flex flex-col items-center'>
                {
                    doctors.length < noOfChoices ?
                    <>
                        <InputField value={currDoctor.id} text={"id"} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, id : text })} ) }}/>                    
                        { process.env.NEXT_PUBLIC_PARAM_NAME_0 !== 'false' && <InputField value={currDoctor[process.env.NEXT_PUBLIC_PARAM_NAME_0]} text={process.env.NEXT_PUBLIC_PARAM_0} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, [process.env.NEXT_PUBLIC_PARAM_0] : text })} ) }}/>}
                        { process.env.NEXT_PUBLIC_PARAM_NAME_1 !== 'false' && <InputField value={currDoctor[process.env.NEXT_PUBLIC_PARAM_NAME_1]} text={process.env.NEXT_PUBLIC_PARAM_1} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, [process.env.NEXT_PUBLIC_PARAM_1] : text })} ) }}/>}
                        { process.env.NEXT_PUBLIC_PARAM_NAME_2 !== 'false' && <InputField value={currDoctor[process.env.NEXT_PUBLIC_PARAM_NAME_2]} text={process.env.NEXT_PUBLIC_PARAM_2} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, [process.env.NEXT_PUBLIC_PARAM_2] : text })} ) }}/>}
                        { process.env.NEXT_PUBLIC_PARAM_NAME_3 !== 'false' && <InputField value={currDoctor[process.env.NEXT_PUBLIC_PARAM_NAME_3]} text={process.env.NEXT_PUBLIC_PARAM_3} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, [process.env.NEXT_PUBLIC_PARAM_3] : text })} ) }}/>}
                        { process.env.NEXT_PUBLIC_PARAM_NAME_4 !== 'false' && <InputField value={currDoctor[process.env.NEXT_PUBLIC_PARAM_NAME_4]} text={process.env.NEXT_PUBLIC_PARAM_4} onChange={ (text) => { setCurrDoctor( prev => {return({ ...prev, [process.env.NEXT_PUBLIC_PARAM_4] : text })} ) }}/>}          
                        { process.env.NEXT_PUBLIC_IS_IMAGE === 'true' && <input type="file" accept="image/*" onChange={handleFileChange} />}

                        <button 
                            onClick={saveDoctor}
                            type="button" 
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Save
                        </button>
                    </>
                    : ""
                }
                <br/>
                {
                    doctors.length == noOfChoices ?
                    !isSaving ? <>
                        <InputField text={"Page"} onChange={SetPage} value={page}/>
                        <button 
                            onClick={() => {saveToDB(uuid)}}
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                        >
                            <span className="relative px-24 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Save to DB</span>
                        </button>
                    </> : 
                    <button type="button" className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
                        <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                        </svg>
                        Saving to DB
                    </button> 
                    : ""
                }
            {serverResponse}
            </div>
        </div>
    );
}

export default Question