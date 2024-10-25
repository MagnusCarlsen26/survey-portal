import { useEffect } from "react"

export function InputField({text, onChange, type}) {
    useEffect( () => {
        onChange("")
    },[])
    return (
        <div className="w-full max-w-sm min-w-[200px] mt-4">
            <label className="block mb-1 text-sm text-black font-bold">
                {text}
            </label>
            <input
                type={type}
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md border-black border-2"
                onChange={(e) => onChange(e.target.value)}
            />
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
        </div>
    )
}

export function CheckboxGroup({ heading, options, onChange }) {
    return (
        <>
            <p className='font-bold'>{heading}</p>
            {
                options.map(option => (
                    <div key={option} className="flex gap-10">
                        <div className="inline-flex items-center">
                            <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={option} data-ripple-dark="true">
                                <input 
                                    name={heading}
                                    type="checkbox"
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none border border-black text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
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



export function RadioButton({ heading, options, onChange }) {
    useEffect( () => {
        onChange("")
    },[])
    return (
        <>
            <p className='font-bold'>{heading}</p>
            {
                options.map( (option,index) => (

                    <div className="flex gap-10" key={index}>
                        <div className="inline-flex items-center">
                            <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={option} data-ripple-dark="true">
                                <input 
                                    name={heading}
                                    type="radio"
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-black text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                    id={option} 
                                    value={option}
                                    onChange={() => onChange(option)}
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
                ) )
            }
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
        </>
    )   
}