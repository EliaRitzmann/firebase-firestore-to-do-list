import { createContext, useContext, useEffect, useState } from "react";

//Firebase Auth
import { useAuth } from '../contexts/FirebaseContext';
//Firestore
import {
  collection, query, where,
  onSnapshot
} from 'firebase/firestore';
import { firestore } from '../api/firebase';

//Create Context
const categoryContext = createContext();

export function useCategory(){
    return useContext(categoryContext);
}

export const CategoryContextProvider = ({children}) => {
    
    
    const [categoryName, setCategoryName] = useState()
    const [categoryId, setCategoryId] = useState()

    function changeCategoryName(categoryName){
        setCategoryName(categoryName)
    }

    function changeCategoryId(categoryId){
        setCategoryId(categoryId)
    }


    const value = {
        categoryName,
        categoryId,
        changeCategoryName,
        changeCategoryId
    }


  return (
    <categoryContext.Provider value={value}>     
            {children}
        </categoryContext.Provider>
  )
}