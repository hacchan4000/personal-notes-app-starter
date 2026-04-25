import React, { useContext, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { addNote } from '../utils/services'
import { NotesContext } from '../context/NotesContext'
import { useNotes } from '../hooks/useNotes'

const InputPage = () => {
  const {notes, setNotes} = useNotes()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const nav = useNavigate()

  
  return (
    <section className='add-new-page'>
      <div className='add-new-page__input'>
        <input 
          className="add-new-page__input__title" 
          placeholder="Catatan rahasia" 
          value={title}
          onChange={(e)=> setTitle(e.target.value)}>
        </input>
        <div>
          <div onInput={(e) => setBody(e.currentTarget.innerText)} className="add-new-page__input__body" contentEditable data-placeholder="Sebenarnya saya adalah ....">
          </div>
        </div>
      </div>
      <div className='add-new-page__action'>
        <button className="action" type="button" title="Simpan" onClick={()=> {
          addNote({ title, body })
          setNotes(getAllNotes())
          nav('/home')
          }}>
          <svg 
          stroke="currentColor" 
          fill="currentColor" 
          stroke-width="0" 
          viewBox="0 0 24 24" 
          height="1em" 
          width="1em" 
          xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
          </svg>
        </button>
      </div>
    </section>
  )
}

export default InputPage