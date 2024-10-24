"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Download = () => {

    const router = useRouter()
    return (
        <div>
        <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default input</label>
        <button 
            className='border-2'
            onClick={() => router.push(`http://13.232.236.11:3000/downloadDb`)}
        >
            Download
        </button>
    </div>
    )
}

export default Download