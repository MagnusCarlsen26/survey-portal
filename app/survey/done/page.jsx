"use client"

import { useState } from "react"
import { httpsCallable } from 'firebase/functions';
import { db,functions } from '@/firebase/confing'
    
function InputField({text,setForm,keyy}) {
    return (
        <div className="w-full max-w-sm min-w-[200px] mt-4">
            <label className="block mb-1 text-sm text-slate-800 font-bold">
                {text}
            </label>
            <input
                type="text"
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md border-black border-2"
                onChange={(e) => setForm( prev => ({
                    ...prev,
                    [keyy] : e.target.value
                }))}
            />
        </div>
    )
}

async function handle( loadingState, uuid, payload) {
    try {
        console.log('SUBMIGNITN')
        loadingState( prev => true )
        await httpsCallable(functions, 'isAccess')({
            uuid,
            option : "done",
            payload : {
                uuid,
                form : payload
            }
        })
    } catch(error) {
        console.error(error)
    }
    loadingState( prev => false )
}

function Button({ loadingState, option, onClick }) {
    return (
        <>
            {
                !loadingState ? 
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

const Done = () => {

    const [loadingState,setLoadingState] = useState(false)
    const [form,setForm] = useState({
        q1 : "" ,
        q2 : "" ,
        q3 : "" ,
        q4 : "" ,
        q5 : "" ,
    })
    const uuid = 'tb0GBAAlERPZXf9t638ZQMC30hW2'
    
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{backgroundImage : 'url("https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80")'}}>

            <div className="flex flex-col items-center justify-center min-h-screen">
                <InputField 
                    text={'Question 1'}
                    setForm={setForm}
                    keyy={'q1'}
                />
                <InputField 
                    text={'Question 2'}
                    setForm={setForm}
                    keyy={'q2'}
                />
                <InputField 
                    text={'Question 3'}
                    setForm={setForm}
                    keyy={'q3'}
                />
                <InputField 
                    text={'Question 4'}
                    setForm={setForm}
                    keyy={'q4'}
                />
                <InputField 
                    text={'Question 5'}
                    setForm={setForm}
                    keyy={'q5'}
                />
                <br />
                <Button 
                    loadingState={loadingState}
                    option={"Submit Survey"}
                    onClick={() => {handle(setLoadingState,uuid,form)}}
                />
            </div>
        </div>
    )
}

export default Done