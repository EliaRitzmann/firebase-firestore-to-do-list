import { createContext, useContext, useEffect, useState } from "react";

//Create Context
const categoryContext = createContext();

export function useCategory(){
    return useContext(categoryContext);
}

export const CategoryContextProvider = ({children}) => {
    
    
    const [categoryName, setCategoryName] = useState()
    const [categoryId, setCategoryId] = useState()
    

    function changeCategoryName(categoryName){
        setCategoryName(categoryName)
    }

    function changeCategoryId(categoryId){
        setCategoryId(categoryId)
    }

    
    


    const value = {
        categoryId,
        categoryName,
        changeCategoryId,
        changeCategoryName
    }


  return (
    <categoryContext.Provider value={value}>     
            {children}
        </categoryContext.Provider>
  )
}