import React, { useEffect, useState } from "react";

import { Item } from "../components/Item";
import { AddItem } from "../components/AddItem";

import { useDatabase } from "../contexts/FirestoreContext";
import { DeleteCategoryButton } from "../components/DeleteCategoryButton";
import { useCategory } from "../contexts/CategoryContext";
import { useNavigate } from "react-router-dom";

export const Category = () => {
  const navigate = useNavigate();
  const { items } = useDatabase();
  const { categoryName, categoryId } = useCategory();


  if (categoryId == null) {
    navigate("/");
  }
  console.log(categoryName);
  console.log(categoryId);

  const specificItems = [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].categoryId == categoryId) {
          specificItems.push(items[i]);
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
            categoryId={specificItems[i].categoryId}
            id={specificItems[i].id}
            key={i}
          ></Item>
        );
      }
  
      
      
      //sort done 
      elements.sort((a, b) => a.props.done - b.props.done)
  return (
    <div>
      <h1 className="font-bold text-xl ml-5 mb-1">{categoryName}</h1>
      <div className="flex flex-col items-center gap-2">
        {elements}

        <AddItem categoryId={categoryId}></AddItem>

        <DeleteCategoryButton></DeleteCategoryButton>
      </div>
    </div>
  );
};
