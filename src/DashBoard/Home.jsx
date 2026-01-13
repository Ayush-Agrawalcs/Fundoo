import React from 'react'
import Header from '../Components/Header'
import Drawer from '../Components/Drawer'
import { DrawerProvider } from '../Components/DrawerContext'

function Home() {
  return (
    <div>
     <DrawerProvider>
      <Header />
      <Drawer />
    </DrawerProvider> 
    </div>
  )
}

export default Home
