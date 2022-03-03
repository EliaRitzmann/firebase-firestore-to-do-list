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

export const Favourites = () => {
  const { user } = useAuth();

  const [items, setItems] = useState([]);

  const itemsRef = query(
    collection(firestore, "items"),
    where("userId", "==", user.uid),
    where("favourite", "==", true)
  );

  useEffect(
    () =>
      onSnapshot(itemsRef, (snapshot) => {
        setItems([]);
        setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );

  const elements = [];
  if(items.length == 0){
    elements.push(<h1 >There are no favourites yet </h1>)
  }
  for (var i = 0; i < items.length; i++) {
    elements.push(
      <Item
        text={items[i].text}
        favourite={items[i].favourite}
        done={items[i].done}
        dueTo={items[i].dueTo}
        createdAt={items[i].createdAt}
        CategoryName={items[i].CategoryName}
        id={items[i].id}
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
