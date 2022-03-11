import React, { useState } from "react";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";

import { firestore } from "../../api/firebase";
import { Heart } from "./Heart";
import { ItemWrapper } from "./ItemWrapper";

export const Item = (props) => {
  const thisDoc = doc(firestore, "items", props.id);

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(props.text);
  const [done, setDone] = useState(props.done);
  const [dueTo, setDueTo] = useState(props.dueTo);
  const [createdAt, setCreatedAt] = useState(props.createdAt);
  const [categoryId, setCategoryId] = useState(props.categoryId);

  async function toggleDone() {
    setDone((prevDone) => !prevDone);
    const newFileds = { done: !done };
    await updateDoc(thisDoc, newFileds);
  }

  function toggleEdit(){
      setEdit(true)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.target.blur()
        save()
    }
  }

  async function save() {
    setEdit(false)
    //only update databse when text has changed
    if(text != props.text){
      const newFileds = { text: text, dueTo: dueTo };
      await updateDoc(thisDoc, newFileds);
    }
  }

  async function deleteItem() {
    console.log("delete")
    await deleteDoc(thisDoc);
  }

  //date
  const date = createdAt?.toDate()

  return (<ItemWrapper className="w-full">
    <div className="w-full">
    <div className="flex items-center justify-between w-full h-8">
      <input
        type="checkbox"
        checked={done}
        onChange={toggleDone}
        
        className="w-6 h-6 text-lime-400 rounded-md focus:ring-0 focus:ring-offset-0 border-none bg-stone-200"
      />
        <input className="w-full mx-2 rounded-md border-transparent focus:border-transparent focus:ring-0 h-6 p-0.5" 
        type="text"
        onFocus={toggleEdit}
        onBlur={save}
        onKeyDown={handleKeyDown}
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={30}
        placeholder="task"
            ></input>
        {edit ? <button className="bg-stone-200 h-7 px-1 rounded-md" onMouseDown={deleteItem}>Delete</button> : <Heart itemId={props.id} isFavourite={props.favourite}/>}
        
    </div>
    {edit && <div className="flex justify-between ">
        <h1 className="text-xs text-stone-300 font-semibold">created: {date.toISOString().split('T')[0]}</h1>
        <h1 className="text-xs text-stone-300 font-semibold">due to:{dueTo}</h1>
    </div>}
    
    </div>
      
  </ItemWrapper>
  );
};
