import React, { useEffect, useState } from 'react';

//Firebase Auth
import { useAuth } from '../contexts/FirebaseContext';
//Firestore
import {
  collection, query, where,
  doc, addDoc, onSnapshot, orderBy
} from 'firebase/firestore';
import { firestore } from '../api/firebase';


import { AddCategory } from './AddCategory';
import { CategoryElement } from './CategoryElement';
import { getIcons } from '../icons/Icons';


export const Sidebar = () => {

  const { user } = useAuth()

  const [category, setCategory] = useState([]);
  const elements = [];



  const colRef = query(collection(firestore, "category"), where("userId", "==", user.uid))
  for (var i = 0; i < category.length; i++) {
    console.log(category[i])
    elements.push(<CategoryElement item={category[i]} key={i}></CategoryElement>)
  }


  useEffect(() =>
    onSnapshot(colRef, (snapshot) => {
      setCategory([])
      setCategory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    ),
    []);

  return <div className='flex flex-col items-center gap-2'>
    <a href="/" className='inline-flex w-4/5 h-10 items-center justify-between rounded-lg px-2 bg-white hover:shadow'>
      <div className='flex gap-2'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className='font-semibold'>Home</span>
      </div>
    </a>

    <a href="/all" className='inline-flex w-4/5 h-10 items-center justify-between rounded-lg px-2 bg-white hover:shadow'>
      <div className='flex gap-2'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <span className='font-semibold'>All</span>
      </div>
    </a>
    <a href="/favourites" className='inline-flex w-4/5 h-10 items-center justify-between rounded-lg px-2 bg-white hover:shadow'>
      <div className='flex gap-2'>
      {getIcons("heart", "black", "small")}
        <span className='font-semibold'>Favourites</span>
      </div>
    </a>
    <h1 className='font-semibold '>Categories</h1>
    {elements}
    <AddCategory></AddCategory>
    <div className='absolute bottom-0 flex flex-col items-center justify-center mb-1'>
    <h1 className='text-sm text-gray-500'>made by Elia Ritzmann</h1>
    <a href="https://github.com/EliaRitzmann/firebase-firestore-to-do-list" className="text-sm text-gray-500">Git Hub</a>
    </div>
  </div>;
};
