'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface FormModalContextType {
  isOpen: boolean
  openForm: () => void
  closeForm: () => void
}

const FormModalContext = createContext<FormModalContextType | undefined>(undefined)

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openForm = () => setIsOpen(true)
  const closeForm = () => setIsOpen(false)

  return (
    <FormModalContext.Provider value={{ isOpen, openForm, closeForm }}>
      {children}
    </FormModalContext.Provider>
  )
}

export function useFormModal() {
  const context = useContext(FormModalContext)
  if (context === undefined) {
    throw new Error('useFormModal must be used within a FormModalProvider')
  }
  return context
}

