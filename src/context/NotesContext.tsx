import React, { ReactNode, useState, createContext } from 'react'
import { getAllNotes } from '../utils/local-data'
import { ItemProps } from '../components/NoteItem';


interface NotesContextProps {
  notes: ItemProps[],
  setNotes: React.Dispatch<React.SetStateAction<ItemProps[]>>
}

export const NotesContext = React.createContext<NotesContextProps | null>(null)

export const NotesProvider = ( { children }: { children: ReactNode } ) => {
  const [notes, setNotes] = useState<ItemProps[]>(() => getAllNotes())
  
  return (
    <NotesContext.Provider value={{notes, setNotes}} >
      {children}
    </NotesContext.Provider>
  )
}

