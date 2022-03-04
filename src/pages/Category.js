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
import { useNavigate } from "react-router-dom";
import { AddItem } from "../components/AddItem";

export const Category = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [items, setItems] = useState([]);

  const itemsRef = query(
    collection(firestore, "items"),
    where("userId", "==", user.uid),
    where("categoryName", "==", localStorage.getItem("categoryName"))
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

  async function deleteCategory() {
    if(window.confirm("Do you really want to delete this category?")){
      await deleteDoc(
        doc(firestore, "category", localStorage.getItem("categoryId"))
      );
      navigate("/");
    }
    
  }

  return (
    <div className="h-screen">
      <h1 className="font-bold text-xl ml-5 mb-1">
        {localStorage.getItem("categoryName")}
      </h1>
      <div className="flex flex-col items-center gap-2">
        {elements}

        <AddItem categoryName={localStorage.getItem("categoryName")}></AddItem>

        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold rounded py-2 px-4 mt-1"
          onClick={deleteCategory}
        >
          delete category
        </button>
      </div>
    </div>
  );
};
