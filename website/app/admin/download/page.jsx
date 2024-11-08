"use client"

import { useState,useEffect } from 'react';
import { db,functions } from '@/firebase/confing'
import { httpsCallable } from 'firebase/functions';

const Download = () => {
    return (
        <div>
            <a href='https://helloworld-6tvjyju3za-uc.a.run.app/'>Download</a>
        </div>
    )
}

export default Download