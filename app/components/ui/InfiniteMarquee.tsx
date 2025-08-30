'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

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
    const animationDirection = direction === 'left' ? [0, -1000] : [0, 1000]

    return (
        <div className={`overflow-hidden whitespace-nowrap relative ${className} mask-l-from-90% mask-r-from-90%`}>
            <motion.div
                className="inline-flex will-change-transform"
                animate={{
                    x: animationDirection,
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
                whileHover={pauseOnHover ? {
                    transition: { duration: 0.5 },
                    x: animationDirection[0]
                } : {}}
                style={{
                    transform: 'translateZ(0)', // Força aceleração de hardware
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

                {/* Terceira instância para garantir continuidade */}
                <div className="flex gap-8 items-center shrink-0">
                    {children}
                </div>

                {/* Quarta instância para suavizar ainda mais */}
                <div className="flex gap-8 items-center shrink-0">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}
