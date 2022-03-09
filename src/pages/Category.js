import React from "react";

import { Item } from "../components/Item";
import { AddItem } from "../components/AddItem";

import { useDatabase } from "../contexts/FirestoreContext";
import { DeleteCategoryButton } from "../components/DeleteCategoryButton";

export const Category = () => {

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

  return (
    <div>
      <h1 className="font-bold text-xl ml-5 mb-1">
        {localStorage.getItem("categoryName")}
      </h1>
      <div className="flex flex-col items-center gap-2">
        {elements}

        <AddItem categoryName={localStorage.getItem("categoryName")}></AddItem>

        <DeleteCategoryButton>

        </DeleteCategoryButton>
      </div>
    </div>
  );
};
