'use client'

import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import { ReactNode, useEffect, useRef } from 'react'

interface InfiniteMarqueeProps {
    children: ReactNode
    speed?: number
    direction?: 'left' | 'right'
    pauseOnHover?: boolean
    className?: string
}

export default function InfiniteMarquee({
    children,
    speed = 50,
    direction = 'left',
    pauseOnHover = true,
    className = ''
}: InfiniteMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const hoverRef = useRef(false)
    const animationRef = useRef<ReturnType<typeof animate> | null>(null)
    const x = useMotionValue(0)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const scrollWidth = container.scrollWidth
        const containerWidth = container.offsetWidth
        
        // Calcular distância de movimento baseada no tamanho do conteúdo
        const moveDistance = scrollWidth / 2
        
        // Calcular duração baseada na velocidade desejada
        const duration = moveDistance / speed

        const animateMarquee = () => {
            if (hoverRef.current) return

            const startValue = direction === 'left' ? 0 : -moveDistance
            const endValue = direction === 'left' ? -moveDistance : 0

            animationRef.current = animate(x, [startValue, endValue], {
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
            })
        }

        animateMarquee()

        return () => {
            if (animationRef.current) {
                animationRef.current.stop()
            }
        }
    }, [speed, direction, x])

    const handleMouseEnter = () => {
        if (pauseOnHover) {
            hoverRef.current = true
            if (animationRef.current) {
                animationRef.current.stop()
            }
        }
    }

    const handleMouseLeave = () => {
        if (pauseOnHover) {
            hoverRef.current = false
            // Retoma a animação da posição atual
            if (containerRef.current) {
                const scrollWidth = containerRef.current.scrollWidth
                const moveDistance = scrollWidth / 2
                const duration = moveDistance / speed
                
                const currentX = x.get()
                const isLeft = direction === 'left'
                
                // Normalizar a posição para o ciclo correto
                let normalizedX = currentX % moveDistance
                if (normalizedX > 0) normalizedX -= moveDistance
                
                const startValue = normalizedX
                const endValue = isLeft ? startValue - moveDistance : startValue + moveDistance
                
                animationRef.current = animate(x, [startValue, endValue], {
                    duration: duration,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                })
            }
        }
    }

    return (
        <div 
            className={`overflow-hidden whitespace-nowrap relative ${className} mask-l-from-90% mask-r-from-90%`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                ref={containerRef}
                className="inline-flex will-change-transform"
                style={{
                    x,
                    transform: 'translateZ(0)',
                }}
            >
                {/* Primeira instância dos elementos */}
                <div className="flex gap-8 items-center shrink-0">
                    {children}
                </div>

                {/* Segunda instância para o efeito infinito */}
                <div className="flex gap-8 items-center shrink-0">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}
