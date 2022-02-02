import React, { useEffect, useState } from 'react';
import { Element } from './Element';

//Firebase Auth
import { useAuth } from '../contexts/FirebaseContext';
//Firestore
import {
    collection, query, where, 
    doc, addDoc, onSnapshot 
} from 'firebase/firestore';
import { firestore } from '../api/firebase';


export const List = () => {
    const {user} = useAuth()

    const [files, setFiles] = useState([]);
    const elements = [];

    

    const colRef = query(collection(firestore, "files"), where("userId", "==", "user.uid"))
        for(var i = 0; i < files.length; i++){
        
            elements.push(<Element item={files[i]}></Element>)
        }

    
    useEffect(() => 
    onSnapshot(colRef,(snapshot) => {
        //why
        setFiles([])
        setFiles(snapshot.docs.map((doc) => doc.data()))
    }
        
    ),
     []);

    

  return <div>
      {elements}
  </div>;
};
