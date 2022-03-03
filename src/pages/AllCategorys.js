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

export const AllCategorys = () => {
    const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  const toDoRef = query(
    collection(firestore, "items"),
    where("userId", "==", user.uid),
    where("done", "==", false)
  );

  const doneRef = query(
    collection(firestore, "items"),
    where("userId", "==", user.uid),
    where("done", "==", true)
  );

  useEffect(
    () =>
      onSnapshot(toDoRef, (snapshot) => {
        setItems([]);
        setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );
  useEffect(
    () =>
      onSnapshot(doneRef, (snapshot) => {
        setDoneItems([]);
        setDoneItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );

  const elements = [];
  if(items.length == 0){
    elements.push(<h1 >You have done all tasks :)</h1>)
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

  const doneElements = [];

  if(doneItems.length == 0){
    doneElements.push(<h1 >check some tasks</h1>)
  }
  for (var i = 0; i < doneItems.length; i++) {
    doneElements.push(
      <Item
        text={doneItems[i].text}
        favourite={doneItems[i].favourite}
        done={doneItems[i].done}
        dueTo={doneItems[i].dueTo}
        createdAt={doneItems[i].createdAt}
        CategoryName={doneItems[i].CategoryName}
        id={doneItems[i].id}
        key={i}
      ></Item>
    );
  }

  return <div className="flex flex-col gap-1">
    <h1 className='font-bold text-xl ml-5'>To do</h1>
    <div className="flex flex-col items-center gap-2">
        {elements}
      </div>
      <h1 className='font-bold text-xl ml-5'>Done</h1>
    <div className="flex flex-col items-center gap-2">
        {doneElements}
      </div>
  </div>;
};
