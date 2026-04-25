import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { getUserLogged } from '../utils/services';

const Header = () => {
  const lokasi = useLocation()
  
  const { bahasa, toggleBahasa } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()

  const [nama, setNama] = useState(null)
  useEffect(()=>{
    const fetchNama = async()=>{
      const res = await getUserLogged()
      if (!res.error) {
        setNama(res.data)
      }
    }
    fetchNama()
  },[])
  return (
    <header>
      <h1>
        <Link to="/home">{bahasa === 'id' ? 'Aplikasi Notes' : 'Notes App'}</Link>
      </h1>
      {lokasi.pathname !== '/' ? (
        <nav className='navigation'>
        <ul>
          <li>
            <Link to="/archives">{bahasa === 'id' ? 'Terarsip' : 'Archived'}</Link>
          </li>
        </ul>
      </nav>):''}
      
      <button className="toggle-locale" type="button" onClick={toggleBahasa}>
        <ion-icon name="language-outline"></ion-icon>
      </button>
      <button className="toggle-theme" type="button" onClick={toggleTheme}>
        <ion-icon name={theme ==='light'? "moon-outline":"sunny-outline"}></ion-icon>
      </button>
      {lokasi.pathname!=='/' ? (
        <button className="button-logout" type="button" onClick={logout}>
        <ion-icon size={"large"} name="log-out-outline"></ion-icon> {nama?.name}
      </button>
      ):''}
      
    </header>
  )
}

export default Header