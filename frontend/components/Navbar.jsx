"use client"

import OrgLogo from "@/components/svg/OrgLogo"
import { useState, useEffect } from 'react';
import userServerCall from "./utils/userServerCall";

const Navbar = ({ heading }) => {

    const [ userName,setUserName ] = useState("")
    
    useEffect( () => {
        const doo = async() => {
            try {
                const response = await userServerCall('getUserName',{},false)
                setUserName(response.data)
            } catch(error) {
                console.error(error)
            }
        }
        doo()

    } , [] )

    return (
        <nav className="sticky top-0 left-0 right-0 bg-black border-gray-200" style={{zIndex : "1"}}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={process.env.NEXT_PUBLIC_LOGO} width="28" height="28" alt="" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{process.env.NEXT_PUBLIC_ORG_NAME}</span>
                </a>
                
                <p className="text-blue-300 text-center absolute inset-0 flex justify-center items-center text-xl">{ heading }</p>
            
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <p className='text-white'>{userName}</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar