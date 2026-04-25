import React from 'react'
import { showFormattedDate } from '../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { archiveNote, deleteNote, getAllNotes } from '../utils/local-data';
import { IonIcon } from 'ionicons/components/ion-icon.js';
import { useNotes } from '../hooks/useNotes';



const NotePage = () => {
  const { name } = useParams()
  const nav = useNavigate()
  const { notes, setNotes } = useNotes()
  const note = notes.find((item) => item.id === name)

  if (!note) return <p>Note not found</p>

  return (
    <section className='detail-page'>
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className='detail-page__body'>{note.body}</div>

      <div className='detail-page__action'>
        <button className='action' type='button' title='Arsipkan' onClick={()=>{
        archiveNote(name)
        setNotes(getAllNotes())
        nav('/')
      }}>
        <ion-icon size="large" name="archive-outline"></ion-icon>
      </button>

      <button className='action' type='button' title='Hapus' onClick={()=>{
        deleteNote(name)
        setNotes(getAllNotes())
        nav('/')
      }}>
        <ion-icon size="large" name="trash-outline"></ion-icon>
      </button>
      </div>

      
    </section>
  )
}

export default NotePage