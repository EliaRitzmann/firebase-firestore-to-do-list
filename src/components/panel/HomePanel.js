import React from 'react';
import { getIcons } from '../../icons/Icons';

//Navigation
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../../contexts/CategoryContext';

export const HomePanel = (props) => {
  const navigate = useNavigate();
  const {changeCategoryName, changeCategoryId} = useCategory()

  function color(color){
    var out = "bg-gradient-to-br h-32 rounded-xl shadow shadow-slate-400"
    switch (color) {
      case "black":
          return out += " from-pink-500 to-yellow-400"
      case "red":
        return out += " from-red-500 to-red-100"
      case "sky":
        return out += " from-sky-500 to-sky-100"
      case "lime":
        return out += " from-lime-500 to-lime-100"
      case "green":
        return out += " from-green-500 to-green-100"
      case "teal":
        return out += " from-teal-500 to-teal-100"
      case "violet":
        return out += " from-violet-500 to-violet-100"
      case "pink":
        return out += " from-pink-500 to-pink-100"
      case "white":
        return out += " from-green-400 to-blue-500"
  }
}



function open(){
  changeCategoryName(props.name)
  changeCategoryId(props.id)
  navigate(props.link)
}

  return <div onClick={open} className={color(props.color)} >
    <div className='flex gap-1 p-2 items-center'>
    <div>{getIcons(props.icon, "white", "big")}</div>
    <h1 className='text-white font-semibold text-lg'>{props.name}</h1>
    </div>
  </div>;
};



