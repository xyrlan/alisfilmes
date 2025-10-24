'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'

interface FormData {
  firstName: string
  lastName: string
  company: string
  jobTitle: string
  workEmail: string
  helpMessage: string
  state: string
  howFound: string
}

const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

const howFoundOptions = [
  'Google',
  'Instagram',
  'LinkedIn',
  'Facebook',
  'Indicação',
  'Evento',
  'Outro'
]

export function ProgressiveForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    workEmail: '',
    helpMessage: '',
    state: '',
    howFound: ''
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null }>({})

  // Validações
  const validateField = (key: string, value: string): string | null => {
    if (!value.trim()) {
      return 'Este campo é obrigatório'
    }
    
    if (key === 'workEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Por favor, insira um email válido'
      }
    }
    
    return null
  }

  const steps = [
    {
      key: 'firstName',
      label: 'Primeiro Nome*',
      type: 'text'
    },
    {
      key: 'lastName',
      label: 'Sobrenome*',
      type: 'text'
    },
    {
      key: 'company',
      label: 'Empresa*',
      type: 'text'
    },
    {
      key: 'jobTitle',
      label: 'Cargo na empresa*',
      type: 'text'
    },
    {
      key: 'workEmail',
      label: 'Email de Trabalho*',
      type: 'email'
    },
    {
      key: 'helpMessage',
      label: 'Em que podemos lhe ajudar*',
      type: 'textarea'
    },
    {
      key: 'state',
      label: 'Selecione sua UF*',
      type: 'select',
      options: states
    },
    {
      key: 'howFound',
      label: 'Como você descobriu a Alis?*',
      type: 'textarea',
      options: howFoundOptions
    }
  ]

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  const handleChange = (value: string) => {
    const key = currentStepData.key
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
    
    // Limpar erro quando usuário começa a digitar
    if (errors[key as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [key]: null
      }))
    }
  }

  const handleNext = () => {
    const key = currentStepData.key
    const value = formData[key as keyof FormData]
    const error = validateField(key, value)
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [key]: error
      }))
      return
    }
    
    setIsInitialLoad(false) // Marca que não é mais o carregamento inicial
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setIsInitialLoad(false) // Marca que não é mais o carregamento inicial
      setCurrentStep(stepIndex)
    }
  }

  const handleSubmit = () => {
    const key = currentStepData.key
    const value = formData[key as keyof FormData]
    const error = validateField(key, value)
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [key]: error
      }))
      return
    }
    
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
  }

  const handleCardClick = () => {
    const input = inputRefs.current[currentStepData.key]
    if (input && currentStepData.type === 'select') {
     (input as HTMLSelectElement).showPicker()
     return
    }
    if (input) {
      input.focus()
    }
    
  }

  const handleFocus = (key: string) => {
    setFocusedField(key)
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Só remove o foco se não estiver mudando para outro input do formulário
    setTimeout(() => {
      const activeElement = document.activeElement
      const isFormInput = activeElement && inputRefs.current[currentStepData.key] === activeElement
      
      if (!isFormInput) {
        setFocusedField(null)
      }
    }, 0)
  }

  const currentValue = formData[currentStepData.key as keyof FormData]
  const hasValue = currentValue && currentValue.trim() !== '' && currentValue !== ''
  const isFieldFocused = focusedField === currentStepData.key
  const shouldLabelFloat = hasValue || isFieldFocused
  const currentError = errors[currentStepData.key as keyof FormData]
  const canProceed = hasValue && !currentError

  // Calcular altura baseada no tipo de input
  const getCardHeight = () => {
    switch (currentStepData.type) {
      case 'textarea':
        return '200px'
      case 'select':
        return '80px'
      default:
        return '80px' // inputs normais
    }
  }

  // Foco automático quando muda de step (apenas após o carregamento inicial)
  useEffect(() => {
    if (isInitialLoad) return // Não foca no carregamento inicial
    
    // Primeiro, define o campo como focado imediatamente para manter a label flutuante
    setFocusedField(currentStepData.key)
    
    // Depois, foca no input quando ele estiver disponível
    const focusInput = () => {
      const input = inputRefs.current[currentStepData.key]
      if (input) {
        input.focus()
        return true
      }
      return false
    }
    
    // Tenta focar imediatamente
    if (!focusInput()) {
      // Se não conseguir, tenta novamente após um pequeno delay
      const timer = setTimeout(() => {
        focusInput()
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [currentStep, currentStepData.key, isInitialLoad])

  // Handler para Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isLastStep) {
        handleSubmit()
      } else {
        handleNext()
      }
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        <div className='flex gap-2 2xl:max-w-xl max-w-lg'>
            <Image src="/logobranconobg.png" alt="Logo" width={100} height={100} className={`h-12 w-12 p-1 bg-black rounded-full self-end ${isSubmitted ? '' : 'animate-pulse'}`} />
        <div className="text-white font-medium cursor-text shadow-md ring-0 w-full px-6 py-6 bg-indigo-600/80 border border-background/10 rounded-xl relative outline-0 overflow-hidden">
        Olá 👋
Por favor, preencha as seguintes perguntas rápidas para que nossa equipe possa entrar em contato com você.
        </div>
        </div>
        {!isSubmitted ? (
      <div className="relative flex flex-col gap-4 2xl:max-w-xl self-end max-w-md w-full">
        <div
          onClick={handleCardClick}
          className={cn(
            "cursor-text shadow-md ring-0 w-full px-6 pb-3 pt-9 bg-background/10 border border-background/10 rounded-xl text-background relative outline-0 overflow-hidden  ",
            "transition-all duration-300 ease-in-out",
            currentError && "border-red-400/50 bg-red-400/5",
            isFieldFocused && "ring-1 ring-background/20 border-background/20"
          )}
          style={{
            minHeight: getCardHeight(),
          }}
        >

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onAnimationComplete={() => {
                  // Garante o foco após a animação ser concluída
                  if (!isInitialLoad) {
                    const input = inputRefs.current[currentStepData.key]
                    if (input && document.activeElement !== input) {
                      input.focus()
                    }
                  }
                }}
            >

              {/* Label Flutuante */}
              <motion.label
            initial={false}
            animate={{
              y: shouldLabelFloat ? -20 : -10,
              scale: shouldLabelFloat ? 0.85 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="absolute pointer-events-none font-medium origin-left text-black text-lg"
          >
            {currentStepData.label}
          </motion.label>
 <div className="w-full">
 
           {currentStepData.type === 'textarea' ? (
                <textarea
                  ref={(el) => { inputRefs.current[currentStepData.key] = el }}
                  value={formData[currentStepData.key as keyof FormData] as string}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={() => handleFocus(currentStepData.key)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-0 ring-0 focus:ring-0 focus:outline-0 text-background resize-none min-h-[100px] text-lg leading-snug"
                  rows={3}
                />
              ) : currentStepData.type === 'select' ? (
                <select
                  ref={(el) => { inputRefs.current[currentStepData.key] = el }}
                  value={formData[currentStepData.key as keyof FormData] as string}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={() => handleFocus(currentStepData.key)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className={cn(
                    "w-full bg-transparent outline-0 ring-0 focus:ring-0 focus:outline-0 text-lg",
                    !hasValue ? "text-background/0" : "text-background"
                  )}
                >

                  {currentStepData.options?.map((option) => (
                    <option key={option} value={option} className="text-gray-900 bg-white">
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  ref={(el) => { inputRefs.current[currentStepData.key] = el }}
                  type={currentStepData.type}
                  value={formData[currentStepData.key as keyof FormData] as string}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={() => handleFocus(currentStepData.key)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-0 ring-0 focus:ring-0 focus:outline-0 text-background text-lg"
                />
              )}
</div>
             
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Mensagem de Erro */}
        {currentError && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm ml-4"
          >
            {currentError}
          </motion.p>
        )}

      {/* Botão de Continuar/Enviar */}
      <div className="flex justify-end">
        {isLastStep ? (
          <button
            onClick={handleSubmit}
            // disabled={!canProceed}
            className={cn(
              "group flex items-center justify-center text-sm rounded-full p-4 bg-background text-foreground transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed",
              canProceed && "hover:translate-x-2"
            )}
          >
            <Check className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            // disabled={!canProceed}
            className={cn(
              "group flex items-center justify-center text-sm rounded-full p-4 bg-background text-foreground transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed",
              canProceed && "hover:translate-x-2"
            )}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bolinhas de Progresso */}
      <div className="flex justify-center items-center gap-3">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => handleStepClick(index)}
            disabled={index > currentStep}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentStep 
                ? "w-8 bg-background" 
                : index < currentStep 
                ? "bg-background/60 hover:bg-background/80 cursor-pointer" 
                : "bg-background/20 cursor-not-allowed"
            )}
          />
        ))}
      </div>
    </div>
) : (
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
            <div className="flex gap-4 2xl:max-w-xl max-w-md self-end w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white font-medium shadow-md ring-0 w-full px-6 py-6 bg-background/70 border border-background/10 rounded-xl relative outline-0 overflow-hidden"
              >
                Olá, eu sou {formData.firstName} {formData.lastName} de {formData.state}. Entre em contato comigo por {formData.workEmail}
              </motion.div>
              <div className='h-6 w-6 bg-background/70 rounded-full self-end'></div>
            </div>
            <div className='flex gap-2 2xl:max-w-xl max-w-lg self-start'>
              <Image src="/logobranconobg.png" alt="Logo" width={100} height={100} className='h-12 w-12 p-1 bg-black rounded-full self-end animate-pulse' />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3}}
                className="text-white font-medium shadow-md ring-0 w-full px-6 py-6 bg-indigo-600/80 border border-background/10 rounded-xl relative outline-0 overflow-hidden"
              >
                Obrigado {formData.firstName},<br />
                Fique ligado no seu email. Um de nossos Alis irá entrar em contato com você
              </motion.div>
            </div>
          </div>
          )}
    </div>

  )
}

