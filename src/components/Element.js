import React, { useState } from 'react';

export const Element = (props) => {
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(props.item.text)
  const [time, setTime] = useState(props.item.time)
  const [done, setDone] = useState(props.item.done)

  function style() {
    if (!done) {
      return ("px-2")
    } else {
      return ("line-through px-2")
    }
  }

  function checkme() {
    setDone(prevDone => !prevDone)
  }

  function change() {
    setEdit(prevEdit => !prevEdit)
    console.log("change")
  }

  function save() {
    setEdit(prevEdit => !prevEdit)
    console.log("save")
  }

  return <div className='flex justify-between w-96 px-4 py-2 items-center'>
    {edit ? <input type="text" value={text} required onChange={event => setText(event.target.value)} className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-60 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'></input>
    : 
    <button className={style()} onClick={checkme}>{text}</button>
    }
    
    <div>
      {edit ?
        <button onClick={change} class="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-green-500 rounded-lg focus:shadow-outline hover:bg-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button> :

        <button onClick={save} class="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-sky-500 rounded-lg focus:shadow-outline hover:bg-sky-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      }

      <button class="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-red-500 rounded-lg focus:shadow-outline hover:bg-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>;
};