'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { ArrowRight, Check, X } from 'lucide-react'
import Image from 'next/image'
import { useFormModal } from '../contexts/FormModalContext'

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

export function FullScreenForm() {
  const { isOpen, closeForm } = useFormModal()
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

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        workEmail: '',
        helpMessage: '',
        state: '',
        howFound: ''
      })
      setErrors({})
      setFocusedField(null)
      setIsInitialLoad(true)
      setIsSubmitted(false)
    }
  }, [isOpen])

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
    
    setIsInitialLoad(false)
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setIsInitialLoad(false)
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
    
    // Fechar após delay
    // setTimeout(() => {
    //   closeForm()
    // }, 3000)
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

  const getCardHeight = () => {
    switch (currentStepData.type) {
      case 'textarea':
        return '200px'
      case 'select':
        return '80px'
      default:
        return '80px'
    }
  }

  useEffect(() => {
    if (isInitialLoad) return
    
    setFocusedField(currentStepData.key)
    
    const focusInput = () => {
      const input = inputRefs.current[currentStepData.key]
      if (input) {
        input.focus()
        return true
      }
      return false
    }
    
    if (!focusInput()) {
      const timer = setTimeout(() => {
        focusInput()
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [currentStep, currentStepData.key, isInitialLoad])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isLastStep) {
        handleSubmit()
      } else {
        handleNext()
      }
    }
    
    if (e.key === 'Escape') {
      closeForm()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeForm}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Form Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}
            className="fixed inset-0 z-50 bg-background/90 overflow-y-auto grid grid-cols-2 py-20 px-4"
            onKeyDown={handleKeyDown}
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={closeForm}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-7 md:w-8 h-7 md:h-8 text-white" />
              </button>
            </div>
<Image src="/alisphoto.png" alt="Form Background" width={1000} height={1000} className="object-cover" />
            {/* Form Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <div className="w-full flex flex-col gap-6">
                {/* Header */}
                <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ scale: { duration: 0.5 }, opacity: { duration: 1}
            }}
                className='flex gap-2 max-w-xl'>
                  <Image 
                    src="/logobranconobg.png" 
                    alt="Logo" 
                    width={100} 
                    height={100} 
                    className={`h-12 w-12 p-1 bg-black rounded-full self-end invert-100 ${isSubmitted ? '' : 'animate-pulse'}`} 
                  />
                  <div className="text-white font-medium cursor-text shadow-md ring-0 w-full px-6 py-6 bg-indigo-600/80 border border-white/10 rounded-xl relative outline-0 overflow-hidden">
                    Olá 👋<br />
                    Por favor, preencha as seguintes perguntas rápidas para que nossa equipe possa entrar em contato com você.
                  </div>
                </motion.div>

                {!isSubmitted ? (
                  <motion.div 
                  initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x:0 }}
                transition={{ x: { duration: 0.5, delay: 0.5 }, opacity: { duration: 1, delay: 0.5}}}
                  className="relative flex flex-col gap-4 w-full max-w-xl self-end">
                    {/* Input Card */}
                    <div
                      onClick={handleCardClick}
                      className={cn(
                        "cursor-text shadow-md ring-0 w-full px-6 pb-3 pt-9 bg-foreground border border-white/10 rounded-xl text-background relative outline-0 overflow-hidden",
                        "transition-all duration-300 ease-in-out",
                        currentError && "border-red-400/50 bg-red-100/90",
                        isFieldFocused && "ring-1 ring-white/20 border-white/20"
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
                            if (!isInitialLoad) {
                              const input = inputRefs.current[currentStepData.key]
                              if (input && document.activeElement !== input) {
                                input.focus()
                              }
                            }
                          }}
                        >
                          {/* Floating Label */}
                          <motion.label
                            initial={false}
                            animate={{
                              y: shouldLabelFloat ? -20 : -10,
                              scale: shouldLabelFloat ? 0.85 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute pointer-events-none font-medium origin-left  text-lg"
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
                                className="w-full bg-transparent outline-0 ring-0 focus:ring-0 focus:outline-0  resize-none min-h-[100px] text-lg leading-snug"
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
                                className="w-full bg-transparent outline-0 ring-0 focus:ring-0 focus:outline-0 text-lg"
                              />
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Error Message */}
                    {currentError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm ml-4"
                      >
                        {currentError}
                      </motion.p>
                    )}

                    {/* Continue/Submit Button */}
                    <div className="flex justify-end">
                      {isLastStep ? (
                        <button
                          onClick={handleSubmit}
                          className={cn(
                            "group flex items-center justify-center text-sm rounded-full p-4 bg-white text-slate-900 transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed",
                            canProceed && "hover:translate-x-2"
                          )}
                        >
                          <Check className="w-6 h-6" />
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          className={cn(
                            "group flex items-center justify-center text-sm rounded-full p-4 bg-white text-slate-900 transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed",
                            canProceed && "hover:translate-x-2"
                          )}
                        >
                          <ArrowRight className="w-6 h-6" />
                        </button>
                      )}
                    </div>

                    {/* Progress Dots */}
                    <div className="flex justify-center items-center gap-3">
                      {steps.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleStepClick(index)}
                          disabled={index > currentStep}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            index === currentStep 
                              ? "w-8 bg-white" 
                              : index < currentStep 
                              ? "bg-white/60 hover:bg-white/80 cursor-pointer" 
                              : "bg-white/20 cursor-not-allowed"
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* Success Message */
                  <div className="w-full flex flex-col gap-6">
                    <div className="flex gap-4 w-full self-end max-w-xl ">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-background font-medium shadow-md ring-0 w-full px-6 py-6 bg-foreground border border-white/10 rounded-xl relative outline-0 overflow-hidden"
                      >
                        Olá, eu sou {formData.firstName} {formData.lastName} de {formData.state}. Entre em contato comigo por {formData.workEmail}
                      </motion.div>
                      <div className='h-6 w-6 bg-foreground rounded-full self-end'></div>
                    </div>
                    <div className='flex gap-2 max-w-xl self-start'>
                      <Image 
                        src="/logobranconobg.png" 
                        alt="Logo" 
                        width={100} 
                        height={100} 
                        className='h-12 w-12 p-1 bg-black rounded-full self-end invert-100 animate-pulse' 
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3}}
                        className="text-white font-medium shadow-md ring-0 w-full px-6 py-6 bg-indigo-600/80 border border-white/10 rounded-xl relative outline-0 overflow-hidden"
                      >
                        Obrigado {formData.firstName},<br />
                        Fique ligado no seu email. Um de nossos Alis irá entrar em contato com você
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

