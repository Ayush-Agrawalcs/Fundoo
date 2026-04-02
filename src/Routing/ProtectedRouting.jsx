import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRouting({ children }) {
    const store = JSON.parse(localStorage.getItem('user'));
    return store ? children : <Navigate to='/signin' />
}

export default ProtectedRouting
