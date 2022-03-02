import React, { useState } from "react";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";

import { firestore } from "../api/firebase";

export const Item = (props) => {
  const thisDoc = doc(firestore, "items", props.id);

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(props.text);
  const [done, setDone] = useState(props.done);
  const [dueTo, setDueTo] = useState(props.dueTo);
  const [createdAt, setCreatedAt] = useState(props.createdAt);
  const [categoryName, setCategoryName] = useState(props.categoryName);

  function toggleedit() {
    setEdit((prevEdit) => !prevEdit);
  }

  async function toggleDone() {
    setDone((prevDone) => !prevDone);
    const newFileds = { done: !done };
    await updateDoc(thisDoc, newFileds);
  }

  async function save() {
    setEdit((prevEdit) => !prevEdit);
    const newFileds = { text: text, dueTo: dueTo };
    await updateDoc(thisDoc, newFileds);
  }

  async function deleteItem() {
    await deleteDoc(thisDoc);
  }

  if (!edit) {
    return (
      <div className="bg-slate-300 w-11/12 p-2 rounded-lg flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            className="h-5 w-5 "
            checked={done}
            onChange={toggleDone}
          />
          <div className="mr-2 text-lg">{text}</div>
        </div>
        <button onClick={toggleedit}>
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </div>
    );
  } else {
    return (
      <div className="bg-slate-300 w-11/12 p-2 rounded-lg flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-1  w-full">
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
            placeholder="update"
            value={text}
            className="w-full mr-2 p-1 bg-white h-6 rounded text-lg"
          />
        </div>

        <div className="flex items-center">
          <button onClick={deleteItem}>
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
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
  }
};
