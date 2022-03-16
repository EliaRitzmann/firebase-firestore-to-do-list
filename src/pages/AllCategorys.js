import React from "react";
import { UseGetCategory } from "../components/category/UseGetCategory";

import { Item } from "../components/item/Item";
import { useDatabase } from "../contexts/FirestoreContext";

export const AllCategorys = () => {
  const { items } = useDatabase();
  
  const toDoItems = [];
  const doneItems = [];

  for (var i = 0; i < items.length; i++) {
    if (items[i].done == true) {
      doneItems.push(items[i]);
    } else {
      toDoItems.push(items[i]);
    }
  }

  const elements = [];
  if (toDoItems.length == 0) {
    elements.push(<h1 key={1}>You have done all tasks :)</h1>);
  }
  for (var i = 0; i < toDoItems.length; i++) {
    const category = UseGetCategory(toDoItems[i].categoryId)
    elements.push(
      <Item
        text={toDoItems[i].text}
        favourite={toDoItems[i].favourite}
        done={toDoItems[i].done}
        createdAt={toDoItems[i].createdAt}
        categoryName={category?.name}
        id={toDoItems[i].id}
        key={i}
      ></Item>
    );
  }

  const doneElements = [];

  if (doneItems.length == 0) {
    doneElements.push(<h1 key={1}>check some tasks</h1>);
  }
  for (var i = 0; i < doneItems.length; i++) {
    const category = UseGetCategory(doneItems[i].categoryId)
    doneElements.push(
      <Item
        text={doneItems[i].text}
        favourite={doneItems[i].favourite}
        done={doneItems[i].done}
        createdAt={doneItems[i].createdAt}
        categoryName={category?.name}
        id={doneItems[i].id}
        key={i}
      ></Item>
    );
  }

  return (
    <div className="mx-5">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl">All</h1>
        </div>
        </div>
      
      <div className="flex flex-col items-center gap-2">{elements}</div>
      <h1 className="font-bold text-2xl ">Done</h1>
      <div className="flex flex-col items-center gap-2">{doneElements}</div>
    </div>
  );
};
