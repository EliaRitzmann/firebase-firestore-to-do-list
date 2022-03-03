import React, { useState } from "react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { firestore } from "../api/firebase";

import { useAuth } from "../contexts/FirebaseContext";

export const AddItem = (props) => {
  const [text, setText] = useState("new task");
  const [done, setDone] = useState(false);
  const [dueTo, setDueTo] = useState("");
  const [createdAt, setCreatedAt] = useState(serverTimestamp());
  const [categoryName, setCategoryName] = useState(props.categoryName);

  const { user } = useAuth();

  const colRef = collection(firestore, "items");

  async function save() {
    await addDoc(colRef, {
      userId: user.uid,
      text: text,
      favourite: false,
      done: done,
      categoryName: categoryName,
      dueTo: dueTo,
      createdAt: createdAt,
    });
  }

  async function toggleDone() {
    setDone((prevDone) => !prevDone);
  }

  return (
    <div className="bg-slate-300 w-11/12 p-2 rounded-lg flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-1 w-full">
        <input
          type="checkbox"
          className="h-5 w-5 text-green-600"
          checked={done}
          onChange={toggleDone}
        />
        <input
          onChange={(event) => setText(event.target.value)}
          type="text"
          maxLength={120}
          placeholder="new task"
          className="w-full mr-2 bg-white h-6 rounded text-lg"
        />
      </div>

      <div className="flex items-center">
        <button onClick={save}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
