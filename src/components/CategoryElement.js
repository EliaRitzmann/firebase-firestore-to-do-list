import React, { useState } from "react";
import { getIcons, iconName, colorName } from "../icons/Icons";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../api/firebase";

export const CategoryElement = (props) => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(props.item.name);
  const [icon, setIcon] = useState(props.item.icon);
  const [color, setColor] = useState(props.item.color);

  const thisDoc = doc(firestore, "category", props.item.id);

  function open() {
    localStorage.setItem("categoryName", props.item.name);
    localStorage.setItem("categoryId", props.item.id);
    navigate("/category");
    window.location.reload(false);
  }

  function toggleedit() {
    setEdit((prevEdit) => !prevEdit);
  }

  async function save() {
    setEdit((prevEdit) => !prevEdit);
    const newFileds = { name: name, icon: icon, color: color };
    await updateDoc(thisDoc, newFileds);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      save();
    }
  };

  const icons = [];
  var key = 0;
  for (let j = 0; j < colorName.length; j++) {
    key++;
    for (let i = 0; i < iconName.length; i++) {
      key++;
      icons.push(
        <button
          onClick={(e) => setIconAndColor(iconName[i], colorName[j])}
          key={key}
        >
          {getIcons(iconName[i], colorName[j], "small")}
        </button>
      );
    }
  }

  function setIconAndColor(a, b) {
    setShowModal(false);
    console.log(a);
    console.log(b);
    setIcon(a);
    setColor(b);
  }

  if (edit) {
    return (
      <div className="flex flex-col justify-center gap-2 w-4/5 h-10 rounded-lg px-2 bg-white shadow shadow-gray-400 ">
        <div className="inline-flex items-center justify-between">
          <div className="flex gap-2 ">
            <button onClick={(a) => setShowModal(true)}>
              {getIcons(icon, color, "small")}
            </button>
            <input
              onChange={(event) => setName(event.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              maxLength={12}
              placeholder="update"
              value={name}
              className=" w-full mr-2 p-1 bg-gray-300 h-6 rounded"
            />
          </div>
          <button onClick={save} className="bg-gray-300 rounded-md p-0.5 ">
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
          {showModal && (
            <div className="bg-black bg-opacity-50 absolute inset-0 w-screen flex justify-center items-center">
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-auto h-1/3 shadow-xl w-1/2">
                <div className="bg-gray-200 flex items-center justify-end">
                  <button onClick={(a) => setShowModal(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <div className="grid grid-cols-6 gap-2 p-2 sm:grid-cols-9">
                    {icons}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="inline-flex w-4/5 h-10 items-center justify-between rounded-lg px-2 bg-white shadow shadow-gray-400">
        <div className="flex gap-2 w-full" onClick={open}>
          {getIcons(icon, color, "small")}
          <span className="font-semibold">{name}</span>
        </div>
        <button className="bg-gray-300 rounded-md p-0.5" onClick={toggleedit}>
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    );
  }
};
