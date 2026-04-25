import React, { ReactNode, useState, createContext, useEffect } from 'react'
import { ItemProps } from '../components/NoteItem';
import { getActiveNote, getArchivedNote } from '../utils/services';


interface NotesContextProps {
  notes: ItemProps[],
  setNotes: React.Dispatch<React.SetStateAction<ItemProps[]>>
  refreshNotes: () => Promise<void>
}

export const NotesContext = React.createContext<NotesContextProps | null>(null)


export const NotesProvider = ( { children }: { children: ReactNode } ) => {
  const [notes, setNotes] = useState<ItemProps[]>([])
  
  useEffect(()=>{
    const fetchNotes = async() => {
      const active = await getActiveNote()
      const archived = await getArchivedNote()

      if (active.error || archived.error) {
        alert('error ngambil notes')
        return
      }
      const allNotes = [...active.data, ...archived.data]
      setNotes(allNotes)
    }
    fetchNotes()
  },[])

  const refreshNotes = async () => {
    const active = await getActiveNote()
    const archived = await getArchivedNote()

    if (!active.error && !archived.error) {
      setNotes([...active.data, ...archived.data])
    }
  }
  return (
    <NotesContext.Provider value={{notes, setNotes, refreshNotes}} >
      {children}
    </NotesContext.Provider>
  )
}

