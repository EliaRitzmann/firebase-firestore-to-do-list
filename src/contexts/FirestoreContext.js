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
const databaseContext = createContext();

export function useDatabase(){
    return useContext(databaseContext);
}

export const DatabaseContextProvider = ({children}) => {
    const { user } = useAuth()
    const [categorys, setCategorys] = useState([])
    const [items, setItems] = useState([])

    //category
    const colRef = query(collection(firestore, "category"), where("userId", "==", user.uid))

    useEffect(() =>
    onSnapshot(colRef, (snapshot) => {
      setCategorys([])
      setCategorys(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      console.log("category read")
    }
    ),
    []);
    
    //Items
    const toDoRef = query(
        collection(firestore, "items"),
        where("userId", "==", user.uid)
      );
    
      useEffect(() =>
      onSnapshot(toDoRef, (snapshot) => {
        setItems([])
        setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        console.log("items read")
      }
      ),
      []);



    const value = {
        categorys,
        items
    }


  return (
    <databaseContext.Provider value={value}>     
            {children}
        </databaseContext.Provider>
  )
}
