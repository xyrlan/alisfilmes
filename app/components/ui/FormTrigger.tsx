'use client'

import { useFormModal } from '../contexts/FormModalContext'
import { Button } from './Button'

export function FormTrigger() {
  const { openForm } = useFormModal()

  return (
    <Button onClick={openForm}>
      Abrir Formulário
    </Button>
  )
}

