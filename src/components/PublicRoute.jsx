import React from 'react'
import { Navigate } from 'react-router-dom'


const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  
    if (token) { // ini untuk block akses dr login ke home tanpa akses token
      return <Navigate to={"/home"} replace/>
    }
  return children
}

export default PublicRoute