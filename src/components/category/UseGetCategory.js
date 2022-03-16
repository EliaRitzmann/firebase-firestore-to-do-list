import React from 'react'
import { useCategory } from '../../contexts/CategoryContext'
import { useDatabase } from '../../contexts/FirestoreContext'

export const UseGetCategory = (categoryId) => {
  const {categorys} = useDatabase()
  console.log(categorys)
  for(var i = 0; i < categorys.length; i++){
      if(categorys[i].id == categoryId){
          return categorys[i]
      }
  }
}
