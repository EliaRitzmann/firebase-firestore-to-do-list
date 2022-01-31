import React from 'react';

export const Element = (props) => {
  return <div className='flex '>
      <h1 className='text-green-700 '>{props.item.text}</h1>
      <h2></h2>
      <button>save</button>
      <button>delete</button>
  </div>;
};
