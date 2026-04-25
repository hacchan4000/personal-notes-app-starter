import React, { useState, ReactNode, useMemo } from 'react';


type LanguageContextType = {
  bahasa: 'id' | 'en'
  toggleBahasa: () => void
}
export const LanguageContext = React.createContext<LanguageContextType | null>(null);


export const LanguageProvider = ( { children }: { children: ReactNode } ) => {
  const [bahasa, setBahasa] = useState<'id' | 'en'>('id')
  const toggleBahasa = () => {
    setBahasa((prev) => (prev === 'id' ? 'en' : 'id'))
  }

  const val = useMemo(()=>{
    return {
      bahasa,
      toggleBahasa
    }
  },[bahasa])

  return (
    <LanguageContext.Provider value={val}>
      {children}
    </LanguageContext.Provider>
  )
} 