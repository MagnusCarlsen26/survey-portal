"use client"

import React, { useState } from 'react';
import Navbar from "@/components/Navbar"
import userServerCall from '@/components/utils/userServerCall';

function InstructionInput({ params }) {
    const [instruction, setInstruction] = useState('');
    const [instructionsList, setInstructionsList] = useState([]);

    const onSubmit = async(e) => {
        try {
            const response = await userServerCall("setInstructions",{
                instructions : instructionsList,
                type : params.type
            },true)
        } catch (error) {
            console.error(error)
            alert(`Some error occured ${error}`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (instruction.trim()) {
            setInstructionsList([...instructionsList, instruction.trim()]);
            setInstruction('');
        }
    };

    return (
        <div
        className="bg-fixed w-full min-h-screen bg-cover"
        style={{backgroundImage : 'url(/1.png)'}}
        >
            <Navbar heading={"Instructions"}/>
            <div className="max-w-md mx-auto p-10 shadow-lg rounded">
                
                <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                        type="text"
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        placeholder="Type your instruction"
                        className="flex-grow p-2 border border-black rounded-l bg-transparent"
                    /> &nbsp;
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                    >
                        Add
                    </button>
                </form>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Instructions List:</h3>
                    <ol className="list-inside">
                        {instructionsList.map((instr, index) => (
                            <li key={index} className="mb-1">
                                {instr}
                            </li>
                        ))}
                    </ol>
                    <br></br>
                    <div className='flex justify-center'>
                        <button
                            onClick={onSubmit}    
                            className="p-2 bg-blue-500    text-white rounded-r hover:bg-blue-600"
                        >Save To DB
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructionInput;
