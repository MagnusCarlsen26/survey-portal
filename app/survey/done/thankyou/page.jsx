"use client"

import { useEffect } from "react";
import userServerCall from "@/components/utils/userServerCall";

const Survey = () => {

    useEffect( () => {
        const doo = async() => {
            try {
                const response = await userServerCall('surveyCompleted',{},false)
            } catch ( error ) {
                console.error(error)
            }
        }
        doo()
    },[])

    return (
        <div
            className="bg-fixed h-full w-full bg-cover"
            style={{backgroundImage : 'url(/1.jpg)'}}
        >
            <br></br>
            <h1 className='text-center'>Thankyou</h1>
            <p></p>

        </div>
    );
}

export default Survey;
