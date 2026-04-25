import React, { ReactNode, useState } from 'react'
import { getUserLogged, Login } from '../utils/services';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps{
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  user?: any
}
export const AuthContext = React.createContext<AuthContextProps | null>(null)

export const AuthProvider = ( { children }: { children: ReactNode }) => {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
        localStorage.setItem('AccessToken', token)
        const myUser = await getUserLogged()
        if (!myUser.error) {
          setUser(myUser.data)
        }
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
    localStorage.removeItem("AccessToken")
    localStorage.setItem('tokenLogOut', Date.now().toString())
    nav('/')
  }

  const getToken = ():string | null=> {
    return localStorage.getItem('AccessToken')
  }
  
  return (
    <AuthContext.Provider value={{loading, login, logout, getToken, user}}>
      {children}
    </AuthContext.Provider>
  )
}

