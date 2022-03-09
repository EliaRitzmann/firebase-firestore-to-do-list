import React from 'react'

//Firestore
import {
  
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../api/firebase";
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../contexts/FirestoreContext';



export const DeleteCategoryButton = () => {
  const navigate = useNavigate()
  const {items} = useDatabase()

  async function deleteCategory() {
    if(window.confirm("Do you really want to delete this category?")){
      await deleteDoc(
        doc(firestore, "category", localStorage.getItem("categoryId"))
      );
      navigate("/");

      for(var i = 0; i < items.length; i++){
        if(items[i].categoryName == localStorage.getItem("categoryName")){
          console.log(items[i].id)
          await deleteDoc(doc(firestore, "items", items[i].id))
        }
      }

    }
  }
  return (
    <button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded py-2 px-4 mt-1" onClick={deleteCategory}>
      delete category
    </button>
  )
}
