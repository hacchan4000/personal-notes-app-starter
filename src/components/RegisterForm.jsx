import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'
import {LanguageContext} from '../context/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import { Register } from '../utils/services'

const RegisterForm = () => {
  
  const [name, handleName] = useInput('')
  const [email, handleEmail] = useInput('')
  const [pass, handlePass] = useInput('')
  const [pass2, handlePass2] = useInput('')

  const { bahasa } = useContext(LanguageContext)
  const {loading} = useAuth()
  const nav = useNavigate()
  
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    if(pass!==pass2){
      alert('Password harus konsisten')
      return
    }
    if (pass.length < 6) {
      alert('Password minimal 6 karakter')
      return
    }
    const res = await Register({name,email,pass})

    if (!res.error) {
      alert('Register Berhasil')
      nav('/')
    }else{
      alert(res.message)
    }
  }
  return (
    <section className="register-page">
      <h2></h2>
      <h2>{bahasa === 'id' ? 'Isi form untuk mendaftar akun.':'Fill the form to register account.'}</h2>
      <div className='input-register'>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" value={name} onChange={handleName}/>
          <label htmlFor="email">Email</label>
          <input type="text" value={email} onChange={handleEmail}/>
          <label htmlFor="password">Password</label>
          <input type="password" value={pass} onChange={handlePass}/>
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" value={pass2} onChange={handlePass2}/>
          <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
        </form>
       
      </div>
       <p>{bahasa === 'id' ? 'Sudah punya akun?' : "Already have an account?"} 
          <Link to="/">{bahasa === 'id' ? 'Login Disini':'Login Here'}</Link>
        </p>
    </section>
    
  )
}

export default RegisterForm