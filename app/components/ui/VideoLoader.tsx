"use client"

import { useState, useRef, ReactNode, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { m } from 'motion/react'

interface VideoLoaderProps {
    src: string
    className?: string
    videoClassName?: string
    autoPlay?: boolean
    muted?: boolean
    loop?: boolean
    playsInline?: boolean
    children?: ReactNode
    loadingComponent?: ReactNode
    errorComponent?: ReactNode
    onLoad?: () => void
    onError?: () => void
}

export function VideoLoader({
    src,
    className,
    videoClassName,
    autoPlay = true,
    muted = true,
    loop = true,
    playsInline = true,
    children,
    loadingComponent,
    errorComponent,
    onLoad,
    onError,
}: VideoLoaderProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)


    const handleLoadedData = () => {
        setLoading(false)
        onLoad?.()
    }

    const handleWaiting = () => {
        setLoading(true)
    }

    const defaultLoadingComponent = (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
                <img
                    src="/estrela.png"
                    alt="Loading"
                    className="w-20 h-20 drop-shadow-lg"
                />
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-white/10 animate-ping" />
            </div>
        </div>
    )

    const defaultErrorComponent = (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 text-white/60">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <p className="text-white/80 text-lg font-medium">Erro ao carregar vídeo</p>
        </div>
    )

    return (
        <div className={cn("relative w-full h-full", className)}>
            <video
                ref={videoRef}
                src={src}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                onLoad={handleLoadedData}
                playsInline={playsInline}
                className={cn(
                    "w-full h-full object-cover",
                    videoClassName
                )}
                onWaiting={handleWaiting}
            />

            {(loading || error) && (
                <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-800 flex items-center justify-center">
                    {error
                        ? (errorComponent || defaultErrorComponent)
                        : (loadingComponent || defaultLoadingComponent)
                    }
                </div>
            )}

            {children && !loading && !error && (
                <div className="absolute inset-0">
                    {children}
                </div>
            )}
        </div>
    )
}
