'use client'

import { useFormModal } from '../contexts/FormModalContext'

/**
 * Exemplo de como usar o FormModalContext em qualquer componente
 * 
 * Para usar em qualquer lugar da aplicação:
 * 
 * 1. Importe o hook: import { useFormModal } from '@/app/components/contexts/FormModalContext'
 * 2. Use o hook: const { openForm, closeForm, isOpen } = useFormModal()
 * 3. Chame openForm() quando quiser abrir o formulário
 * 
 * Exemplo:
 */
export function FormExample() {
  const { openForm, isOpen } = useFormModal()

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Exemplo de Uso do Formulário</h2>
      
      <button
        onClick={openForm}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {isOpen ? 'Formulário Aberto' : 'Abrir Formulário em Tela Cheia'}
      </button>

      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Como usar:</h3>
        <pre className="text-sm overflow-x-auto">
{`import { useFormModal } from '@/app/components/contexts/FormModalContext'

function MeuComponente() {
  const { openForm } = useFormModal()
  
  return (
    <button onClick={openForm}>
      Abrir Formulário
    </button>
  )
}`}
        </pre>
      </div>
    </div>
  )
}

