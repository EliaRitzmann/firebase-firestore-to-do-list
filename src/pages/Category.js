import React, { useEffect } from "react";

import { Item } from "../components/Item";
import { AddItem } from "../components/AddItem";

import { useDatabase } from "../contexts/FirestoreContext";
import { DeleteCategoryButton } from "../components/DeleteCategoryButton";
import { useCategory } from "../contexts/CategoryContext";


export const Category = () => {
  
  const {items} = useDatabase()
  const {categoryName, categoryId} = useCategory()
  
  useEffect(() => {
    
  
  }, [])
  

  const specificItems = [];

  for(var i = 0; i < items.length; i++){
    if(items[i].categoryId == categoryId){
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
        id={specificItems[i].id}
        key={i}
      ></Item>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-xl ml-5 mb-1">
        {categoryName}
      </h1>
      <div className="flex flex-col items-center gap-2">
        {elements}

        <AddItem categoryId={categoryId}></AddItem>

        <DeleteCategoryButton>

        </DeleteCategoryButton>
      </div>
    </div>
  );
};
