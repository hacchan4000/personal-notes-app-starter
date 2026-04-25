import React, { Children, ReactNode, useEffect, useMemo, useState } from 'react';


type ThemeContextType = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider = ( { children }: { children: ReactNode } ) => {
  const [theme, setTheme] = useState<any>(() => {
    return localStorage.getItem('theme') || 'light'
  })

  const toggleTheme = () => {
    setTheme((prev: string) => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }
  useEffect(() => {
    document.body.className = theme
  }, [theme])
  

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

