import { ReactNode, HTMLAttributes, ElementType } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode
    className?: string
    spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
    as?: ElementType
}

const spacingClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-24',
    none: 'py-0'
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
