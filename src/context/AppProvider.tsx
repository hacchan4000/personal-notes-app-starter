import React, {ReactNode} from 'react'
import { AuthProvider } from './AuthContext'
import { ThemeProvider } from './ThemeContext'
import { LanguageProvider } from './LanguageContext'
import { NotesProvider } from './NotesContext'

export const AppProvider = ( { children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NotesProvider>{children}</NotesProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
