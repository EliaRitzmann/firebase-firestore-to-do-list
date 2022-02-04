import React, { useEffect, useState } from 'react';
import { Element } from './Element';

//Firebase Auth
import { useAuth } from '../contexts/FirebaseContext';
//Firestore
import {
    collection, query, where, 
    doc, addDoc, onSnapshot, orderBy 
} from 'firebase/firestore';
import { firestore } from '../api/firebase';


export const List = (props) => {
    const {user} = useAuth()

    const [files, setFiles] = useState([]);
    const elements = [];

    

    const colRef = query(collection(firestore, "category"), where("userId", "==", user.uid))
        for(var i = 0; i < files.length; i++){
            console.log(files[i])
            elements.push(<Element item={files[i]} key={i}></Element>)
        }

    
    useEffect(() => 
    onSnapshot(colRef,(snapshot) => {
        
        setFiles([])
        setFiles(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
        
    ),
     []);

    

  return <div className='divide-y divide-slate-700 bg-slate-200'>
      {elements}
  </div>;
};
