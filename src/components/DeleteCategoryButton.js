import React from 'react'

//Firestore
import {
  
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../api/firebase";
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../contexts/FirestoreContext';
import { useCategory } from '../contexts/CategoryContext';



export const DeleteCategoryButton = () => {
  const navigate = useNavigate()
  const {items} = useDatabase()
  const {categoryName, categoryId} = useCategory()

  async function deleteCategory() {
    if(window.confirm("Do you really want to delete this category?")){
      await deleteDoc(
        doc(firestore, "category", categoryId)
      );

      for(var i = 0; i < items.length; i++){
        if(items[i].categoryId == categoryId){
          console.log(items[i].id)
          await deleteDoc(doc(firestore, "items", items[i].id))
        }
      }

      navigate("/");
    }
  }
  return (
    <button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded py-2 px-4 mt-1" onClick={deleteCategory}>
      delete category
    </button>
  )
}
