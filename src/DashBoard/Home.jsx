import React from 'react'
import Header from '../Components/Header'
import Drawer from '../Components/Drawer'
import { DrawerProvider } from '../Components/DrawerContext'
import Note from '../Components/Note'
import Poper from '../Components/Poper'
import Edit from '../Components/Edit'
import Trash from '../Components/Trash'
import Archive from '../Components/Archive'
import { Outlet } from 'react-router-dom'


function Home() {
  return (
    <>
     <DrawerProvider>
      <Header />
      <Drawer />
      <Outlet/>
    </DrawerProvider> 

    </>
  )
}

export default Home
