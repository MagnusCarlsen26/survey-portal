"use client"

import { httpsCallable } from 'firebase/functions';
import { db,functions } from '@/firebase/confing'
import { useEffect, useState } from 'react';
import { TiTick } from "react-icons/ti";
import Navbar  from '@/components/Navbar'

function Fetching () {
    return (
        <button type="button" className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
            <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
            </svg>
            Fetching
        </button> 
    )
}

async function handle( loadingState, uuid, option, payload,setListAccess) {
    try {
        loadingState( prev => ({...prev, [option] : true}) )
        const result = await httpsCallable(functions, 'isAdminAccess')({
            uuid,
            option,
            payload
        })
        if (option === 'listAccess') {
            console.log(result.data.map( user => user.email ))
            setListAccess( result.data.map( user => ({email : user.email, isDenyPhoto : user.isDenyPhoto}) ) )
        }
    } catch(error) {
        console.error(error)
    }
    loadingState( prev => ({...prev, [option] : false}) )
}

function Button({ loadingState, option, onClick }) {
    return (
        <>
            {
                !loadingState[option] ? 
                <button 
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    onClick={onClick}
                >
                    <span className="relative px-24 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">{option}</span>
                </button> :
                <Fetching />
            }
        </>
    )
}

function InputField({text,onChange,value}) {
    return (
        <div className="w-72 p-2">
            <div className="relative w-full min-w-[200px] h-10">
                <input className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900" placeholder=" " value={value} onChange={(e) => {onChange(e.target.value)}}/>
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">{text}</label>
            </div>
        </div>
    )
}

const Access = () => {

    const [loadingState,setLoadingState] = useState({
        listAccess : false,
        grantAccess : false,
        removeAccess : false
    })

    const [listAccess,setListAccess] = useState([])

    const [grantEmails,setGrantEmails] = useState([])
    const [grantCurrEmail,setGrantCurrEmail] = useState("")

    const [removeEmails,setRemoveEmails] = useState([])
    const [removeCurrEmail,setRemoveCurrEmail] = useState("")

    const [isDenyPhotoEmails,setIsDenyPhotoEmails] = useState([])
    const [isDenyPhotoEmail,setIsDenyPhotoEmail] = useState("")
    
    const [uuid,setUuid] = useState("")

    useEffect( () => {
        if (localStorage) {
            setUuid(localStorage.getItem('userUuid'))
        }
    } ,[])

    return (
        <div
            className="bg-fixed w-full h-full bg-cover"
            style={{backgroundImage : 'url(/1.jpg)'}}
        >
            <Navbar heading = {"Access Manager"}/>
            <div className="flex items-center justify-between h-full p-16">
                <div>
                    <div className='instructions-card'>
                        {
                            listAccess.map( (info,index) => (
                                <div className='flex' key={index}>
                                    <p>{info.email} {info.isDenyPhoto? "❌" : "✔️"}</p>
                                </div>
                            ))
                        }
                    </div>
                    <Button 
                        loadingState={loadingState}
                        option={'listAccess'}
                        onClick={() => handle(setLoadingState,uuid,'listAccess',{},setListAccess)}
                    />
                </div>
                <div>
                    <div className='instructions-card'>
                        {
                            grantEmails.map( (email,index) => (
                                <div className='flex' key={index}>
                                    <p>{email}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex'>
                        <InputField 
                            text={'Email'} 
                            onChange={setGrantCurrEmail}
                            value={grantCurrEmail}
                        />
                        <button 
                            onClick={() => {
                                if (grantCurrEmail.length) {
                                    setGrantEmails(prev => [...prev,`${grantCurrEmail}@iitj.ac.in`]),
                                    setGrantCurrEmail("")
                                }
                            }}
                        >
                            <TiTick />
                        </button>
                    </div>
                    <Button 
                        loadingState={loadingState}
                        option={'grantAccess'}
                        onClick={() => {
                            handle(setLoadingState,uuid,'grantAccess',{emails : grantEmails})
                            setGrantEmails([])
                        }}
                    />
                </div>
                <div>
                    <div className='instructions-card'>
                        {
                            removeEmails.map( (email,index) => (
                                <div className='flex' key={index}>
                                    <p>{email}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex'>
                        <InputField 
                            text={'Email'} 
                            onChange={setRemoveCurrEmail}
                            value={removeCurrEmail}
                        />
                        <button 
                            onClick={() => {
                                if (removeCurrEmail.length) {
                                    setRemoveEmails(prev => [...prev,`${removeCurrEmail}@iitj.ac.in`]),
                                    setRemoveCurrEmail("")
                                }
                            }}
                        >
                            <TiTick />
                        </button>
                    </div>
                    <Button 
                        loadingState={loadingState}
                        option={'removeAccess'}
                        onClick={() => {
                            handle(setLoadingState,uuid,'removeAccess',{emails : removeEmails})
                            setRemoveEmails([])
                        }}
                    />
                </div>
                <div>
                    <div className='instructions-card'>
                        {
                            isDenyPhotoEmails.map( (email,index) => (
                                <div className='flex' key={index}>
                                    <p>{email}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex'>
                        <InputField 
                            text={'Email'} 
                            onChange={setIsDenyPhotoEmail}
                            value={isDenyPhotoEmail}
                        />
                        <button 
                            onClick={() => {
                                if (isDenyPhotoEmail.length) {
                                    setIsDenyPhotoEmails(prev => [...prev,`${isDenyPhotoEmail}@iitj.ac.in`]),
                                    setIsDenyPhotoEmail("")
                                }
                            }}
                        >
                            <TiTick />
                        </button>
                    </div>
                    <Button 
                        loadingState={loadingState}
                        option={'denyPhoto'}
                        onClick={() => {
                            handle(setLoadingState,uuid,'denyPhoto',{emails : isDenyPhotoEmails})
                            setIsDenyPhotoEmails([])
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Access