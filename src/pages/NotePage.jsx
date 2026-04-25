import React, { useEffect, useState } from 'react'
import { showFormattedDate } from '../utils';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { archiveNote, deleteNote, getNote, unArchiveNote } from '../utils/services';
import { useNotes } from '../hooks/useNotes';



const NotePage = () => {
  const { name } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()
  const {refreshNotes} = useNotes()

  const toggleArchive = async (isArchived) => {
  if (isArchived) {
    await unArchiveNote(name) 
    nav('/home')
  } else {
    await archiveNote(name)   
    nav('/archives')
  }

  await refreshNotes()
}

  useEffect(()=>{
    const fetchNotes = async () => {
      const res = await getNote(name)

      if (res.error) {
        alert('gagal ambil data')
        return
      }
      setNote(res.data)
      setLoading(false)
    }
    fetchNotes()
  },[name])

  

  if (loading) return <p>Loading...</p>
  if (!note) return <p>Note not found</p>

  return (
    <section className='detail-page'>
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className='detail-page__body'>{note.body}</div>

      <div className='detail-page__action'>
        <button className='action' type='button' title='Arsipkan' onClick={() => toggleArchive(note.archived)}>
        <ion-icon size="large" name={note.archived ? "share-outline" : "archive-outline"}></ion-icon>
      </button>

      <button className='action' type='button' title='Hapus' onClick={async () => {
        await deleteNote(name)
        await refreshNotes()
        nav('/')
      }}>
        <ion-icon size="large" name="trash-outline"></ion-icon>
      </button>
      </div>

      
    </section>
  )
}

export default NotePage