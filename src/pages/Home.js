import React, { useEffect, useState } from 'react';
import { LoginPopup } from '../components/LoginPopup';
import { useAuth } from '../contexts/FirebaseContext';
import pic from "../images/blank-profile-picture.png"


import { List } from '../components/List';import { collection, query, getDocs, doc, where } from 'firebase/firestore';

import { AddElement } from '../components/AddElement';

export const Home = () => {
  const { user, logOut } = useAuth();



  function handleLogOut() {
    try {
      logOut()
    } catch (error) {
      console.log(error)
    }
  }

  

  

  return (
    <div>
      <LoginPopup trigger={user == null} />
      <div>
        <nav className='flex items-start justify-between m-3 h-10 border-b-2 '>
          <div className='w-40'>
            <h1 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
              To do List
            </h1>
          </div>

          <div className='flex gap-2 items-center justify-end w-40'>
            <button className='text-lg font-medium invisible sm:visible' onClick={handleLogOut}>{user.displayName ? user.displayName : user.email}</button>
            <img className="w-8 h-8 rounded-full" src={user.photoURL ? user.photoURL : pic} alt="user photo" />
          </div>
        </nav>

        <main className='flex items-center flex-col'>
          <div className='divide-y divide-slate-700 '>
            <List></List>
            <AddElement></AddElement>
          </div>

          <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded inline-flex items-center mt-2' onClick={handleLogOut}>
          Log out
        </button>
      </main>
    </div>


    </div >)

};
