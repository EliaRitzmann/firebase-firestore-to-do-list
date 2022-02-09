import React, { useState } from 'react';
import { getIcons, iconName, colorName } from '../icons/Icons';

import { firestore } from '../api/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../contexts/FirebaseContext';

export const AddCategory = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("folder")
    const [color, setColor] = useState("black")

    const { user } = useAuth()

    const colRef = collection(firestore, "category")

    async function add() {
        await addDoc(colRef, { name: name, icon: icon, color: color, userId: user.uid })
    }

    const icons = []
    var key = 0;
    for(let j = 0; j < colorName.length; j++){
        key++;
        for(let i = 0; i < iconName.length; i++){
            key++;
            icons.push(<button onClick={ e => setIconAndColor(iconName[i], colorName[j])} key={key}>{getIcons(iconName[i], colorName[j], "small")}</button>)
        }
    }
    
    function setIconAndColor(a, b){
        setShowModal(false)
        console.log(a)
        console.log(b)
        setIcon(a)
        setColor(b)
    }


    return <div className='flex flex-col justify-center gap-2 w-4/5 h-10 rounded-lg px-2 bg-white shadow shadow-gray-400 '>
        <div className='inline-flex items-center justify-between'>
            <div className='flex gap-2'>
                <button onClick={a => setShowModal(true)}>{getIcons(icon, color, "small")}</button>
                <input onChange={event => setName(event.target.value)} type="text" maxLength={12} placeholder='Create new ' className=' w-full mr-2 p-1 bg-gray-300 h-6 rounded' />
            </div>
            <button onClick={add} className="bg-gray-300 rounded-md p-0.5 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            {showModal && <div className='bg-black bg-opacity-50 absolute inset-0 w-screen flex justify-center items-center'>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-auto h-1/3 shadow-xl w-1/2">
                    <div className='bg-gray-200 flex items-center justify-end'>
                        <button onClick={a => setShowModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <div className='grid grid-cols-6 gap-2 p-2 sm:grid-cols-9'>
                        {icons}
                        </div>

                    </div>
                </div>
            </div>}
        </div>
    </div>
}
