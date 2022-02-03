import React, { useState } from 'react';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  function show(){
    setIsOpen(true)
  }
  
};
