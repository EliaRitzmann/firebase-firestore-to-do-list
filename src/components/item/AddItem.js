import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../api/firebase";
import { useAuth } from "../../contexts/FirebaseContext";

export const AddItem = (props) => {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const [dueTo, setDueTo] = useState("");
  const [createdAt, setCreatedAt] = useState(serverTimestamp());
  const [focus, setFocus] = useState(false);
  const { user } = useAuth();

  const colRef = collection(firestore, "items");

  async function save() {
    await addDoc(colRef, {
      userId: user.uid,
      text: text,
      favourite: false,
      done: done,
      categoryId: props.categoryId,
      dueTo: dueTo,
      createdAt: createdAt,
    });
    setText("");
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.target.blur();
      save();
    }
  };

  function blura() {
    setText("");
    setFocus(false);
  }

  function toggleFocus() {
    setFocus((prevFocus) => !prevFocus);
  }

  function backgroundColor() {
    if (focus) {
      return "bg-white p-2 rounded-lg flex items-center justify-between w-full";
    } else {
      return "bg-neutral-300 p-2 rounded-lg flex items-center justify-between w-full";
    }
  }

  return (
    <div className={backgroundColor()}>
      <input
        className="bg-transparent w-full border-transparent focus:border-transparent focus:ring-0 p-0.5 mx-2 "
        type="text"
        value={text}
        placeholder="Write a new task"
        onFocus={toggleFocus}
        onBlur={blura}
        onKeyDown={handleKeyDown}
        onChange={(event) => setText(event.target.value)}
        maxLength={30}
      />
      {focus && (
        <div className="flex gap-1">
          
          <h1 className="bg-stone-200 h-7 rounded-md px-1" onMouseDown={save}>
            Add
          </h1>{" "}
        </div>
      )}
    </div>
  );
};
