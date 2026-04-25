import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteList from '../components/NoteList';
import { getAllNotes } from '../utils/local-data';
import { NotesContext } from '../context/NotesContext';
import { useNotes } from '../hooks/useNotes';
import { useLanguage } from '../hooks/useLanguage';


const MainPage = ({ type }) => {
  const nav = useNavigate()
  const [search, setSearch] = useState('')
  const {notes, setNotes} = useNotes()
  const filteredNotes = notes.filter(item => item.title.toLowerCase().includes(search))

  const { bahasa } = useLanguage()
  return (
    <section className='homepage'>
      {bahasa === 'id' ? (<h1>
        {type === "active" ? 'Catatan Aktif' : 'Catatan Arsip'}
      </h1>):(<h1>
        {type === "active" ? 'Active Notes' : 'Archive Notes'}
      </h1>)}
      
      <section className='search-bar'>
        <input 
        type="text" 
        placeholder='Cari berdasarkan judul ...' 
        value={search}
        onChange={(e)=> {setSearch(e.target.value)}}
        />
      </section>
      <section className='notes-list'>
        <NoteList notes={filteredNotes} type={type}/>
      </section>
      <div className='homepage__action'>
        <button className='action' title='Tambah' type='button' onClick={()=>nav('/notes/new')}>
          <ion-icon name="add"></ion-icon>
        </button>
      </div>
    </section>
  )
}

export default MainPage