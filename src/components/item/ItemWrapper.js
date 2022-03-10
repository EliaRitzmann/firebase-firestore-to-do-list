import React from 'react'

export const ItemWrapper = ({children}) => {
  return (
    <div className='bg-white w-full p-2 rounded-lg flex items-center justify-between min-h-11'>{children}</div>
  )
}
