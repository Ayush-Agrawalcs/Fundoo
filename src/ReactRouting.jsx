import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn.jsx'
import Signup from './Pages/Signup/Signup.jsx'
import Home from './DashBoard/Home.jsx'
import Note from './Components/Note.jsx'
import Trash from './Components/Trash.jsx'
import Archive from './Components/Archive.jsx'
import Edit from './Components/Edit.jsx'
import Reminder from './Components/Reminder.jsx'


function ReactRouting() {
  return (
    <Routes>

      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />


      <Route path="/" element={<Home />}>
        <Route index element={<Note />} />
        <Route path="trash" element={<Trash />} />
        <Route path="archive" element={<Archive />} />
        <Route path="edit_Labels" element={<Edit />} />
        <Route path="reminder" element={<Reminder />} />
      </Route>
    </Routes>
  )
}

export default ReactRouting
