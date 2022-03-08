import React from "react";

//Firestore
import {
  
  doc,
  deleteDoc,
} from "firebase/firestore";


import { firestore } from "../api/firebase";
import { Item } from "../components/Item";
import { useNavigate } from "react-router-dom";
import { AddItem } from "../components/AddItem";

import { useDatabase } from "../contexts/FirestoreContext";

export const Category = () => {
  const navigate = useNavigate();

  const {items} = useDatabase()

  const specificItems = [];

  for(var i = 0; i < items.length; i++){
    if(items[i].categoryName == localStorage.getItem("categoryName")){
      specificItems.push(items[i])
    }
  }

  const elements = [];

  for (var i = 0; i < specificItems.length; i++) {
    elements.push(
      <Item
        text={specificItems[i].text}
        favourite={specificItems[i].favourite}
        done={specificItems[i].done}
        dueTo={specificItems[i].dueTo}
        createdAt={specificItems[i].createdAt}
        CategoryName={specificItems[i].CategoryName}
        id={specificItems[i].id}
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
