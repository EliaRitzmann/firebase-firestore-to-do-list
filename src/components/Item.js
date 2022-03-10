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
  const [favourite, setfavourite] = useState(props.favourite);
  const [categoryId, setCategoryId] = useState(props.categoryId);
  
  console.log(categoryId)
  
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      save()
    }
  }

  async function deleteItem() {
    await deleteDoc(thisDoc);
  }

  async function toggleFavourite() {
    setfavourite((prevFavourite) => !prevFavourite);
    const newFileds = { favourite: !favourite};
    await updateDoc(thisDoc, newFileds);
  }

  function isfavourite() {
    if (!favourite) {
      return (
        <button onClick={toggleFavourite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      );
    } else {
      return (
        <button onClick={toggleFavourite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      );
    }
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
          <div className="mr-2 text-lg w-64 sm:w-fit overflow-hidden">{text}</div>
        </div>
        <div className="flex items-center justify-end gap-1">
          {isfavourite()}
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
            onKeyDown={handleKeyDown}
            type="text"
            maxLength={120}
            placeholder="update"
            value={text}
            className="w-full mr-2 bg-white h-6 rounded text-lg"
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
