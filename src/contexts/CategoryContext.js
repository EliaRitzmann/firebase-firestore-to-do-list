import { createContext, useContext, useEffect, useState } from "react";

//Create Context
const categoryContext = createContext();

export function useCategory(){
    return useContext(categoryContext);
}

export const CategoryContextProvider = ({children}) => {
    
    
    const [categoryObject, setCategoryObject] = useState()
    

    function changeCategoryObject(categoryObject){
        setCategoryObject(categoryObject)
    }


    const value = {
        categoryObject,
        changeCategoryObject
    }


  return (
    <categoryContext.Provider value={value}>     
            {children}
        </categoryContext.Provider>
  )
}