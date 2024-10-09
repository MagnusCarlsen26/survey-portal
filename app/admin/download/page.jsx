"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Download = () => {

    const [password,setPassword] = useState("")
    const router = useRouter()
    return (
        <div>
        <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default input</label>
        <input 
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
        <button 
            className='border-2'
            onClick={() => router.push(`http://13.232.236.11:3000/downloadDb?password=${password}`)}
        >
            Download
        </button>
    </div>
    )
}

export default Download