"use client"

import { useState } from "react"

function CheckboxGroup({ heading, options, onChange }) {

    return (
        <>
            <p>{heading}</p>
            {
                options.map(option => (
                    <div key={option} className="flex gap-10">
                        <div className="inline-flex items-center">
                            <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={option} data-ripple-dark="true">
                                <input 
                                    name={heading}
                                    type="checkbox"
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                    id={option} 
                                    value={option}
                                    onChange={(e) => onChange(option, e.target.checked)}
                                />
                                <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                    </svg>
                                </span>
                            </label>
                            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor={option}>
                                {option}
                            </label>
                        </div>
                    </div>
                ))
            }
        </>
    )
}



const Survey = () => {

    const [ checked, setChecked ] = useState({
        "Father" : false,
        "Mother" : false,
        "Brother" : false,
        "Sister" : false,
        "Other member male" : false,
        "Other member female": false
    })

    console.log(checked)

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
                <form>
                    <CheckboxGroup 
                        heading={"If yes, what is the relationship with this family member?*"}
                        options={[
                            "Father",
                            "Mother",
                            "Brother",
                            "Sister",
                            "Other member male",
                            "Other member female"
                        ]}
                        onChange={ (option,isChecked) => setChecked( prev => ({
                            ...prev,
                            [option] : isChecked
                        }) ) }
                    />
                </form>
            </div>
        </div>
    )
}

export default Survey