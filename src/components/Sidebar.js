import React, { useState } from "react";

import { AddCategory } from "./category/AddCategory";
import { CategoryElement } from "./category/CategoryElement";
import { getIcons } from "../icons/Icons";
import { useNavigate } from "react-router-dom";

import { useDatabase } from "../contexts/FirestoreContext";

export const Sidebar = (props) => {
  const navigate = useNavigate();

  const { categorys } = useDatabase();
  const elements = [];

  for (var i = 0; i < categorys.length; i++) {
    elements.push(
      <CategoryElement
        category={categorys[i]}
        key={i}
        showSidebar={props.showSidebar}
      ></CategoryElement>
    );
  }

  function btn_home() {
    navigate("/");
    props.showSidebar();
  }

  function btn_fav() {
    navigate("/favourites");
    props.showSidebar();
  }

  function btn_all() {
    navigate("/all");
    props.showSidebar();
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={btn_home}
        className="inline-flex w-4/5 h-10 items-center justify-between rounded-lg px-2 bg-white shadow shadow-gray-400"
      >
        <div className="flex gap-2">
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="font-semibold">Home</span>
        </div>
      </button>

      <button
        onClick={btn_all}
        className="inline-flex w-4/5 h-10 items-center justify-between rounded-lg px-2 bg-white shadow shadow-gray-400"
      >
        <div className="flex gap-2">
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <span className="font-semibold">All</span>
        </div>
      </button>
      <button
        onClick={btn_fav}
        className="inline-flex w-4/5 h-10 items-center justify-between rounded-lg px-2 bg-white shadow shadow-gray-400"
      >
        <div className="flex gap-2">
          {getIcons("heart", "black", "small")}
          <span className="font-semibold">Favourites</span>
        </div>
      </button>
      <h1 className="font-semibold ">Categories</h1>
      {elements}
      <AddCategory></AddCategory>
      <div className="absolute bottom-0 flex flex-col items-center justify-center mb-1">
        <h1 className="text-sm ">made by Elia Ritzmann</h1>
        <a
          href="https://github.com/EliaRitzmann/firebase-firestore-to-do-list"
          className="text-sm "
        >
          Git Hub
        </a>
      </div>
    </div>
  );
};
