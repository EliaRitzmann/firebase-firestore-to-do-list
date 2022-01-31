import { isValidTimestamp } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { LoginPopup } from '../components/LoginPopup';
import { useAuth } from '../contexts/FirebaseContext';
import pic from "../images/blank-profile-picture.png"
import { Element } from '../components/Element'
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../api/firebase';

export const Home = () => {
  const { user, logOut } = useAuth();
  const [list, setlist] = useState([]);
  const listCollectionRef = collection(firestore, "to-do-list")


  useEffect(() => {

    async function getList(){
      const data = await getDocs(listCollectionRef)
      setlist(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getList()
  }, [])

  function handleLogOut() {
    try {
      logOut()
    } catch (error) {
      console.log(error)
    }
  }

  const element = []

  for (var i = 0; i < list.length; i++) {
    element.push(<Element item={list[i]}></Element>)
  }

  return (
    <div>
      <LoginPopup trigger={user == null} />
      <div>
        <nav className='flex items-start justify-between m-3 h-10 border-b-2 '>
          <div className='w-40'>
            <h1 class="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
              To do List
            </h1>
          </div>

          <div className='flex gap-2 items-center justify-end w-40'>
            <button className='text-lg font-medium' onClick={handleLogOut}>{user?.displayName ? user.displayName : user?.email}</button>
            <img class="w-8 h-8 rounded-full" src={user?.photoURL ? user.photoURL : pic} alt="user photo" />
          </div>
        </nav>

        <main className='flex items-center flex-col'>
          <div className='divide-y divide-slate-700 '>
            {element}
          </div>
          <button className='bg-red-400 text-white py-2 px-4 rounded inline-flex items-center mt-2' onClick={handleLogOut}>
          Log out
        </button>
      </main>
    </div>


    </div >)

};
