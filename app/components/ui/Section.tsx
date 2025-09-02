import { ReactNode, HTMLAttributes, ElementType } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode
    className?: string
    spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
    as?: ElementType
}

const spacingClasses = {
    sm: 'md:py-12 py-8',
    md: 'md:py-16 py-12',
    lg: 'md:py-20 py-12',
    xl: 'md:py-24 py-16',
    none: 'md:py-0 py-0'
}

export function Section({
    children,
    className,
    spacing = 'lg',
    as: Component = 'section',
    ...props
}: SectionProps) {
    return (
        <Component
            className={cn(
                spacingClasses[spacing],
                className
            )}
            {...props}
        >
            {children}
        </Component>
    )
}
