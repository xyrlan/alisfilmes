import { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps {
    children: ReactNode
    className?: string
    as?: ElementType
}

export function H1({ children, className, as: Component = 'h1' }: TypographyProps) {
    return (
        <Component className={cn(
            'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground',
            className
        )}>
            {children}
        </Component>
    )
}

export function H2({ children, className, as: Component = 'h2' }: TypographyProps) {
    return (
        <Component className={cn(
            'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground',
            className
        )}>
            {children}
        </Component>
    )
}

export function H3({ children, className, as: Component = 'h3' }: TypographyProps) {
    return (
        <Component className={cn(
            'text-2xl sm:text-3xl font-semibold tracking-tight text-foreground',
            className
        )}>
            {children}
        </Component>
    )
}

export function H4({ children, className, as: Component = 'h4' }: TypographyProps) {
    return (
        <Component className={cn(
            'text-xl sm:text-2xl font-semibold tracking-tight text-foreground',
            className
        )}>
            {children}
        </Component>
    )
}

export function Lead({ children, className, as: Component = 'p' }: TypographyProps) {
    return (
        <Component className={cn(
            'text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed',
            className
        )}>
            {children}
        </Component>
    )
}

export function Body({ children, className, as: Component = 'p' }: TypographyProps) {
    return (
        <Component className={cn(
            'text-base sm:text-lg text-foreground leading-relaxed',
            className
        )}>
            {children}
        </Component>
    )
}

export function Small({ children, className, as: Component = 'span' }: TypographyProps) {
    return (
        <Component className={cn(
            'text-sm text-muted-foreground',
            className
        )}>
            {children}
        </Component>
    )
}

export function Caption({ children, className, as: Component = 'span' }: TypographyProps) {
    return (
        <Component className={cn(
            'text-xs uppercase tracking-wide font-medium text-muted-foreground',
            className
        )}>
            {children}
        </Component>
    )
}
