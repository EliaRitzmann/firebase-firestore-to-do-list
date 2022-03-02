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
    await deleteDoc(
      doc(firestore, "category", localStorage.getItem("categoryId"))
    );
    navigate("/");
  }

  return (
    <div className="h-screen">
      <h1 className="font-bold text-xl ml-5">
        {localStorage.getItem("categoryName")}
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center"></div>
        {elements}

        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold rounded py-2 px-4"
          onClick={deleteCategory}
        >
          delete category
        </button>
      </div>
    </div>
  );
};
