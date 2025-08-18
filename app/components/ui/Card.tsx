import { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-lg border bg-card text-card-foreground shadow-sm',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
    return (
        <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
            {children}
        </div>
    )
}

export function CardContent({ children, className, ...props }: CardContentProps) {
    return (
        <div className={cn('p-6 pt-0', className)} {...props}>
            {children}
        </div>
    )
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
    return (
        <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
            {children}
        </div>
    )
}
