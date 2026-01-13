import React from 'react'
import Header from '../Components/Header'
import Drawer from '../Components/Drawer'
import { DrawerProvider } from '../Components/DrawerContext'
import Note from '../Components/Note'

function Home() {
  return (
    <>
     <DrawerProvider>
      <Header />
      <Drawer />
    </DrawerProvider> 
     <Note />
    </>
  )
}

export default Home
