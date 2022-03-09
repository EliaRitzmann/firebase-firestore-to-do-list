import React, { useEffect, useState } from "react";
//Firebase Auth
import { useAuth } from "../contexts/FirebaseContext";
//Firestore
import {
  collection,
  query,
  where,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../api/firebase";
import { Item } from "../components/Item";
import { useDatabase } from "../contexts/FirestoreContext";

export const Favourites = () => {
  
  const {items} = useDatabase()

  const favourteItems = [];

  for(var i = 0; i  < items.length; i++){
    if(items[i].favourite == true){
      favourteItems.push(items[i])
    }
  }

  const elements = [];
  if(favourteItems.length == 0){
    elements.push(<h1 key={1}>There are no favourites yet </h1>)
  }
  for (var i = 0; i < favourteItems.length; i++) {
    elements.push(
      <Item
        text={favourteItems[i].text}
        favourite={favourteItems[i].favourite}
        done={favourteItems[i].done}
        dueTo={favourteItems[i].dueTo}
        createdAt={favourteItems[i].createdAt}
        id={favourteItems[i].id}
        key={i}
      ></Item>
    );
  }

  return <div>
    <h1 className='font-bold text-xl ml-5'>Favourites</h1>
    <div className="flex flex-col items-center gap-2">
        {elements}
      </div>
  </div>;
};
