"use client"

import { useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

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
    onLoad,
}: VideoLoaderProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    return (
        <div className={cn("relative w-full h-full", className)}>
            <video
                ref={videoRef}
                src={src}
                autoPlay={autoPlay}
                muted={muted}
                preload='true'
                loop={loop}
                playsInline={playsInline}
                className={cn(
                    "w-full h-full object-cover scale-y-110",
                    videoClassName
                )}
            />
                <div className="absolute inset-0">
                    {children}
                </div>
        </div>
    )
}
