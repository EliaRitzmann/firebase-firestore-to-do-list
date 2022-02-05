import React from 'react';
import { getIcons } from '../icons/Icons';
import { useNavigate } from 'react-router-dom';

export const CategoryElement = (props) => {
  const navigate = useNavigate();
  function open(){
    localStorage.setItem("categoryName", props.item.name)
    navigate("/category")
  }
  return <button onClick={open} className='inline-flex w-4/5 h-10 items-center justify-between rounded-lg px-2 bg-white hover:shadow'>
  <div className='flex gap-2'>
    {getIcons(props.item.icon, props.item.color)}
    <span className='font-semibold'>{props.item.name}</span>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
</svg>
</button>;
};
