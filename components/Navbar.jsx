"use client"

import OrgLogo from "@/components/svg/OrgLogo"
import { useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/firebase/confing'
import { useState } from 'react'

const Navbar = ({ heading }) => {

    const [ userName,setUserName ] = useState("")

    useEffect( () => {
        const doo = async() => {
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
        <nav class="bg-black border-gray-200 relative">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <OrgLogo />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MySwasthya</span>
                </a>
                
                <p class="text-blue-300 text-center absolute inset-0 flex justify-center items-center text-xl">{ heading }</p>
            
                <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <p className='text-white'>{userName}</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar