import React, { ReactNode, ElementType } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
    children: ReactNode
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    as?: ElementType
}

const containerSizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
}

export function Container({
    children,
    className,
    size = 'lg',
    as: Component = 'div'
}: ContainerProps) {
    return (
        <Component className={cn(
            'mx-auto px-4 sm:px-6 lg:px-8',
            containerSizes[size],
            className
        )}>
            {children}
        </Component>
    )
}
