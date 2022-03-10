import React, { useEffect, useState } from "react";

import { Item2 } from "../components/item/Item2";
import { AddItem } from "../components/item/AddItem";

import { useDatabase } from "../contexts/FirestoreContext";
import { DeleteCategoryButton } from "../components/category/DeleteCategoryButton";
import { useCategory } from "../contexts/CategoryContext";
import { useNavigate } from "react-router-dom";
import { ItemWrapper } from "../components/item/ItemWrapper";

export const Category = () => {
  const navigate = useNavigate();
  const { items } = useDatabase();
  const { categoryName, categoryId } = useCategory();

  if (categoryId == null) {
    navigate("/");
  }

  const specificItems = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].categoryId == categoryId) {
      specificItems.push(items[i]);
    }
  }

  const elements = [];
  for (var i = 0; i < specificItems.length; i++) {
    elements.push(<ItemWrapper>
        <Item2
        text={specificItems[i].text}
        favourite={specificItems[i].favourite}
        done={specificItems[i].done}
        dueTo={specificItems[i].dueTo}
        createdAt={specificItems[i].createdAt}
        categoryId={specificItems[i].categoryId}
        id={specificItems[i].id}
        key={i}
      ></Item2>
    </ItemWrapper>
      
    );
  }

  //sort done
  elements.sort((a, b) => a.props.done - b.props.done);
  return (
    <div className="mx-5 h-screen">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl">{categoryName}</h1>
        </div>
        
      </div>

      <div className="flex flex-col items-center gap-2">
        {elements}

        <AddItem categoryId={categoryId}></AddItem>

        <DeleteCategoryButton categoryId={categoryId}></DeleteCategoryButton>
      </div>
    </div>
  );
};
