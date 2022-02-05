import React, { useEffect, useState } from 'react';
import { LoginPopup } from '../components/LoginPopup';

//Firebase Auth
import { useAuth } from '../contexts/FirebaseContext';
//Firestore
import {
    collection, query, where,
    doc, addDoc, onSnapshot, orderBy
} from 'firebase/firestore';
import { firestore } from '../api/firebase';
import { HomePanel } from '../components/HomePanel';

export const Home = () => {
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
        const favouriteCount = 0;
        for(var i = 0; i < items.length; i++){
            if(items[i].isFavourite == true){
                favouriteCount++;
            }
        }
        elements.push(<HomePanel itemCount={favouriteCount} name="Favourites" color="red" icon="heart" key="0" link={"/favourites"}/>)

        for(var i = 0; i < category.length; i++){
            elements.push(<HomePanel itemCount="69" name={category[i].name} color={category[i].color} icon={category[i].icon} link={"/category"} key={i + 1}/>)
        }

    
    return <div>
        <h1 className='font-bold text-xl ml-5'>Home</h1>
        <div className='grid grid-cols-2 gap-2 m-4 sm:grid-cols-3 md:grid-cols-4'>{elements}</div>
    </div>


};
