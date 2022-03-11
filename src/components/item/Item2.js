import React, { useState } from "react";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";

import { firestore } from "../../api/firebase";
import { Heart } from "./Heart";
import { ItemWrapper } from "./ItemWrapper";

export const Item2 = (props) => {
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

  return (<ItemWrapper className="w-full">
      <div className="flex items-center justify-between w-full">
      <input
        type="checkbox"
        checked={done}
        onChange={toggleDone}
            
            
        className="w-6 h-6 text-lime-400 rounded-md focus:ring-0 focus:ring-offset-0 border-none bg-stone-200"
      />
        <input className="w-full mx-2 focus:bg-stone-200 rounded-md border-transparent h-1/2 focus:border-transparent focus:ring-0 p-0.5 peer" 
        type="text"
        onFocus={toggleEdit}
        onBlur={save}
        onKeyDown={handleKeyDown}
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={120}
            placeholder="task"
            ></input>
        {edit ? <h1>delete</h1> : <Heart itemId={props.id} isFavourite={props.favourite}/>}
        
        
        
        
    </div>
    <div className="bg-green-500">
        
    </div>
  </ItemWrapper>
  );
};
