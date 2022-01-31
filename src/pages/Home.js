import { isValidTimestamp } from '@firebase/util';
import React from 'react';
import { LoginPopup } from '../components/LoginPopup';
import { useAuth } from '../contexts/FirebaseContext';

export const Home = () => {
  const {user, logOut} = useAuth();

  function handleLogOut(){
    try{
      logOut()
  }catch(error){
      console.log(error)
  }
  }

  return <div className=''>
      <h1>Main</h1>
      <h1>{user?.email}</h1>
      <button onClick={handleLogOut}>Log Out</button>
      <LoginPopup trigger={user == null}/>
  </div>;
};
