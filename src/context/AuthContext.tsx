import React, { ReactNode, useState } from 'react'
import { Login } from '../utils/services';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps{
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
}
export const AuthContext = React.createContext<AuthContextProps | null>(null)

export const AuthProvider = ( { children }: { children: ReactNode }) => {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)

  const login = async (email: string, pass: string) => {
    try {
      setLoading(true)
      const response = await Login({email, pass})

      if (response.error) {
        alert(response.message || 'login failed')
        return
      }
      const token = response.data.accessToken 

      if (token) {
        localStorage.setItem('token', token)
        nav('/home')
      } else {
        alert('token g ketemu')
      }
      
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.setItem('tokenLogOut', Date.now().toString())
    nav('/')
  }

  const getToken = ():string | null=> {
    return localStorage.getItem('token')
  }
  
  return (
    <AuthContext.Provider value={{loading, login, logout, getToken}}>
      {children}
    </AuthContext.Provider>
  )
}

