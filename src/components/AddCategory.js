import React, { useState } from 'react';
import { getIcons } from '../icons/Icons';

import { firestore } from '../api/firebase';
import {addDoc, collection} from 'firebase/firestore';
import { useAuth } from '../contexts/FirebaseContext';

export const AddCategory = () => {
    const [name, setName] = useState("new category");
    const [icon, setIcon] = useState("folder")
    const [color, setColor] = useState("blue")

    const {user} = useAuth()

    const colRef = collection(firestore, "category")

    async function add(){
        await addDoc(colRef, {name: name, icon: icon, color: color, userId: user.uid })
    }

    return <div className='flex flex-col justify-center gap-2 w-4/5 h-20 rounded-lg px-2 bg-white hover:shadow'>
        <div className='inline-flex items-center justify-between'>
            <div className='flex gap-2'>
                {getIcons(icon, color)}
                <input onChange={event => setName(event.target.value)} type="text" maxLength={12} placeholder='Create new ' className=' w-full mr-2 p-1 bg-gray-300 h-6 rounded' />
            </div>
            <button onClick={add}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </button>
        </div>

        <div className='flex items-center justify-around'>
            <button className='bg-gray-300 h-7 w-16 rounded' id="dropdownButton" type='button' data-dropdown-toggle="dropdown">icon</button>
            <button className='bg-gray-300 h-7 w-16 rounded'>color</button>
            <div id="dropdown" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                <ul className="py-1" aria-labelledby="dropdownButton">
                    <li>
                        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                    </li>

                </ul>
            </div>
            
        </div>
    </div>;
};
