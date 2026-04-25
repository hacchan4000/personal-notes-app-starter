import React, { Children, ReactNode, useMemo, useState } from 'react';


type ThemeContextType = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider = ( { children }: { children: ReactNode } ) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }
  const val = useMemo(()=>{
    return {
      theme, 
      toggleTheme
    }
  },[theme])

  return (
    <ThemeContext.Provider value={val}>
      {children}
    </ThemeContext.Provider>
  )
}

