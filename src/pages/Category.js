import React, { useEffect, useState } from "react";

import { Item } from "../components/item/Item";
import { AddItem } from "../components/item/AddItem";

import { useDatabase } from "../contexts/FirestoreContext";
import { DeleteCategoryButton } from "../components/category/DeleteCategoryButton";
import { useCategory } from "../contexts/CategoryContext";
import { useNavigate } from "react-router-dom";
import { ItemWrapper } from "../components/item/ItemWrapper";
import { getIcons } from "../icons/Icons";



export const Category = () => {
  const navigate = useNavigate();
  const { items } = useDatabase();
  const { categoryObject } = useCategory();

  if (!categoryObject) {
    navigate("/");
  }

  const specificItems = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].categoryId == categoryObject?.id) {
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
        createdAt={specificItems[i].createdAt}
        categoryObject={categoryObject}
        id={specificItems[i].id}
        key={i}
      ></Item>
    
    );
  }

  

  //sort done
  elements.sort((a, b) => a.props.done - b.props.done);
  return (<div className="mx-5">
  <div className="flex justify-between items-center mb-2">
    <div className="flex items-center">
      <h1 className="font-bold text-2xl">{categoryObject?.name}</h1>
    </div>
    
  </div>
  <div className="flex flex-col items-center gap-2">
    {elements}
    <AddItem categoryId={categoryObject?.id}></AddItem>
    <DeleteCategoryButton categoryId={categoryObject?.id}></DeleteCategoryButton>
  </div>
</div>
  );
};
