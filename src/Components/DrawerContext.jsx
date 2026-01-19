import React,{ createContext, useContext, useState } from 'react'

const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {
  const [open, setOpen] = useState(true)
   const [click,setclick]= React.useState(true);
      const handlepattern=()=>{
     setclick(prev=>!prev)
    }

  const toggleDrawer = () => {
    setOpen(prev => !prev)
  }

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer,click,handlepattern }}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  return useContext(DrawerContext)
}
