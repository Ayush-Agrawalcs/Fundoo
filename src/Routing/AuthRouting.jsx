import React from 'react'
import { Navigate } from 'react-router-dom'

function AuthRouting({children}) {
    const store=JSON.parse(localStorage.getItem('user'));
    if(store==null){
        return children
    }
  return <Navigate to="/"/>
}

export default AuthRouting
