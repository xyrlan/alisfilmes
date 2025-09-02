import { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps {
    children: ReactNode
    className?: string
    as?: ElementType
}


export function H0({ children, className, as: Component = 'h1', ...props }: TypographyProps) {
    return (
        <Component className={cn(
            'text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground',
            className
        )} {...props}>
            {children}
        </Component>
    )
}

export function H1({ children, className, as: Component = 'h1', ...props }: TypographyProps) {
    return (
        <Component className={cn(
            'text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground',
            className
        )} {...props}>
            {children}
        </Component>
    )
}

export function H2({ children, className, as: Component = 'h2', ...props }: TypographyProps) {
    return (
        <Component className={cn(
            'text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground',
            className
        )} {...props}>
            {children}
        </Component>
    )
}

export function H3({ children, className, as: Component = 'h3', ...props }: TypographyProps) {
    return (
        <Component className={cn(
            'text-2xl sm:text-3xl tracking-tight text-foreground',
            className
        )} {...props}>
            {children}
        </Component>
    )
}

export function H4({ children, className, as: Component = 'h4', ...props }: TypographyProps) {
    return (
        <Component className={cn(
            'text-xl sm:text-2xl tracking-tight ',
            className
        )} {...props}>
            {children}
        </Component>
    )
}

export function Lead({ children, className, as: Component = 'p', ...props }: TypographyProps) {
    return (
        <Component className={cn(
            'text-xl sm:text-2xl text-muted-foreground leading-relaxed',
            className
        )} {...props}>
            {children}
        </Component>
    )
}

export function Body({ children, className, as: Component = 'p', ...props }: TypographyProps) {
    return (
        <Component className={cn(
            'text-base sm:text-lg text-foreground leading-relaxed',
            className
        )} {...props}           >
            {children}
        </Component>
    )
}

export function Small({ children, className, as: Component = 'span', ...props }: TypographyProps) {
    return (
        <Component className={cn(
            'text-sm text-muted-foreground',
            className
        )} {...props}>
            {children}
        </Component>
    )
}

export function Caption({ children, className, as: Component = 'span', ...props }: TypographyProps) {
    return (
        <Component className={cn(
            'text-xs uppercase tracking-wide text-muted-foreground',
            className
        )} {...props}>
            {children}
        </Component>
    )
}
