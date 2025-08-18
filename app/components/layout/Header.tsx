'use client'

import { useState } from 'react'
import { Container } from '@/app/components/ui/Container'
import { Button } from '@/app/components/ui/Button'
import { Menu, X } from 'lucide-react'

interface NavItem {
    label: string
    href: string
}

interface HeaderProps {
    logo?: string
    navItems?: NavItem[]
    ctaText?: string
    onCtaClick?: () => void
}

const defaultNavItems: NavItem[] = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Contato', href: '#contato' }
]

export function Header({
    logo = 'AlisFilmes',
    navItems = defaultNavItems,
    ctaText = 'Começar',
    onCtaClick
}: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Container className="flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <a href="#" className="text-xl font-bold text-foreground">
                        {logo}
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex">
                    <Button onClick={onCtaClick}>
                        {ctaText}
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </Container>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t">
                    <Container className="py-4">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <Button onClick={onCtaClick} className="w-full mt-4">
                                {ctaText}
                            </Button>
                        </nav>
                    </Container>
                </div>
            )}
        </header>
    )
}
