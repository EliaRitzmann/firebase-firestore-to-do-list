import React, { useEffect, useState } from "react";
import { Item } from "../components/Item";
import { useDatabase } from "../contexts/FirestoreContext";

export const Favourites = () => {
  
  const {items} = useDatabase()

  //sort Items to category
  const favourteItems = [];
  for(var i = 0; i  < items.length; i++){
    if(items[i].favourite == true){
      favourteItems.push(items[i])
    }
  }

  const elements = [];
  if(favourteItems.length == 0){
    elements.push(<h1 key={1}>There are no favourites yet </h1>)
  }
  for (var i = 0; i < favourteItems.length; i++) {
    elements.push(
      <Item
        text={favourteItems[i].text}
        favourite={favourteItems[i].favourite}
        done={favourteItems[i].done}
        dueTo={favourteItems[i].dueTo}
        createdAt={favourteItems[i].createdAt}
        id={favourteItems[i].id}
        key={i}
      ></Item>
    );
  }

  //sort done 
  elements.sort((a, b) => a.props.done - b.props.done)

  return <div className="mx-5">
    <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl">Favourites</h1>
        </div>
        </div>
    <div className="flex flex-col items-center gap-2">
        {elements}
      </div>
  </div>;
};
