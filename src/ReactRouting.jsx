import React from 'react'
import {Route,Routes} from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn.jsx'
import Signup from './Pages/Signup/Signup.jsx'
import Home from './DashBoard/Home.jsx'


function ReactRouting() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
  )
}

export default ReactRouting
