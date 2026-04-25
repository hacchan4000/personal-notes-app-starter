import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNote } from '../utils/services'
import { useNotes } from '../hooks/useNotes'

const InputPage = () => {
  const { refreshNotes } = useNotes()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const nav = useNavigate()

  const handleAdd = async () => {
    const res = await addNote({ title, body })

    if (!res.error) {
      await refreshNotes()
      nav('/home')
    } else {
      alert('Gagal tambah note')
    }
  }
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
        <button className="action" type="button" title="Simpan" onClick={()=> handleAdd()}>
          <ion-icon name="checkmark-outline"></ion-icon>
        </button>
      </div>
    </section>
  )
}

export default InputPage