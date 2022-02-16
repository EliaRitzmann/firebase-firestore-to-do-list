import React, { useEffect, useState } from 'react';

//Firebase Auth
import { useAuth } from '../contexts/FirebaseContext';
//Firestore
import {
    collection, query, where,
    doc, addDoc, onSnapshot, orderBy
} from 'firebase/firestore';
import { firestore } from '../api/firebase';



export const AllCategorys = () => {
    const { user } = useAuth()

    const [category, setCategory] = useState([]);
    const [items, setItems] = useState([])

    const categoryRef = query(collection(firestore, "category"), where("userId", "==", user.uid))
    const itemsRef = query(collection(firestore, "items"), where("userId", "==", user.uid))

    useEffect(() =>
        onSnapshot(categoryRef, (snapshot) => {
            setCategory([])
            setCategory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        ),
        []);

    useEffect(() =>
        onSnapshot(itemsRef, (snapshot) => {
            setItems([])
            setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        ),
        []);

        const elements = [];

        console.log(items)
        console.log(category)   

        for(var i = 0; i < items.length; i++){
            for(var j = 0; j < category.length; j++){
                if(items[i].categoryName == category[j].name){
                    elements.push(<h1>{items[i].text}{category[j].color}</h1>)
                }else if(items[i].categoryName == "home"){
                    elements.push(<h1>{items[i].text}</h1>)
                }
            }
        }

    
    return <div>{elements}</div>;
};
