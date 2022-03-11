import React, { useState } from "react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { firestore } from "../../api/firebase";

import { useAuth } from "../../contexts/FirebaseContext";
import { ItemWrapper } from "./ItemWrapper";

export const AddItem = (props) => {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const [dueTo, setDueTo] = useState("");
  const [createdAt, setCreatedAt] = useState(serverTimestamp());

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
      save();
    }
  };

  async function toggleDone() {
    setDone((prevDone) => !prevDone);
  }

  return (
    <div className="bg-white p-2 rounded-lg flex items-center justify-between min-h-11 absolute bottom-10 w-1/2 left-1/4 ">
      <input className="" type={text}/>
      </div>
  );
};
