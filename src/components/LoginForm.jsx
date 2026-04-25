import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'
import {LanguageContext} from '../context/LanguageContext'
import { useAuth } from '../hooks/useAuth'

const LoginForm = () => {
  const [email, handleEmail] = useInput('')
  const [pass, handlePass] = useInput('')
  const nav = useNavigate()
  const {loading, login} = useAuth()
  const { bahasa } = useContext(LanguageContext)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const res = await login(email,pass)
  }
  
  return (
    <section className='login-page'>
      <h2>{bahasa === 'id' ? 'Yuk, login untuk menggunakan aplikasi' : 'Login to use app, please.'}</h2>
      <div className='input-login'>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="text" id='email' value={email} onChange={handleEmail}/>
          <label htmlFor="email">Password</label>
          <input type="password" id='password' value={pass} onChange={handlePass}/>
          <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
        </form>
      </div>
      <p>{bahasa === 'id' ? 'Belum punya akun?' : "Don't have an account?"} 
        <Link to="/register">{bahasa === 'id' ? 'Daftar di sini':'Register Here'}</Link>
      </p>
   </section>
  )
}

export default LoginForm