import React, { useEffect, useState } from 'react';
import { LoginPopup } from '../components/LoginPopup';
import { useAuth } from '../contexts/FirebaseContext';

export const Home = () => {
  const {user} = useAuth()
  return (
    <div>
      <h1>Guten Morgen {user?.displayName}</h1>

      <div>
      
      </div>
    </div>)

};
