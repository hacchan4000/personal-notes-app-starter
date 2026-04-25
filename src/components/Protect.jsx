import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const Protect = ({ children }) => {
  const token = localStorage.getItem('AccessToken')

  if (!token) { // ini untuk block akses dr login ke home tanpa akses token
    return <Navigate to={"/"} replace/>
  }
  
  return children
}

export default Protect