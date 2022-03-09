import React, { useState } from "react";

//Firebase Auth
import { useAuth } from "../contexts/FirebaseContext";
import { Sidebar } from "./Sidebar";

export const Navbar = () => {
  //Firebase
  const { user, logOut } = useAuth();
  function handleLogOut() {
    try {
      logOut();
    } catch (error) {
      console.log(error);
    }
  }

  //Sidebar
  const [sidebar, setSidebar] = useState(false);

  function showSidebar() {
    setSidebar((prevSidebar) => !prevSidebar);
  }

  //Date
  const d = new Date();
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "May",
    "Juni",
    "July",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  const date = d.getDate() + ". " + months[d.getMonth()];

  return (
    <nav className="">
      {/* Navbar */}
      <div className=" flex justify-between items-center mx-auto p-4 h-16">
        <div className="flex items-center md:w-52">
          <button onClick={showSidebar}>
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
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center">
          <h1 className="font-semibold text-base">{date}</h1>
        </div>

        <div className="flex justify-end items-center gap-2 md:w-52">
          <h1 className="md:block hidden">{user.displayName}</h1>

          <button onClick={handleLogOut}>
            {user.photoURL ? (
              <img
                className="h-10 w-10 rounded-full"
                referrerPolicy="no-referrer"
                src={user.photoURL}
                alt="Profile Picture"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <button className={
            sidebar
              ? "h-full w-full  fixed"
              : "left-full fixed"
          } onClick={showSidebar}>.</button>
        <div
          className={
            sidebar
              ? "h-full w-9/12 sm:w-72 fixed top-0 rounded-r-xl shadow-black shadow-md backdrop-blur-3xl"
              : "left-full fixed"
          }
        >
          <div className="flex items-center justify-between p-4 h-16">
            <h1 className="ml-4 font-bold font-mono text-lg">To do List</h1>
            <button onClick={showSidebar}>
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
          <Sidebar showSidebar={showSidebar}></Sidebar>
        </div>
      </div>
    </nav>
  );
};
